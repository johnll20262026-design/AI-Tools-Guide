import fs from 'fs';
import path from 'path';
const articlesPath = 'c:/Users/YHhua/Documents/Trae_cn/op_vlog/src/data/articles.ts';
let content = fs.readFileSync(articlesPath, 'utf-8');
console.log('File length:', content.length);
const pos1 = content.lastIndexOf('};');
console.log('Last }; at:', pos1);
console.log('Around that position:', JSON.stringify(content.slice(pos1-30, pos1+50)));
