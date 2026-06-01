#!/usr/bin/env node
// site-audit v2 — TDD gate for a built Astro site. Parses dist/**/*.html, builds an
// internal-link graph from <main> body links, and asserts SEO + architecture + CRO + a11y.
// Reads optional site.spec.json (cluster map) to assert page-coverage + cluster integrity.
// RED (exit 1) on any HARD failure. SOFT issues print as WARN and do not block.
// Run: node audit.mjs   (after `npm run build`)

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const BRAND_LEAKS = ['closebot', 'gohighlevel', 'leadconnector', 'trillet', 'go high level'];
const ANCHOR_DENY = ['click here', 'read more', 'learn more', 'here', 'this', 'link'];
const CTA_DENY = ['submit', 'send', 'go', 'continue', 'register', 'click here', 'enter'];

const spec = existsSync('site.spec.json') ? JSON.parse(readFileSync('site.spec.json', 'utf8')) : null;

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const tag = (html, re) => { const m = html.match(re); return m ? m[1].trim() : null; };
const allTags = (html, re) => [...html.matchAll(re)].map((m) => strip(m[1]));
const meta = (html, name) => { const m = html.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content=(["'])([\\s\\S]*?)\\1`, 'i')); return m ? m[2].trim() : null; };
const norm = (s) => (s || '').toLowerCase().replace(/&#39;|&apos;|[‘’]/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const pathOf = (file) => file.replace(/\\/g, '/').replace(/^dist/, '').replace(/index\.html$/, '').replace(/\/$/, '') || '/';
const mainOf = (html) => { const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i); return m ? m[1] : html; };
function internalLinks(frag) {
  return [...frag.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ href: m[1], text: strip(m[2]) }))
    .filter((l) => l.href.startsWith('/') && !l.href.startsWith('//'))
    .map((l) => ({ ...l, target: l.href.replace(/[#?].*$/, '').replace(/\/$/, '') || '/' }));
}

const pages = {};
for (const file of walk(DIST)) {
  const html = readFileSync(file, 'utf8');
  if (/http-equiv=["']refresh/i.test(html)) continue;
  const p = pathOf(file);
  const main = mainOf(html);
  pages[p] = {
    file, html, main,
    title: tag(html, /<title>([\s\S]*?)<\/title>/i),
    desc: meta(html, 'description'),
    robots: meta(html, 'robots'),
    kw: meta(html, 'primary-keyword'),
    h1s: allTags(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi),
    h2s: allTags(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi),
    canonical: /<link\s+rel=["']canonical["']/i.test(html),
    lang: /<html[^>]+lang=/i.test(html),
    hasLd: /application\/ld\+json/i.test(html),
    hasBreadcrumb: /"@type"\s*:\s*"BreadcrumbList"/i.test(html),
    og: /<meta\s+property=["']og:title["']/i.test(html),
    imgs: [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]),
    links: internalLinks(main),
    anchors: [...main.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => strip(m[1])),
    ctas: [...html.matchAll(/<(?:a|button)\b[^>]*>([\s\S]*?)<\/(?:a|button)>/gi)].map((m) => strip(m[1])).filter(Boolean),
    forms: [...html.matchAll(/<form\b[\s\S]*?<\/form>/gi)].map((m) => m[0]),
    words: strip(main).split(' ').length,
    depth: (p === '/' ? 0 : p.split('/').filter(Boolean).length),
  };
}

const inbound = {};
for (const p of Object.keys(pages)) inbound[p] = 0;
for (const [p, d] of Object.entries(pages)) {
  for (const l of d.links) { if (l.target !== p && inbound[l.target] !== undefined) inbound[l.target]++; }
}

let hard = 0, soft = 0;
const utility = new Set([...(spec?.utilityPages || []), '/privacy', '/terms', '/privacy-policy-2023', '/']);

function report(p, fails, warns) {
  if (fails.length) { hard += fails.length; console.log(`\n  \x1b[31mFAIL\x1b[0m ${p}`); fails.forEach((f) => console.log(`       - ${f}`)); }
  else if (warns.length) { console.log(`  \x1b[33mWARN\x1b[0m ${p}`); }
  else console.log(`  \x1b[32mPASS\x1b[0m ${p}`);
  warns.forEach((w) => { soft++; console.log(`       ~ ${w}`); });
}

for (const [p, d] of Object.entries(pages)) {
  const F = [], W = [];
  if (d.robots && /noindex/i.test(d.robots)) F.push(`indexable: robots="${d.robots}"`);
  if (!d.title) F.push('no <title>'); else if (d.title.length > 65) F.push(`title ${d.title.length}>65`);
  if (!d.desc) F.push('no meta description'); else if (d.desc.length < 50 || d.desc.length > 165) F.push(`meta-desc ${d.desc.length} (50-165)`);
  if (!d.canonical) F.push('no canonical');
  if (d.h1s.length !== 1) F.push(`h1 count ${d.h1s.length}`);
  if (!d.hasLd) F.push('no JSON-LD');
  if (!d.og) F.push('no og:title');
  if (!d.lang) F.push('no html-lang');
  const noAlt = d.imgs.filter((i) => !/\balt=["'][^"']*[^"'\s][^"']*["']/i.test(i) && !/\balt=["']["']/i.test(i));
  if (noAlt.length) F.push(`${noAlt.length} img without alt`);
  const leaks = BRAND_LEAKS.filter((b) => strip(d.html).toLowerCase().includes(b));
  if (leaks.length) F.push(`brand-leak: ${leaks.join(',')}`);
  if (strip(d.html).includes('—')) F.push('em-dash in copy');
  if (d.kw) {
    const k = norm(d.kw);
    if (!norm(d.title).includes(k)) F.push(`keyword "${d.kw}" not in title`);
    if (![...d.h1s, ...d.h2s].map(norm).some((h) => h.includes(k))) F.push(`keyword "${d.kw}" not in any H1/H2`);
  }
  const badAnchor = d.anchors.filter((a) => ANCHOR_DENY.includes(norm(a)));
  if (badAnchor.length) F.push(`generic anchor text: ${[...new Set(badAnchor)].join(',')}`);
  const badCta = d.ctas.filter((c) => CTA_DENY.includes(norm(c)));
  if (badCta.length) F.push(`weak CTA label: ${[...new Set(badCta)].join(',')}`);
  for (const form of d.forms) {
    const visible = [...form.matchAll(/<(input|textarea|select)\b[^>]*>/gi)].filter((m) => !/type=["']hidden["']/i.test(m[0])).length;
    if (visible >= 7) F.push(`form has ${visible} visible fields (>=7)`);
    else if (visible === 6) W.push('form has 6 fields (aim <=5)');
  }
  if (d.depth >= 2 && !d.hasBreadcrumb) F.push('no BreadcrumbList schema (page >=2 deep)');
  if (!utility.has(p) && inbound[p] === 0) F.push('orphan: no inbound body link');
  if (!utility.has(p) && d.words < 250) W.push(`thin: ~${d.words} words`);
  report(p, F, W);
}

if (spec?.clusters) {
  console.log('\n  --- cluster spec ---');
  for (const c of spec.clusters) {
    const pillar = c.pillar.replace(/\/$/, '');
    const pillarPage = pages[pillar];
    if (!pillarPage) { hard++; console.log(`  \x1b[31mFAIL\x1b[0m pillar ${pillar} not built`); continue; }
    const pillarTargets = new Set(pillarPage.links.map((l) => l.target));
    for (const s of c.spokes) {
      const su = s.url.replace(/\/$/, '');
      const sp = pages[su];
      if (!sp) { hard++; console.log(`  \x1b[31mFAIL\x1b[0m coverage: "${s.keyword}" -> ${su} NOT BUILT`); continue; }
      const F = [];
      if (!sp.links.some((l) => l.target === pillar)) F.push(`spoke ${su} does not link to pillar`);
      if (!pillarTargets.has(su)) F.push(`pillar does not link to spoke ${su}`);
      const sibs = c.spokes.map((x) => x.url.replace(/\/$/, '')).filter((x) => x !== su);
      if (!sp.links.some((l) => sibs.includes(l.target))) F.push(`spoke ${su} links no sibling`);
      if (F.length) { hard += F.length; console.log(`  \x1b[31mFAIL\x1b[0m ${su}`); F.forEach((f) => console.log(`       - ${f}`)); }
      else console.log(`  \x1b[32mPASS\x1b[0m cluster: ${su}`);
    }
  }
}

console.log(`\n${Object.keys(pages).length} pages | ${hard} HARD failure(s) | ${soft} soft warning(s).`);
process.exit(hard ? 1 : 0);
