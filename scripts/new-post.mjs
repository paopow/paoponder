#!/usr/bin/env node
// Scaffold a new Writing post.
//
//   yarn new-post "My Title" [--type note|article] [--tags a,b] [--lang en,th]
//                            [--date YYYY-MM-DD] [--slug custom-slug]
//                            [--title-th "ชื่อภาษาไทย"]
//
// Defaults: type=note, lang=en,th (bilingual), date=today, tags=none.
// --title-th sets a distinct Thai title (only valid when Thai is a language);
// omit it to share the single `title` across both languages.
// The slug is derived from the title unless --slug is given.

import { writeFile, access, mkdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const VALID_TYPES = ['note', 'article'];
const VALID_LANGS = ['en', 'th'];
const PLACEHOLDERS = {
  en: 'Write your English text here…',
  th: 'เขียนข้อความภาษาไทยที่นี่…',
};

function parseArgs(argv) {
  const opts = {};
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq !== -1) {
        opts[a.slice(2, eq)] = a.slice(eq + 1);
      } else {
        const key = a.slice(2);
        const next = argv[i + 1];
        if (next !== undefined && !next.startsWith('--')) {
          opts[key] = next;
          i++;
        } else {
          opts[key] = true;
        }
      }
    } else {
      positional.push(a);
    }
  }
  return { opts, positional };
}

function slugify(str) {
  return str
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .toLowerCase()
    .replace(/['’]/g, '') // drop apostrophes so "don't" -> "dont"
    .replace(/[^a-z0-9]+/g, '-') // any run of other chars -> hyphen
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

const USAGE =
  'Usage: yarn new-post "Title" [--type note|article] [--tags a,b] [--lang en,th] [--date YYYY-MM-DD] [--slug custom-slug] [--title-th "…"]';

const { opts, positional } = parseArgs(process.argv.slice(2));

if (opts.help || opts.h) {
  console.log(USAGE);
  process.exit(0);
}

const title = positional[0];
if (!title) fail(`a title is required.\n${USAGE}`);
if (positional.length > 1) {
  fail(`unexpected extra argument "${positional[1]}". Wrap the title in quotes.\n${USAGE}`);
}

const type = String(opts.type || 'note').toLowerCase();
if (!VALID_TYPES.includes(type)) {
  fail(`--type must be one of ${VALID_TYPES.join(', ')} (got "${type}").`);
}

const languages = String(opts.lang || 'en,th')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
if (languages.length === 0) fail('--lang must list at least one language.');
for (const l of languages) {
  if (!VALID_LANGS.includes(l)) {
    fail(`--lang values must be among ${VALID_LANGS.join(', ')} (got "${l}").`);
  }
}
const uniqueLangs = [...new Set(languages)];

const titleTh = opts['title-th'] && opts['title-th'] !== true ? String(opts['title-th']) : '';
if (titleTh && !uniqueLangs.includes('th')) {
  fail('--title-th was given but Thai is not in --lang. Add th to --lang, or drop --title-th.');
}

const tags = opts.tags
  ? String(opts.tags)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  : [];

function todayLocal() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const date = opts.date ? String(opts.date) : todayLocal();
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  fail(`--date must be in YYYY-MM-DD format (got "${date}").`);
}

const slug = slugify(String(opts.slug || title));
if (!slug) {
  fail(
    'could not derive a slug from the title (e.g. a non-Latin title). Pass one explicitly with --slug my-post-slug.'
  );
}

const writingDir = path.join(process.cwd(), 'writing');
const filePath = path.join(writingDir, `${slug}.mdx`);

try {
  await access(filePath, constants.F_OK);
  fail(
    `${path.relative(process.cwd(), filePath)} already exists. Choose another title or pass a different --slug.`
  );
} catch (err) {
  if (err.code !== 'ENOENT' && err.message?.startsWith('Error:')) throw err;
}

const esc = (s) => s.replace(/"/g, '\\"');
const frontmatter = [
  '---',
  `type: "${type}"`,
  `languages: [${uniqueLangs.map((l) => `"${l}"`).join(', ')}]`,
  `date: "${date}"`,
  `title: "${esc(title)}"`,
  ...(titleTh ? [`title_th: "${esc(titleTh)}"`] : []),
  `tags: [${tags.map((t) => `"${t}"`).join(', ')}]`,
  '---',
].join('\n');

// Always wrap in <Lang> blocks — even single-language posts — so per-language
// styling (e.g. the Thai font) applies. The toggle hides itself when there is
// only one language.
const body = uniqueLangs
  .map((l) => `<Lang code="${l}">\n\n${PLACEHOLDERS[l]}\n\n</Lang>`)
  .join('\n\n');

await mkdir(writingDir, { recursive: true });
await writeFile(filePath, `${frontmatter}\n\n${body}\n`, 'utf-8');

const rel = path.relative(process.cwd(), filePath);
console.log(`Created ${rel}`);
console.log(
  `  type: ${type} | languages: ${uniqueLangs.join(', ')} | date: ${date}${
    tags.length ? ` | tags: ${tags.join(', ')}` : ''
  }`
);
console.log(`Preview: yarn dev  →  http://localhost:3000/writing/${slug}`);
