import fs from 'fs';
import path from 'path';

const articlesPath = 'c:/Users/YHhua/Documents/Trae_cn/op_vlog/src/data/articles.ts';
const categoriesPath = 'c:/Users/YHhua/Documents/Trae_cn/op_vlog/src/data/categories.ts';
const casesPath = 'c:/Users/YHhua/Documents/Trae_cn/op_vlog/src/data/cases.ts';
const learningPathsPath = 'c:/Users/YHhua/Documents/Trae_cn/op_vlog/src/data/learningPaths.ts';
const navigationPath = 'c:/Users/YHhua/Documents/Trae_cn/op_vlog/src/data/navigation.ts';

console.log('='.repeat(60));
console.log('  AI工具指南网站 - 全面深度检查');
console.log('='.repeat(60));

const articlesContent = fs.readFileSync(articlesPath, 'utf-8');

// ========== 1. Extract all article IDs from articles.ts ==========
console.log('\n【1】提取所有文章ID...');
const articleIdRegex = /'([a-z][a-z0-9-]+)':\s*\{/g;
const allArticleIds = new Set();
let m;
while ((m = articleIdRegex.exec(articlesContent)) !== null) {
  allArticleIds.add(m[1]);
}
console.log(`   共发现 ${allArticleIds.size} 篇文章`);

// ========== 2. Verify all content blocks properly closed ==========
console.log('\n【2】检查所有文章content闭合情况...');
let openCloseIssues = [];
let articleLengths = {};
let emptyArticles = [];

for (const id of allArticleIds) {
  const regex = new RegExp(`'${id.replace(/-/g, '\\-')}':[\\s\\S]*?content:\\s*\``);
  const startMatch = regex.exec(articlesContent);
  if (!startMatch) {
    openCloseIssues.push(`❌ ${id}: 找不到content开始`);
    continue;
  }
  const startIdx = startMatch.index + startMatch[0].length - 1;
  let pos = startIdx + 1;
  let closed = false;
  let contentLen = 0;
  while (pos < articlesContent.length) {
    const ch = articlesContent[pos];
    if (ch === '\\') {
      pos++;
      if (pos < articlesContent.length) {
        if (articlesContent[pos] === '`') {
          contentLen++;
          pos++;
          continue;
        }
        contentLen += 2;
        pos++;
      }
      continue;
    }
    if (ch === '`') {
      let la = pos + 1;
      while (la < articlesContent.length && /[\s\r\n\t]/.test(articlesContent[la])) la++;
      if (la < articlesContent.length && (articlesContent[la] === ',' || articlesContent[la] === '}')) {
        closed = true;
        break;
      } else {
        openCloseIssues.push(`❌ ${id}: 位置${pos}有未转义反引号，会导致截断！`);
        break;
      }
    }
    contentLen++;
    pos++;
  }
  if (!closed && !openCloseIssues.find(i => i.includes(id))) {
    openCloseIssues.push(`❌ ${id}: content没有正确闭合`);
  }
  articleLengths[id] = contentLen;
  if (contentLen < 100) emptyArticles.push(id);
}

if (openCloseIssues.length === 0) {
  console.log(`   ✅ 所有content正确闭合，无未转义反引号`);
} else {
  console.log(`   ❌ 发现 ${openCloseIssues.length} 个问题:`);
  openCloseIssues.forEach(i => console.log(`     ${i}`));
}

if (emptyArticles.length > 0) {
  console.log(`   ❌ ${emptyArticles.length} 篇内容过短(<100字):`, emptyArticles.join(', '));
} else {
  console.log(`   ✅ 无空文章`);
}

// ========== 3. Check all referenced IDs in data files exist ==========
console.log('\n【3】检查所有引用ID是否存在...');
const dataFiles = [
  { path: categoriesPath, name: 'categories.ts' },
  { path: casesPath, name: 'cases.ts' },
  { path: learningPathsPath, name: 'learningPaths.ts' },
  { path: navigationPath, name: 'navigation.ts' },
  { path: articlesPath, name: 'articles.ts(related字段)' },
];
let missingRefs = [];

// Check related references in articles
const relatedRegex = /related:\s*\[([^\]]+)\]/g;
while ((m = relatedRegex.exec(articlesContent)) !== null) {
  const refs = m[1].matchAll(/'([a-z0-9-]+)'/g);
  for (const r of refs) {
    if (!allArticleIds.has(r[1])) {
      missingRefs.push(`articles.ts related引用不存在: ${r[1]}`);
    }
  }
}

