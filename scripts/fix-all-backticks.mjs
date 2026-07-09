import fs from 'fs';
const articlesPath = 'c:/Users/YHhua/Documents/Trae_cn/op_vlog/src/data/articles.ts';
let content = fs.readFileSync(articlesPath, 'utf-8');

// Strategy: Find each content: `...` block and escape internal backticks
// We need to find the opening backtick after "content: " and the closing backtick before ",\n"

let fixedContent = '';
let pos = 0;
let fixes = 0;

while (pos < content.length) {
  // Find next "content: `"
  const contentMarker = 'content: `';
  const contentStart = content.indexOf(contentMarker, pos);
  
  if (contentStart === -1) {
    fixedContent += content.substring(pos);
    break;
  }
  
  // Add everything before this content block
  fixedContent += content.substring(pos, contentStart + contentMarker.length);
  
  // Now find the closing backtick: it's a ` followed by ",\n  or `\n};
  const innerStart = contentStart + contentMarker.length;
  
  // We need to find the matching closing backtick
  // Since template literals in our data always end with `,\n  (followed by date: or readTime: or };)
  // We search for the pattern `,\n  (closing backtick followed by comma and newline)
  let searchPos = innerStart;
  let closePos = -1;
  
  while (searchPos < content.length) {
    // Look for backtick
    const bt = content.indexOf('`', searchPos);
    if (bt === -1) break;
    
    // Check what follows: should be ,\n  or \n}
    const after = content.substring(bt + 1, bt + 5);
    if (after.startsWith(',\n') || after.startsWith('\n}') || after.startsWith(', ')) {
      // Check it's not an escaped backtick (preceded by \)
      if (content[bt - 1] !== '\\') {
        closePos = bt;
        break;
      }
    }
    searchPos = bt + 1;
  }
  
  if (closePos === -1) {
    // Can't find closing, just add rest and break
    fixedContent += content.substring(innerStart);
    console.log('WARNING: Could not find closing backtick for content starting at', innerStart);
    break;
  }
  
  // Extract inner content
  let inner = content.substring(innerStart, closePos);
  
  // Escape unescaped backticks inside the content
  // Replace any ` that is NOT preceded by \ with \`
  // But be careful: already escaped \` should stay as is
  let escapedInner = '';
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '`') {
      // Check if it's already escaped
      if (i > 0 && inner[i - 1] === '\\') {
        // Already escaped, keep as is
        escapedInner += '`';
      } else {
        // Escape it
        escapedInner += '\\`';
        fixes++;
      }
    } else {
      escapedInner += inner[i];
    }
  }
  
  fixedContent += escapedInner;
  fixedContent += content.substring(closePos, closePos + 1); // Add the closing backtick
  pos = closePos + 1;
}

fs.writeFileSync(articlesPath, fixedContent, 'utf-8');
console.log(`Fixed ${fixes} unescaped backticks`);
console.log('Done!');
