import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const articlesPath = path.join(rootDir, 'src', 'data', 'articles.ts');
const articlesContent = fs.readFileSync(articlesPath, 'utf-8');

const articleIdRegex = /^\s{2}'([a-z][a-z0-9-]+)':\s*\{/gm;
const existingIds = new Set();
let match;
while ((match = articleIdRegex.exec(articlesContent)) !== null) {
  existingIds.add(match[1]);
}

console.log(`Total articles in ALL_ARTICLES: ${existingIds.size}`);

const categoriesPath = path.join(rootDir, 'src', 'data', 'categories.ts');
const categoriesContent = fs.readFileSync(categoriesPath, 'utf-8');
const catIdRegex = /id:\s*'((?:prompt|painting|video|coding|office|agent|deploy|security)-\d+)'/g;
const catIds = new Set();
while ((match = catIdRegex.exec(categoriesContent)) !== null) {
  catIds.add(match[1]);
}

const pathIds = new Set();
['beginner', 'intermediate', 'professional'].forEach(pathId => {
  for (let step = 1; step <= 10; step++) {
    pathIds.add(`path-${pathId}-${step}`);
  }
});

const caseIds = new Set();
for (let caseNum = 1; caseNum <= 6; caseNum++) {
  for (let step = 1; step <= 5; step++) {
    caseIds.add(`case-${caseNum}-${step}`);
  }
}

const allReferencedIds = new Set([...catIds, ...pathIds, ...caseIds]);

const missing = [];
for (const id of allReferencedIds) {
  if (!existingIds.has(id)) {
    missing.push(id);
  }
}

console.log(`\nReferenced from categories: ${catIds.size} articles`);
console.log(`Referenced from learning paths: ${pathIds.size} articles`);
console.log(`Referenced from cases: ${caseIds.size} articles`);
console.log(`Total unique referenced: ${allReferencedIds.size}`);

if (missing.length > 0) {
  console.log(`\n❌ MISSING articles (${missing.length}):`);
  missing.forEach(id => console.log(`  - ${id}`));
} else {
  console.log(`\n✅ All ${allReferencedIds.size} referenced articles exist!`);
}

const contentCheckRegex = /^\s{2}'([a-z][a-z0-9-]+)':\s*\{[\s\S]*?content:\s*`([\s\S]*?)`,\s*\n\s{2}\},/gm;
const contentShort = [];
const contentEmpty = [];
while ((match = contentCheckRegex.exec(articlesContent)) !== null) {
  const id = match[1];
  const content = match[2];
  const charCount = content.length;
  if (charCount < 200) {
    contentShort.push({ id, chars: charCount });
  }
  if (!content.trim()) {
    contentEmpty.push(id);
  }
}

if (contentEmpty.length > 0) {
  console.log(`\n❌ EMPTY content articles (${contentEmpty.length}):`);
  contentEmpty.forEach(id => console.log(`  - ${id}`));
} else {
  console.log(`\n✅ No empty content articles.`);
}

if (contentShort.length > 0) {
  console.log(`\n⚠️  Very short content (<200 chars) articles (${contentShort.length}):`);
  contentShort.forEach(a => console.log(`  - ${a.id}: ${a.chars} chars`));
} else {
  console.log(`✅ All articles have reasonable content length.`);
}

const extraIds = [];
for (const id of existingIds) {
  if (!allReferencedIds.has(id)) {
    extraIds.push(id);
  }
}
if (extraIds.length > 0) {
  console.log(`\nℹ️  Articles in ALL_ARTICLES but not directly linked from home page (${extraIds.length}):`);
  extraIds.forEach(id => console.log(`  - ${id}`));
}
