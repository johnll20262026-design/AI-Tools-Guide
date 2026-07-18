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

function countChineseNoCode(content) {
  const withoutCode = content.replace(/```[\s\S]*?```/g, '');
  const chineseRegex = /[\u4e00-\u9fa5]/g;
  const matches = withoutCode.match(chineseRegex);
  return matches ? matches.length : 0;
}

function countAllNoSpaceNoCode(content) {
  const withoutCode = content.replace(/```[\s\S]*?```/g, '');
  return withoutCode.replace(/\s/g, '').length;
}

function extractContent(fileContent) {
  const startMarker = "content: `";
  const startIdx = fileContent.indexOf(startMarker);
  if (startIdx === -1) return null;
  
  const contentStart = startIdx + startMarker.length;
  const endMarker = "`,";
  const endIdx = fileContent.lastIndexOf(endMarker);
  
  if (endIdx === -1 || endIdx < contentStart) return null;
  
  return fileContent.substring(contentStart, endIdx);
}

console.log("文件 | 中文(无代码块) | 总字符(无代码块,去空格)\n");
filesToProcess.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const articleContent = extractContent(fileContent);
  if (articleContent) {
    const chineseNoCode = countChineseNoCode(articleContent);
    const totalNoCodeNoSpace = countAllNoSpaceNoCode(articleContent);
    console.log(`${file}: 中文${chineseNoCode}字 | 总${totalNoCodeNoSpace}字符 | 用户报: ${getFileUserCount(file)}字 | ${totalNoCodeNoSpace < 1500 ? '❌' : '✅'}`);
  } else {
    console.log(`${file}: 无法读取content字段`);
  }
});

function getFileUserCount(file) {
  const counts = {
    'agent-6.ts': 1213,
    'case-1-3.ts': 1493,
    'case-1-5.ts': 1271,
    'case-3-1.ts': 1089,
    'case-3-2.ts': 1101,
    'case-3-4.ts': 1051,
    'case-4-1.ts': 1477,
    'case-4-3.ts': 1446,
    'path-beginner-10.ts': 1200,
    'path-beginner-3.ts': 1016,
    'path-beginner-4.ts': 1459,
    'path-intermediate-2.ts': 1431,
    'path-intermediate-3.ts': 1213,
    'path-intermediate-7.ts': 1424,
    'path-professional-5.ts': 1470,
    'prompt-3.ts': 662,
    'prompt-4.ts': 1047
  };
  return counts[file] || '?';
}
