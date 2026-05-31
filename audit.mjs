#!/usr/bin/env node
// site-audit — TDD-style executable gate for a built Astro site.
// Parses dist/**/*.html and asserts SEO / leak / a11y / quality rules.
// RED (exit 1) if any assertion fails. Wire into the build before deploy.
//
// Per-page primary keyword comes from <meta name="primary-keyword">.
// Run: node audit.mjs   (after `npm run build`)

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const BRAND_LEAKS = ['closebot', 'gohighlevel', 'leadconnector', 'trillet', 'go high level'];
// "plai" is too short / collides; check word-boundary separately if needed.

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
// quote-aware meta content: matches opening quote and captures until the SAME quote
const meta = (html, name) => { const m = html.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content=(["'])([\\s\\S]*?)\\1`, 'i')); return m ? m[2].trim() : null; };

let failures = 0;
let pages = 0;

for (const file of walk(DIST)) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(/\\/g, '/').replace(/^dist/, '');
  // skip redirect stubs / sitemap
  if (/http-equiv=["']refresh/i.test(html)) continue;
  pages++;
  const checks = [];
  const fail = (name, msg) => checks.push({ ok: false, name, msg });
  const pass = (name) => checks.push({ ok: true, name });

  const title = tag(html, /<title>([\s\S]*?)<\/title>/i);
  const desc = meta(html, 'description');
  const robots = meta(html, 'robots');
  const canonical = /<link\s+rel=["']canonical["']/i.test(html);
  const lang = /<html[^>]+lang=/i.test(html);
  const h1s = allTags(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  const h2s = allTags(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi);
  const headings = [...h1s, ...h2s].map((h) => h.toLowerCase());
  const kw = meta(html, 'primary-keyword');
  const hasLd = /application\/ld\+json/i.test(html);
  const ogTitle = /<meta\s+property=["']og:title["']/i.test(html);
  const bodyText = strip(html).toLowerCase();
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);

  // --- SEO ---
  robots && /noindex/i.test(robots) ? fail('indexable', `robots = "${robots}"`) : pass('indexable');
  if (!title) fail('title-present', 'no <title>'); else if (title.length > 65) fail('title-length', `${title.length} chars > 65`); else pass('title');
  if (!desc) fail('meta-description', 'missing'); else if (desc.length < 50 || desc.length > 165) fail('meta-description-length', `${desc.length} chars (want 50-165)`); else pass('meta-description');
  canonical ? pass('canonical') : fail('canonical', 'missing');
  h1s.length === 1 ? pass('single-h1') : fail('single-h1', `found ${h1s.length}`);
  hasLd ? pass('json-ld') : fail('json-ld', 'no structured data');
  ogTitle ? pass('og') : fail('og', 'no og:title');

  // --- KEYWORD IN HEADINGS (the one he caught) ---
  // primary-keyword is OPTIONAL: utility pages (about/contact/legal) need not target one.
  // When declared (the pages that matter for SEO), the keyword MUST appear in title + a heading.
  const norm = (s) => (s || '').toLowerCase().replace(/&#39;|&apos;|[‘’]/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  if (kw) {
    const k = norm(kw);
    norm(title).includes(k) ? pass('keyword-in-title') : fail('keyword-in-title', `"${kw}" not in title "${title}"`);
    headings.map(norm).some((h) => h.includes(k)) ? pass('keyword-in-heading') : fail('keyword-in-heading', `"${kw}" not in any H1/H2`);
  }

  // --- A11y ---
  lang ? pass('html-lang') : fail('html-lang', 'missing');
  const noAlt = imgs.filter((i) => !/\balt=["'][^"']*[^"'\s][^"']*["']/i.test(i) && !/\balt=["']["']/i.test(i));
  noAlt.length === 0 ? pass('img-alt') : fail('img-alt', `${noAlt.length} <img> without alt`);

  // --- Leak guards ---
  const leaks = BRAND_LEAKS.filter((b) => bodyText.includes(b));
  leaks.length === 0 ? pass('no-brand-leak') : fail('no-brand-leak', `found: ${leaks.join(', ')}`);
  strip(html).includes('—') ? fail('no-em-dash', 'em-dash in rendered copy') : pass('no-em-dash');

  const fails = checks.filter((c) => !c.ok);
  if (fails.length) {
    failures += fails.length;
    console.log(`\n  \x1b[31mFAIL\x1b[0m ${rel || '/'}`);
    for (const f of fails) console.log(`       - ${f.name}: ${f.msg}`);
  } else {
    console.log(`  \x1b[32mPASS\x1b[0m ${rel || '/'}`);
  }
}

console.log(`\n${pages} pages audited, ${failures} assertion failure(s).`);
process.exit(failures ? 1 : 0);
