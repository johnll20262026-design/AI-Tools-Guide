const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'src', 'data', 'articles.ts');
let content = fs.readFileSync(articlesPath, 'utf-8');

// Simple state machine: find every "content:" that's followed by whitespace and a backtick,
// then replace everything up to the matching closing backtick with empty string
let result = '';
let i = 0;

while (i < content.length) {
  // Look for pattern: whitespace + 'content:' + whitespace + '`'
  if (content.substring(i, i + 8) === 'content:' && 
      (i === 0 || /\s/.test(content[i-1]))) {
    // Found "content:" - now skip whitespace to find backtick
    let j = i + 8;
    while (j < content.length && /[\s]/.test(content[j])) j++;
    
    if (j < content.length && content[j] === '`') {
      // This is a content template literal - find matching closing backtick
      // Add "content: ``" (empty content)
      result += 'content: ""';
      
      // Skip past the opening backtick
      j++;
      
      // Now find the closing backtick (accounting for escaped backticks)
      while (j < content.length) {
        if (content[j] === '`') {
          // Count preceding backslashes
          let bsCount = 0;
          let k = j - 1;
          while (k >= 0 && content[k] === '\\') {
            bsCount++;
            k--;
          }
          if (bsCount % 2 === 0) {
            // Found closing backtick
            j++;
            break;
          }
        }
        j++;
      }
      
      i = j;
      continue;
    }
  }
  
  result += content[i];
  i++;
}

// Update exports
result = result.replace(
  '// EXPORTS: ALL_ARTICLES, ARTICLE_IDS_WITH_FULL_CONTENT',
  '// EXPORTS: ALL_ARTICLES_META - Article metadata only (no full content), used by list pages to keep bundle small'
);

result = result.replace(
  'export const ALL_ARTICLES: Record<string, IArticle> = {',
  'export const ALL_ARTICLES_META: Record<string, Omit<IArticle, "content"> & { content: string }> = {'
);

// Fix ARTICLE_IDS_WITH_FULL_CONTENT
result = result.replace(
  'export const ARTICLE_IDS_WITH_FULL_CONTENT = new Set(Object.keys(ALL_ARTICLES));',
  'export const ARTICLE_IDS_WITH_FULL_CONTENT = new Set(Object.keys(ALL_ARTICLES_META));'
);

const outPath = path.join(__dirname, '..', 'src', 'data', 'articles-meta.ts');
fs.writeFileSync(outPath, result, 'utf-8');
console.log(`Written articles-meta.ts (${Math.round(fs.statSync(outPath).size / 1024)}KB)`);
console.log('Done!');
