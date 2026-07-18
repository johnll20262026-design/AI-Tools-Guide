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

function extractContent(fileContent) {
  const startMarker = "content: `";
  const startIdx = fileContent.indexOf(startMarker);
  if (startIdx === -1) return null;
  
  const contentStart = startIdx + startMarker.length;
  const endMarker = "\n};";
  const endIdx = fileContent.lastIndexOf(endMarker);
  
  if (endIdx === -1 || endIdx < contentStart) return null;
  
  let contentEnd = endIdx;
  while (contentEnd > contentStart && (fileContent[contentEnd-1] === '`' || fileContent[contentEnd-1] === ';' || fileContent[contentEnd-1] === ',' || fileContent[contentEnd-1] === '\n' || fileContent[contentEnd-1] === '\r')) {
    contentEnd--;
  }
  if (fileContent[contentEnd] === '`') contentEnd++;
  
  return fileContent.substring(contentStart, contentEnd);
}

function countWords(content) {
  const withoutSpaces = content.replace(/\s/g, '');
  return withoutSpaces.length;
}

console.log("文件 | 总字符(去空格) | 状态\n");
let allPass = true;
filesToProcess.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const articleContent = extractContent(fileContent);
  if (articleContent) {
    const count = countWords(articleContent);
    const pass = count >= 1500;
    if (!pass) allPass = false;
    console.log(`${file}: ${count}字符 | ${pass ? '✅' : '❌ 需要补充'}`);
  } else {
    console.log(`${file}: 无法读取content字段 ❌`);
    allPass = false;
  }
});

console.log("\n" + (allPass ? "✅ 所有文件都达标！" : "❌ 还有文件未达标"));
