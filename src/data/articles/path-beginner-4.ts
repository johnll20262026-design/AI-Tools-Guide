import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'path-beginner-4',
  title: 'AI 绘画入门：用 Midjourney / DALL·E 生成精美图片',
  description: '从零开始学习AI绘画：工具选择、Prompt写作技巧、常用参数、风格词库，新手10分钟出第一张图。',
  date: '2026-06-18',
  readTime: '8-10 分钟',
  related: ['painting-1', 'painting-2', 'path-beginner-5'],
  content: `## 为什么要学 AI 绘画？

在AI工具中，AI绘画是最容易上手、效果最直观、成就感最强的一个方向。你不需要会画画、不需要懂设计，只要会打字描述你想要什么，AI就能在30秒内给你生成一张精美的图片。发朋友圈配图、做PPT插图、做电商主图、做头像壁纸、做孩子的绘本插图、甚至做品牌Logo，AI绘画都能帮你搞定。

2024年以来，AI绘画工具的质量已经达到了专业设计师的入门水平，很多电商公司、自媒体团队、广告公司已经把AI绘画作为日常生产工具。学会AI绘画，你就相当于拥有了一个24小时待命、不收工资、什么风格都能画的私人设计师。

## 工具选择：Midjourney vs DALL·E vs Stable Diffusion

新手入门最困惑的就是选工具。三个主流工具各有优势，按你的需求选择：

**Midjourney（推荐新手首选）**
- 优点：出图质量最高，不用安装，Discord里直接用，上手最简单
- 缺点：需要科学上网，收费（\$10/月起），可控性较差
- 适合：快速出图、灵感创意、不追求精确控制的场景

**DALL·E 3（ChatGPT内置）**
- 优点：最能理解自然语言描述，你说中文它也能准确理解，和ChatGPT无缝衔接
- 缺点：风格相对单一，精细控制能力弱
- 适合：和ChatGPT Pro配合用，快速出概念图、插图

**Stable Diffusion（本地部署）**
- 优点：完全免费，可控性最强，有海量模型和插件，可以训练自己的风格
- 缺点：需要较好的显卡（推荐8GB以上显存），安装配置较复杂
- 适合：想深入学习、做商业批量生产、注重隐私的用户

**新手建议**：先用Midjourney或DALL·E体验AI绘画的魅力，建立直觉后再考虑本地部署Stable Diffusion。

## Midjourney 快速上手（10分钟出第一张图）

Midjourney运行在Discord上，使用步骤：

1. **准备环境**：注册Discord账号（discord.com），确保能访问Discord
2. **订阅Midjourney**：访问midjourney.com，点击"Join the Beta"，在Discord里输入/subscribe订阅（基础版\$10/月，足够新手用）
3. **进入新手频道**：在Midjourney服务器里找一个newbie频道
4. **生成第一张图**：输入 \\\`/imagine\\\` 命令，在prompt框里输入描述，比如：\\\`a cute cat wearing a hat, watercolor style, soft lighting\\`,
};

export default article;
