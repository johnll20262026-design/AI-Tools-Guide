import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const articlesPath = path.join(rootDir, 'src', 'data', 'articles.ts');
const content = fs.readFileSync(articlesPath, 'utf-8');

const articleRegex = /^\s{2}'([a-z0-9-]+)':\s*\{[\s\S]*?title:\s*'([^']+)'/gm;
const articles = [];
let match;
while ((match = articleRegex.exec(content)) !== null) {
  articles.push({ id: match[1], title: match[2] });
}

console.log(`Total articles: ${articles.length}\n`);

const groups = {};
for (const a of articles) {
  const prefix = a.id.split('-')[0];
  if (!groups[prefix]) groups[prefix] = [];
  groups[prefix].push(a);
}

for (const [prefix, list] of Object.entries(groups)) {
  console.log(`\n=== ${prefix.toUpperCase()} (${list.length}篇) ===`);
  list.forEach((a, i) => {
    console.log(`  ${i+1}. [${a.id}] ${a.title}`);
  });
}