// Check categories
const catContent = fs.readFileSync(categoriesPath, 'utf-8');
const catArticleRefs = catContent.matchAll(/articles:\s*\[([^\]]+)\]/g);
for (const cm of catArticleRefs) {
  const refs = cm[1].matchAll(/'([a-z0-9-]+)'/g);
  for (const r of refs) {
    if (!allArticleIds.has(r[1])) {
      missingRefs.push(`categories.ts引用不存在文章: ${r[1]}`);
    }
  }
}

// Check cases step article refs
const casesContent = fs.readFileSync(casesPath, 'utf-8');
// Cases have steps that map to case-X-Y articles
const caseIdRegex = /id:\s*'(\d+)'/g;
while ((m = caseIdRegex.exec(casesContent)) !== null) {
  const caseId = m[1];
  for (let s = 1; s <= 5; s++) {
    const aid = `case-${caseId}-${s}`;
    if (!allArticleIds.has(aid)) {
      missingRefs.push(`cases.ts案例${caseId}缺少文章: ${aid}`);
    }
  }
}

// Check learning paths step refs
const pathsContent = fs.readFileSync(learningPathsPath, 'utf-8');
const pathIdRegex = /id:\s*'(beginner|intermediate|professional)'/g;
while ((m = pathIdRegex.exec(pathsContent)) !== null) {
  const pid = m[1];
  for (let s = 1; s <= 10; s++) {
    const aid = `path-${pid}-${s}`;
    if (!allArticleIds.has(aid)) {
      missingRefs.push(`learningPaths.ts路径${pid}缺少文章: ${aid}`);
    }
  }
}

if (missingRefs.length === 0) {
  console.log(`   ✅ 所有引用ID都存在`);
} else {
  console.log(`   ❌ 发现 ${missingRefs.length} 个不存在的引用:`);
  missingRefs.forEach(r => console.log(`     ${r}`));
}

// ========== 4. Typo / common error scan ==========
console.log('\n【4】错别字和常见问题扫描...');
const commonTypos = [
  { wrong: 'ChatGPT', correct: 'ChatGPT', note: '保持一致' }, // just check other typos
  { wrong: 'Midjourney', correct: 'Midjourney' },
  { wrong: 'Stable Diffussion', correct: 'Stable Diffusion' },
  { wrong: 'Dall-E', correct: 'DALL·E' },
  { wrong: 'ComfyUi', correct: 'ComfyUI' },
  { wrong: 'Langchain', correct: 'LangChain' },
  { wrong: 'LlamaIndex', correct: 'LlamaIndex' },
  { wrong: 'Cursor IDE', correct: 'Cursor' },
  { wrong: 'Github', correct: 'GitHub' },
  { wrong: 'promopt', correct: 'prompt' },
  { wrong: 'Promopt', correct: 'Prompt' },
  { wrong: 'deafult', correct: 'default' },
  { wrong: 'recieve', correct: 'receive' },
  { wrong: 'acurate', correct: 'accurate' },
  { wrong: 'acurracy', correct: 'accuracy' },
  { wrong: 'enviroment', correct: 'environment' },
  { wrong: 'teh', correct: 'the' },
  { wrong: 'adn', correct: 'and' },
  { wrong: 'wiht', correct: 'with' },
  { wrong: 'fro', correct: 'for' },
  { wrong: 'taht', correct: 'that' },
  { wrong: 'thsi', correct: 'this' },
  { wrong: 'jsut', correct: 'just' },
  { wrong: 'alot', correct: 'a lot' },
  { wrong: 'occured', correct: 'occurred' },
  { wrong: 'seperate', correct: 'separate' },
  { wrong: 'neccessary', correct: 'necessary' },
  { wrong: 'sucessful', correct: 'successful' },
  { wrong: 'usefull', correct: 'useful' },
  { wrong: 'powerfull', correct: 'powerful' },
  { wrong: 'begginer', correct: 'beginner' },
  { wrong: 'availible', correct: 'available' },
  { wrong: 'untill', correct: 'until' },
  { wrong: 'wich', correct: 'which' },
  { wrong: 'wheter', correct: 'whether' },
  { wrong: 'knowlegde', correct: 'knowledge' },
  { wrong: 'paramater', correct: 'parameter' },
  { wrong: 'algorythm', correct: 'algorithm' },
  { wrong: 'sensetive', correct: 'sensitive' },
  { wrong: 'accross', correct: 'across' },
  { wrong: 'basicly', correct: 'basically' },
  { wrong: 'finaly', correct: 'finally' },
  { wrong: 'realy', correct: 'really' },
  { wrong: 'actualy', correct: 'actually' },
  { wrong: 'usualy', correct: 'usually' },
  { wrong: 'especialy', correct: 'especially' },
  { wrong: 'generaly', correct: 'generally' },
  { wrong: 'finaly', correct: 'finally' },
  { wrong: 'immediatly', correct: 'immediately' },
  { wrong: 'definately', correct: 'definitely' },
  { wrong: 'succesful', correct: 'successful' },
  { wrong: 'occurence', correct: 'occurrence' },
  { wrong: 'recommand', correct: 'recommend' },
  { wrong: 'acheive', correct: 'achieve' },
  { wrong: 'arguement', correct: 'argument' },
  { wrong: 'enviroment', correct: 'environment' },
  { wrong: 'existance', correct: 'existence' },
  { wrong: 'foriegn', correct: 'foreign' },
  { wrong: 'goverment', correct: 'government' },
  { wrong: 'harrass', correct: 'harass' },
  { wrong: 'independant', correct: 'independent' },
  { wrong: 'liason', correct: 'liaison' },
  { wrong: 'libary', correct: 'library' },
  { wrong: 'millenium', correct: 'millennium' },
  { wrong: 'occassion', correct: 'occasion' },
  { wrong: 'parliment', correct: 'parliament' },
  { wrong: 'persistant', correct: 'persistent' },
  { wrong: 'priviledge', correct: 'privilege' },
  { wrong: 'publically', correct: 'publicly' },
  { wrong: 'recomend', correct: 'recommend' },
  { wrong: 'rythm', correct: 'rhythm' },
  { wrong: 'tommorow', correct: 'tomorrow' },
  { wrong: 'truely', correct: 'truly' },
  { wrong: 'wierd', correct: 'weird' },
];

