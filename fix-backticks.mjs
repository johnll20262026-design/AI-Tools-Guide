import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, 'src', 'data', 'articles');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const contentStartMatch = content.match(/content:\s*`/);
  if (!contentStartMatch) {
    return false;
  }
  
  const startIndex = contentStartMatch.index + contentStartMatch[0].length;
  
  let endIndex = -1;
  let i = startIndex;
  while (i < content.length) {
    if (content[i] === '`') {
      let backslashCount = 0;
      let j = i - 1;
      while (j >= 0 && content[j] === '\\') {
        backslashCount++;
        j--;
      }
      if (backslashCount % 2 === 0) {
        let k = i + 1;
        while (k < content.length && /\s/.test(content[k])) {
          k++;
        }
        if (k < content.length && content[k] === ',') {
          endIndex = i;
          break;
        }
      }
    }
    i++;
  }
  
  if (endIndex === -1) {
    console.log(`Warning: Could not find end of content in ${path.basename(filePath)}`);
    return false;
  }
  
  const before = content.substring(0, startIndex);
  const templateContent = content.substring(startIndex, endIndex);
  const after = content.substring(endIndex);
  
  let fixedTemplate = '';
  for (let k = 0; k < templateContent.length; k++) {
    if (templateContent[k] === '`') {
      let backslashCount = 0;
      let j = k - 1;
      while (j >= 0 && templateContent[j] === '\\') {
        backslashCount++;
        j--;
      }
      if (backslashCount % 2 === 0) {
        fixedTemplate += '\\`';
      } else {
        fixedTemplate += '`';
      }
    } else {
      fixedTemplate += templateContent[k];
    }
  }
  
  const newContent = before + fixedTemplate + after;
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }
  return false;
}

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

let fixedCount = 0;
for (const file of files) {
  const filePath = path.join(articlesDir, file);
  if (fixFile(filePath)) {
    console.log(`Fixed: ${file}`);
    fixedCount++;
  }
}

console.log(`\nTotal files fixed: ${fixedCount}`);
