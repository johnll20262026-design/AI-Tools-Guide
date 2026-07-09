import fs from 'fs';
const articlesPath = 'c:/Users/YHhua/Documents/Trae_cn/op_vlog/src/data/articles.ts';
let content = fs.readFileSync(articlesPath, 'utf-8');

// The issue is that inside the expanded articles (case-5-1 ~ case-6-5), 
// there are unescaped backticks in code blocks. Let's find these articles
// and properly escape backticks inside their content.

// Let's do it by finding each article content section and escaping internal backticks
// We'll look for content: `...` patterns and escape backticks inside

// A simpler approach: replace all ``` inside content with \`\`\`
// But only inside the new articles. Let's find the new articles marker first
const newSectionStart = content.indexOf('// ==================== 案例5：小红书爆款文案生成器 (5 篇) ====================');
if (newSectionStart === -1) {
  console.log('Could not find new section start');
  process.exit(1);
}

const before = content.substring(0, newSectionStart);
let newSection = content.substring(newSectionStart);

// Find the end of new section - it should end before the closing };
const closingBrace = newSection.lastIndexOf('};');
const newArticles = newSection.substring(0, closingBrace);
const after = newSection.substring(closingBrace);

// Now in newArticles, we need to escape backticks that are inside content strings
// The pattern is: inside content: ` ... `, any ` that is not the opening/closing needs escaping
// Since these are code blocks (``` typescript or ```), we can just replace ``` with \`\`\`
// But need to be careful - actually, in template literals, ANY backtick must be escaped as \`
let fixedNewArticles = newArticles;

// Let's find all content blocks and escape internal backticks
// We'll use a regex to match content: `...`, and replace unescaped backticks inside
function escapeBackticksInContent(str) {
  // Replace all ``` code fences with escaped versions first
  str = str.replace(/```/g, '\\`\\`\\`');
  // Also replace any single backticks that are not already escaped and not the opening/closing of content
  // Actually wait - in our case, the only backticks are code fences (```) and inline `code`,
  // but inline code should have been written with escaped backticks already. Let's check:
  // Looking at the content, the only unescaped backticks should be the ``` code blocks.
  return str;
}

fixedNewArticles = escapeBackticksInContent(fixedNewArticles);

const result = before + fixedNewArticles + after;
fs.writeFileSync(articlesPath, result, 'utf-8');
console.log('Fixed backticks in new articles');
