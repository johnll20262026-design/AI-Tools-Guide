import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesPath = path.join(__dirname, '../src/data/articles.ts');
const content = fs.readFileSync(articlesPath, 'utf-8');

const promptIds = ['prompt-1', 'prompt-2', 'prompt-3', 'prompt-4', 'prompt-5', 'prompt-6'];

function countChineseChars(str) {
  const chineseRegex = /[\u4e00-\u9fa5]/g;
  const matches = str.match(chineseRegex);
  return matches ? matches.length : 0;
}

function extractContent(articleId) {
  const regex = new RegExp(`'${articleId}':[\\s\\S]*?content:\\s*\`([\\s\\S]*?)\`,`, 'm');
  const match = content.match(regex);
  return match ? match[1] : null;
}

console.log('='.repeat(60));
console.log('Prompt 文章字数统计');
console.log('='.repeat(60));
console.log('');

const results = [];
let allPassed = true;

for (const id of promptIds) {
  const articleContent = extractContent(id);
  if (!articleContent) {
    console.log(`❌ ${id}: 未找到内容`);
    allPassed = false;
    continue;
  }
  
  const charCount = countChineseChars(articleContent);
  const passed = charCount >= 4000;
  results.push({ id, charCount, passed });
  
  const status = passed ? '✅' : '❌';
  const statusText = passed ? '通过' : '未通过 (需要>=4000字)';
  console.log(`${status} ${id}: ${charCount} 中文字符 - ${statusText}`);
  
  if (!passed) allPassed = false;
}

console.log('');
console.log('-'.repeat(60));

const totalBefore = {
  'prompt-1': 785,
  'prompt-2': 607,
  'prompt-3': 528,
  'prompt-4': 489,
  'prompt-5': 457,
  'prompt-6': 316,
};

console.log('');
console.log('扩充前后字数对比：');
console.log('-'.repeat(60));
console.log('文章ID\t\t扩充前\t扩充后\t增加');
console.log('-'.repeat(60));

for (const { id, charCount } of results) {
  const before = totalBefore[id];
  const increase = charCount - before;
  const increasePercent = Math.round((increase / before) * 100);
  console.log(`${id}\t${before}\t${charCount}\t+${increase} (+${increasePercent}%)`);
}

console.log('-'.repeat(60));
console.log('');

if (allPassed) {
  console.log('✅ 所有文章都达到了 4000 字以上的要求！');
} else {
  console.log('❌ 部分文章未达到 4000 字要求，需要继续扩充。');
  process.exit(1);
}