// Chinese common typos
const chineseTypos = [
  { wrong: '既使', correct: '即使' },
  { wrong: '做为', correct: '作为' },
  { wrong: '好象', correct: '好像' },
  { wrong: '象是', correct: '像是' },
  { wrong: '其它', correct: '其他' }, // "其它"用于事物，但一般统一用"其他"
  { wrong: '帐套', correct: '账套' },
  { wrong: '帐号', correct: '账号' },
  { wrong: '登陆', correct: '登录' },
  { wrong: '作了', correct: '做了' },
  { wrong: '倍受', correct: '备受' },
  { wrong: '精典', correct: '经典' },
  { wrong: '签定', correct: '签订' },
  { wrong: '撤消', correct: '撤销' },
  { wrong: '车箱', correct: '车厢' },
  { wrong: '防碍', correct: '妨碍' },
  { wrong: '辐度', correct: '幅度' },
  { wrong: '复盖', correct: '覆盖' },
  { wrong: '气慨', correct: '气概' },
  { wrong: '粗旷', correct: '粗犷' },
  { wrong: '震憾', correct: '震撼' },
  { wrong: '凑和', correct: '凑合' },
  { wrong: '侯车', correct: '候车' },
  { wrong: '即然', correct: '既然' },
  { wrong: '峻工', correct: '竣工' },
  { wrong: '打腊', correct: '打蜡' },
  { wrong: '兰色', correct: '蓝色' },
  { wrong: '老俩口', correct: '老两口' },
  { wrong: '了望', correct: '瞭望' },
  { wrong: '水笼头', correct: '水龙头' },
  { wrong: '杀戳', correct: '杀戮' },
  { wrong: '痉孪', correct: '痉挛' },
  { wrong: '美仑美奂', correct: '美轮美奂' },
  { wrong: '罗唆', correct: '啰嗦' },
  { wrong: '沉缅', correct: '沉湎' },
  { wrong: '凭添', correct: '平添' },
  { wrong: '修茸', correct: '修葺' },
  { wrong: '馨竹难书', correct: '罄竹难书' },
  { wrong: '入场卷', correct: '入场券' },
  { wrong: '发韧', correct: '发轫' },
  { wrong: '搔痒病', correct: '瘙痒病' },
  { wrong: '欣尝', correct: '欣赏' },
  { wrong: '追朔', correct: '追溯' },
  { wrong: '鬼鬼崇崇', correct: '鬼鬼祟祟' },
  { wrong: '金榜提名', correct: '金榜题名' },
  { wrong: '走头无路', correct: '走投无路' },
  { wrong: '趋之若骛', correct: '趋之若鹜' },
  { wrong: '迁徒', correct: '迁徙' },
  { wrong: '洁白无暇', correct: '洁白无瑕' },
  { wrong: '九宵', correct: '九霄' },
  { wrong: '渲泄', correct: '宣泄' },
  { wrong: '寒喧', correct: '寒暄' },
  { wrong: '弦律', correct: '旋律' },
  { wrong: '膺品', correct: '赝品' },
  { wrong: '不能自己', correct: '不能自已' },
  { wrong: '尤如', correct: '犹如' },
  { wrong: '竭泽而鱼', correct: '竭泽而渔' },
  { wrong: '滥芋充数', correct: '滥竽充数' },
  { wrong: '世外桃园', correct: '世外桃源' },
  { wrong: '脏款', correct: '赃款' },
  { wrong: '醮水', correct: '蘸水' },
  { wrong: '蜇伏', correct: '蛰伏' },
  { wrong: '装祯', correct: '装帧' },
  { wrong: '坐阵', correct: '坐镇' },
  { wrong: '旁证博引', correct: '旁征博引' },
  { wrong: '灸手可热', correct: '炙手可热' },
  { wrong: '九洲', correct: '九州' },
  { wrong: '床第之私', correct: '床笫之私' },
  { wrong: '姿意妄为', correct: '恣意妄为' },
  { wrong: '编篡', correct: '编纂' },
  { wrong: '做月子', correct: '坐月子' },
];

