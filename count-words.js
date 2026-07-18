const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src/data/articles');
const filesToProcess = [
  'agent-6.ts', 'case-1-3.ts', 'case-1-5.ts', 'case-3-1.ts', 'case-3-2.ts',
  'case-3-4.ts', 'case-4-1.ts', 'case-4-3.ts', 'path-beginner-10.ts',
  'path-beginner-3.ts', 'path-beginner-4.ts', 'path-intermediate-2.ts',
  'path-intermediate-3.ts', 'path-intermediate-7.ts', 'path-professional-5.ts',
  'prompt-3.ts', 'prompt-4.ts'
];

function countWords(content) {
  const withoutSpaces = content.replace(/\s/g, '');
  return withoutSpaces.length;
}

filesToProcess.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const contentMatch = content.match(/content:\s*`([\s\S]*?)`/);
  if (contentMatch) {
    const articleContent = contentMatch[1];
    const wordCount = countWords(articleContent);
    console.log(`${file}: ${wordCount} 字 ${wordCount < 1500 ? '❌ (需要扩展 ' + (1500 - wordCount) + ' 字)' : '✅'}`);
  } else {
    console.log(`${file}: 无法读取content字段`);
  }
});
