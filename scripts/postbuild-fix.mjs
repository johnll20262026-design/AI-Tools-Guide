import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, 'dist', 'client');
const indexPath = path.join(distDir, 'index.html');
const sourceIndexPath = path.join(rootDir, 'index.html');

let builtHtml = readFileSync(indexPath, 'utf-8');
const sourceHtml = readFileSync(sourceIndexPath, 'utf-8');

const assetScripts = [...builtHtml.matchAll(/<script type="module"[^>]*crossorigin[^>]*src="[^"]+"[^>]*><\/script>/g)].map(m => m[0]);
const assetLinks = [...builtHtml.matchAll(/<link[^>]*rel="(?:stylesheet|modulepreload)"[^>]*>/g)].map(m => m[0]);
const polyfillScript = builtHtml.includes('assets/polyfills.js') 
  ? builtHtml.match(/<script>\(function\(\)\{[\s\S]*?polyfills\.js[\s\S]*?\}\)\(\);<\/script>/)?.[0] || ''
  : '';

const cleanHead = `
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI工具指南 - 面向中文用户的AI工具实战教程与落地指南</title>
    <meta name="description" content="面向中文用户的AI工具实战教程与落地指南，提供系统化的AI工具学习路径，涵盖Prompt工程、AI绘画、AI视频、AI编程、AI办公、AI Agent、模型部署、AI安全等核心领域，配套免费在线工具。" />
    <meta name="keywords" content="AI工具教程,Prompt工程,AI绘画,AI视频,AI编程,AI办公,AI Agent,模型部署,AI安全,人工智能学习,中文AI教程,AI实战指南,Cursor,Midjourney,Stable Diffusion,LangChain,口袋调音器" />
    <meta name="author" content="AI工具指南" />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="AI工具指南 - 面向中文用户的AI工具实战教程与落地指南" />
    <meta property="og:description" content="面向中文用户的AI工具实战教程与落地指南，提供系统化的AI工具学习路径，涵盖Prompt工程、AI绘画、AI视频、AI编程、AI办公、AI Agent等核心领域，配套免费在线工具。" />
    <meta property="og:site_name" content="AI工具指南" />
    <meta property="og:locale" content="zh_CN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="AI工具指南 - 面向中文用户的AI工具实战教程与落地指南" />
    <meta name="twitter:description" content="面向中文用户的AI工具实战教程与落地指南，提供系统化的AI工具学习路径，配套免费在线工具。" />
    <link rel="apple-touch-icon" href="/favicon.svg" />
    <link rel="preload" as="image" href="/qrcode.png" />
    <link rel="preload" as="image" href="/wechat.png" />
    <link rel="preload" as="image" href="/wechat-pay.png" />
    <link rel="preload" as="image" href="/alipay.png" />
    <link rel="preload" as="image" href="/miniprogram.png" />
    ${polyfillScript}
    ${assetLinks.join('\n    ')}
    ${assetScripts.join('\n    ')}
  </head>`;

const finalHtml = `<!doctype html>
<html lang="zh-CN">
${cleanHead}
  <body>
    <div id="root"></div>
  </body>
</html>`;

writeFileSync(indexPath, finalHtml, 'utf-8');
console.log('✅ Post-build: Cleaned all Miaoda injected content, fixed title and meta tags');
