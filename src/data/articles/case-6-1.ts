import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'case-6-1',
  title: '个人AI知识库步骤1：数据源整合与清洗',
  description: '统一清洗分散在各处的笔记、书签、文档，建立干净知识源',
  date: '2026-04-30',
  readTime: '6 分钟',
  content: `## 通俗类比：数据源整合就是给图书馆采购和整理书籍

很多人对"个人AI知识库"的想象太美好——笔记一丢就能问任何问题。但实际做起来发现答非所问、瞎编，问题出在"垃圾进垃圾出"。就像图书馆如果都是盗版缺页、重复、乱摆、夹广告的书，读者当然找不到好书。数据源整合就是"采购、整理、上架"：挑好书、扔垃圾、去重修补、分类贴标签。这一步是地基，地基不牢后面全白搭。

我见过太多人上来就研究向量数据库、Embedding模型，折腾半天技术选型，结果数据清洗没做，效果一塌糊涂。2025年帮一个传统企业看知识库，十年文档导进去准确率不到40%——大量重复版本、扫描PDF乱码、格式混乱、文件名都是"新建文档.docx"。花两周清洗完，准确率直接升到85%，什么算法都没调。

我自己早期也踩坑：把五年收藏几千篇文章全导进去，结果返回三四年前过时内容、重复推荐、广告都当知识。后来删了70%垃圾，只留几百篇精华，效果立刻上来。**知识库不是越大越好，是越精越好**。

## 第一步：数据源全面盘点（1天）
先列全所有知识源，不要漏：笔记软件、浏览器书签、微信读书划线、知乎公众号收藏、本地PDF、聊天记录、邮件。列完你会惊讶存了这么多，但90%都是"收藏了就是学会了"吃灰内容。

**第一轮筛选狠下心断舍离**：
- 直接删：过时技术文、失效教程、水文、广告、确定不会再看的
- 不进库：电影、安装包、盗版扫描PDF、照片视频
- 保留：原创笔记、反复看的高质量文、经典书标注、常用手册、你花时间整理的干货

"万一以后有用"是最大误区——你现在不看以后也不会看，真需要互联网还能搜到，垃圾只会干扰真正有用的内容。我第一次删70%收藏，心疼但发现一点影响没有。

## 第二步：统一导出为Markdown
Markdown是RAG最友好的格式：纯文本结构清晰、标题层级明确、所有RAG框架都支持Markdown分割器、Git可版本管理。

各来源导出方法：
- Notion：右上角导出Markdown&CSV，注意图片要本地化
- Obsidian：本身就是Markdown直接用
- 微信读书：用"微信读书助手"浏览器插件导出，带书名章节批注
- PDF：文字版用Marker转（不要用pdftotext丢格式），扫描版先PaddleOCR识别，质量太差的放弃
- 网页：用简悦/SingleFile剪藏，自动去广告
- 印象笔记/语雀/飞书：都有Markdown导出

## 核心目标
把散落在Notion、Obsidian、浏览器书签、微信收藏、Kindle标注、本地文件里的所有知识全部整合起来，去重、清洗、格式化，形成干净可用的数据源——记住：垃圾进垃圾出，这一步是整个知识库的基础，基础打不好后面什么都白搭。

## 操作步骤

### 1. 数据源全面盘点（1天）
先列全你所有知识存放的地方，一个都不要漏：
- **笔记软件**：Notion、Obsidian、语雀、印象笔记、飞书文档、OneNote
- **浏览器**：Chrome/Edge书签（重点是收藏夹里吃灰的那些）、Pocket/Instapaper稍后读
- **阅读类**：微信读书划线和笔记、Kindle标注、得到笔记
- **文章收藏**：知乎收藏、公众号收藏、CSDN/掘金收藏
- **本地文件**：电脑里的PDF、课程笔记、Markdown文件、下载的电子书
- **其他**：邮件里的干货、聊天记录里收藏的重要信息、工作文档
列完你会惊讶原来自己存了这么多东西，但90%都没看过第二遍。

### 2. 统一导出为Markdown格式
所有内容统一转成Markdown，这是对RAG最友好的格式：
- Notion：右上角→导出→Markdown&CSV，会打包下载
- Obsidian：本身就是Markdown，直接用文件夹就行
- 微信读书：用"微信读书助手"浏览器插件导出划线和笔记
- PDF：推荐用Marker（开源AI工具）转，不要用纯文本提取，会丢格式和表格
- 网页：用简悦/SingleFile剪藏插件，保存为干净的Markdown
- 印象笔记/语雀：都有导出Markdown功能

### 3. Python批量清洗脚本
不要手动一篇篇改，写个Python脚本批量处理：
\\\`\\\`\\\`python
import os, re, hashlib
from pathlib import Path

def clean_markdown(content):
    content = re.sub(r'\\\\n{3,}', '\\\\n\\\\n', content)  # 去除多余空行
    content = re.sub(r'扫码关注.*?公众号.*?\\\\n', '', content)  # 去公众号广告
    content = re.sub(r'本文由.*?授权发布.*?\\\\n', '', content)  # 去版权声明
    content = re.sub(r'!\\\\[.*?\\\\]\\\\(data:.*?\\\\)', '', content)  # 去base64图片
    lines = content.split('\\\\n')
    seen_titles = set()
    clean_lines = []
    for line in lines:
        if line.startswith('# ') and line in seen_titles:
            continue
        if line.startswith('# '):
            seen_titles.add(line)
        clean_lines.append(line)
    return '\\\\n'.join(clean_lines)

input_dir = Path('raw_notes')
output_dir = Path('clean_notes')
output_dir.mkdir(exist_ok=True)
seen_hashes = set()
for file in input_dir.glob('**/*.md'):
    file_hash = hashlib.md5(file.read_bytes()).hexdigest()
    if file_hash in seen_hashes: continue
    seen_hashes.add(file_hash)
    try:
        content = file.read_text(encoding='utf-8')
    except: continue
    if len(content.strip()) < 100: continue  # 太短的扔掉
    cleaned = clean_markdown(content)
    (output_dir / file.name).write_text(cleaned, encoding='utf-8')
\\\`\\\`\\`,
};

export default article;
