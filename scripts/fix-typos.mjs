import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../src/data/articles.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const replacements = [
  { from: /ComfyUi/g, to: 'ComfyUI' },
  { from: /Langchain(?!Flow)/g, to: 'LangChain' },
  { from: /Github/g, to: 'GitHub' },
];

let totalChanges = 0;
for (const { from, to } of replacements) {
  const matches = content.match(from);
  const count = matches ? matches.length : 0;
  if (count > 0) {
    content = content.replace(from, to);
    totalChanges += count;
    console.log(`Fixed: ${from} → ${to} (${count} occurrences)`);
  }
}

const typoFixes = [
  { from: '不能自己', to: '不能自已' },
];

for (const { from, to } of typoFixes) {
  const regex = new RegExp(from, 'g');
  const matches = content.match(regex);
  const count = matches ? matches.length : 0;
  if (count > 0) {
    content = content.replace(regex, to);
    totalChanges += count;
    console.log(`Fixed typo: "${from}" → "${to}" (${count} occurrences)`);
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\nTotal fixes applied: ${totalChanges}`);
console.log('Done!');