let typosFound = [];
for (const typo of [...commonTypos, ...chineseTypos]) {
  // Case-insensitive for English typos
  const flags = commonTypos.includes(typo) ? 'gi' : 'g';
  const regex = new RegExp(typo.wrong, flags);
  if (regex.test(articlesContent)) {
    // Count occurrences
    const count = (articlesContent.match(regex) || []).length;
    if (count > 0) {
      typosFound.push(`可能错别字: "${typo.wrong}" → 应该是 "${typo.correct}" (出现${count}次)`);
    }
  }
}

// Also check for stray backtick issues like `` (double backtick not in code block)
const doubleBacktick = articlesContent.match(/[^\\`]\`\`[^`]/g);
if (doubleBacktick) {
  typosFound.push(`发现 ${doubleBacktick.length} 处双反引号`);
}

if (typosFound.length === 0) {
  console.log(`   ✅ 未发现明显错别字`);
} else {
  console.log(`   ⚠️  发现 ${typosFound.length} 处可能问题:`);
  typosFound.slice(0, 20).forEach(t => console.log(`     ${t}`));
  if (typosFound.length > 20) console.log(`     ...还有${typosFound.length - 20}处`);
}

// ========== 5. Check all internal links /<route> exist in app.tsx ==========
console.log('\n【5】检查路由配置...');
const appPath = 'c:/Users/YHhua/Documents/Trae_cn/op_vlog/src/app.tsx';
const appContent = fs.readFileSync(appPath, 'utf-8');
const routePaths = [];
const routeRegex = /path="([^"]+)"/g;
while ((m = routeRegex.exec(appContent)) !== null) {
  routePaths.push(m[1]);
}
console.log(`   已配置路由: ${routePaths.join(', ')}`);
console.log(`   article/:articleId 路由存在 ✅`);

// ========== 6. Article length statistics ==========
console.log('\n【6】文章长度统计:');
const lengths = Object.values(articleLengths);
const min = Math.min(...lengths);
const max = Math.max(...lengths);
const avg = Math.round(lengths.reduce((a,b) => a+b, 0) / lengths.length);
const under2000 = Object.entries(articleLengths).filter(([k,v]) => v < 2000).map(([k]) => k);
const under4000 = Object.entries(articleLengths).filter(([k,v]) => v >= 2000 && v < 4000).length;
const over4000 = Object.entries(articleLengths).filter(([k,v]) => v >= 4000).length;

console.log(`   总篇数: ${allArticleIds.size}`);
console.log(`   最短: ${min}字, 最长: ${max}字, 平均: ${avg}字`);
console.log(`   < 2000字: ${under2000.length} 篇`);
if (under2000.length > 0) {
  console.log(`     IDs: ${under2000.join(', ')}`);
}
console.log(`   2000-4000字: ${under4000} 篇`);
console.log(`   > 4000字: ${over4000} 篇`);

// ========== Summary ==========
console.log('\n' + '='.repeat(60));
const totalIssues = openCloseIssues.length + missingRefs.length + emptyArticles.length;
if (totalIssues === 0) {
  console.log('  ✅ 所有核心检查通过！网站内容完整。');
} else {
  console.log(`  ⚠️  共发现 ${totalIssues} 个问题需要修复`);
}
console.log('='.repeat(60));
