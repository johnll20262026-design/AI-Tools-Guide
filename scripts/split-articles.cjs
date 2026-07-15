const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'src', 'data', 'articles.ts');
let content = fs.readFileSync(articlesPath, 'utf-8');

// Extract all article entries using a more robust approach
// We'll find each article key and its object, then remove the content field

// First, let's split the file into parts
const metaLines = [];
const contentEntries = [];

// Simple state machine approach
let i = 0;
let depth = 0;
let inContent = false;
let contentStart = -1;
let currentArticleId = '';
let articleStart = -1;
let braceDepth = 0;
let inTemplateLiteral = false;
let templateDepth = 0;

// We'll do a simpler approach: find all 'content: `' patterns and extract until the matching closing `
// Then reconstruct the meta file without content fields

// Find all content fields
const contentRegex = /content:\s*`/g;
let match;
const contentFields = [];

while ((match = contentRegex.exec(content)) !== null) {
  const startIdx = match.index;
  // Find the closing backtick
  let j = startIdx + match[0].length;
  while (j < content.length) {
    if (content[j] === '`' && content[j-1] !== '\\') {
      // Check if this is really the end (not escaped)
      let backslashCount = 0;
      let k = j - 1;
      while (k >= 0 && content[k] === '\\') {
        backslashCount++;
        k--;
      }
      if (backslashCount % 2 === 0) {
        break;
      }
    }
    j++;
  }
  const endIdx = j;
  const contentStr = content.substring(startIdx + match[0].length, endIdx);
  contentFields.push({ start: startIdx, end: endIdx, content: contentStr });
}

console.log(`Found ${contentFields.length} article content fields`);

// Now find article IDs by looking backwards from each content field for the key pattern
// Pattern like:  'article-id': {
const articleEntries = [];

for (let idx = contentFields.length - 1; idx >= 0; idx--) {
  const cf = contentFields[idx];
  // Search backwards from cf.start to find the article key
  const before = content.substring(0, cf.start);
  // Look for pattern:  'some-key': {
  const keyMatch = before.match(/'([^']+)'\s*:\s*\{\s*$/m);
  if (!keyMatch) {
    // Try multiline
    const keyMatch2 = before.match(/'([^']+)'\s*:\s*\{[^}]*$/);
    if (keyMatch2) {
      articleEntries.unshift({ id: keyMatch2[1], content: cf.content, contentStart: cf.start, contentEnd: cf.end });
    }
  } else {
    articleEntries.unshift({ id: keyMatch[1], content: cf.content, contentStart: cf.start, contentEnd: cf.end });
  }
}

console.log(`Identified ${articleEntries.length} articles with IDs`);

// Build meta content: remove all content fields
let metaContent = content;
// Remove from end to start to preserve indices
for (let idx = contentFields.length - 1; idx >= 0; idx--) {
  const cf = contentFields[idx];
  // Remove "content: `" to the closing "`"
  // We need to also remove the comma before if it exists, or after
  // Find "content:" start
  const lineStart = metaContent.lastIndexOf('\n', cf.start);
  let removeStart = cf.start;
  // Check if there's a comma before
  let beforeContent = metaContent.substring(0, cf.start).trimEnd();
  if (beforeContent.endsWith(',')) {
    removeStart = beforeContent.lastIndexOf(',');
  }
  metaContent = metaContent.substring(0, removeStart) + metaContent.substring(cf.end + 1);
}

// Update the export comment
metaContent = metaContent.replace(
  '// EXPORTS: ALL_ARTICLES, ARTICLE_IDS_WITH_FULL_CONTENT',
  '// EXPORTS: ALL_ARTICLES_META - Article metadata without full content (for list pages)'
);

// Change the export name
metaContent = metaContent.replace(
  'export const ALL_ARTICLES: Record<string, IArticle> = {',
  'export const ALL_ARTICLES_META: Record<string, Omit<IArticle, "content">> = {'
);

// Write meta file
const metaPath = path.join(__dirname, '..', 'src', 'data', 'articles-meta.ts');
fs.writeFileSync(metaPath, metaContent, 'utf-8');
console.log(`Written articles-meta.ts (${Math.round(fs.statSync(metaPath).size / 1024)}KB)`);

// Build content lookup file
let contentFile = `// Auto-generated - Article content lookup (lazy loaded for detail pages only)

import type { IArticle } from '@/types/tutorial';

export const ARTICLE_CONTENTS: Record<string, string> = {
`;

for (const entry of articleEntries) {
  // Escape backticks and ${ in content
  const escaped = entry.content
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  contentFile += `  '${entry.id}': \`${escaped}\`,\n`;
}

contentFile += `};

// Helper: merge meta with content for detail pages
export function getArticleWithContent(id: string, meta: Omit<IArticle, 'content'>): IArticle {
  return {
    ...meta,
    content: ARTICLE_CONTENTS[id] || '',
  };
}
`;

const contentPath = path.join(__dirname, '..', 'src', 'data', 'articles-content.ts');
fs.writeFileSync(contentPath, contentFile, 'utf-8');
console.log(`Written articles-content.ts (${Math.round(fs.statSync(contentPath).size / 1024)}KB)`);
console.log('Done!');
