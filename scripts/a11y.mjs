#!/usr/bin/env node
// Headless contrast/visibility gate. The static audit can't measure rendered colour, so this
// renders every built page (Playwright + axe-core), runs ONLY the colour-contrast rule, and
// HARD-fails on violations affecting high-impact elements (CTAs + headings) — the class that
// has bitten us (navy-on-navy button, white-heading-on-light-hero). Lower-impact decorative
// text is reported as a warning, not a block. Assumes the built site is served at BASE.
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.A11Y_BASE || 'http://localhost:4321';
const DIST = 'dist';

function routes(dir, base = '') {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...routes(p, `${base}/${e}`));
    else if (e === 'index.html') out.push(base === '' ? '/' : `${base}/`);
  }
  return out;
}

// A violation matters (HARD) if it hits a CTA or a heading.
const isHighImpact = (html) => /^<\s*(a|button|h1|h2)\b/i.test(html.trim()) || /class="[^"]*\bbtn/i.test(html);

const fileFor = (r) => join(DIST, r === '/' ? 'index.html' : r.replace(/\/$/, '') + '/index.html');
// Skip GHL redirect stubs (meta-refresh) — same scope as audit.mjs.
const routeList = routes(DIST).filter((r) => !/http-equiv=["']refresh/i.test(readFileSync(fileFor(r), 'utf8'))).sort();
const browser = await chromium.launch();
const context = await browser.newContext();
let hard = 0, soft = 0;
console.log(`Contrast gate over ${routeList.length} pages\n`);

for (const r of routeList) {
  const page = await context.newPage();
  try {
    await page.goto(BASE + r, { waitUntil: 'networkidle', timeout: 30000 });
    const { violations } = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
    const nodes = violations.flatMap((v) => v.nodes);
    const high = nodes.filter((n) => isHighImpact(n.html));
    if (high.length) {
      hard += high.length;
      console.log(`  \x1b[31mFAIL\x1b[0m ${r}`);
      high.forEach((n) => console.log(`       - ${n.target.join(' ')}  ${n.html.slice(0, 80)}`));
    } else if (nodes.length) {
      soft += nodes.length;
      console.log(`  \x1b[33mWARN\x1b[0m ${r}  (${nodes.length} low-impact contrast notes)`);
    } else {
      console.log(`  \x1b[32mPASS\x1b[0m ${r}`);
    }
  } catch (e) {
    console.log(`  \x1b[31mERR \x1b[0m ${r}  ${e.message}`);
    hard++;
  } finally {
    await page.close();
  }
}
await browser.close();
console.log(`\n${routeList.length} pages | ${hard} HARD contrast failure(s) | ${soft} low-impact note(s).`);
process.exit(hard ? 1 : 0);
