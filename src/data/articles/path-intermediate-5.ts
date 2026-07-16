import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'path-intermediate-5',
  title: 'AI绘画进阶：ComfyUI工作流与ControlNet精准控图',
  description: '掌握ComfyUI节点式工作流、ControlNet(OpenPose/Canny/Depth)精准控制构图、IP-Adapter风格迁移、Inpaint局部重绘高级技巧。',
  date: '2026-06-06',
  readTime: '8-12 分钟',
  content: `## AI绘画进阶：从"抽卡"到"精准创作"

入门阶段你可能用Midjourney或DALL·E生成过一些不错的图，但有没有遇到这些痛点：想让人物姿势完全按照你的参考图来，怎么调提示词都不对；想在一张图的基础上修改局部（比如换件衣服、改个表情），结果整张图都变了；想保持某张图的风格但换内容，或者保持内容换风格，总是做不到精确控制。

这就是Midjourney这类"黑盒"工具的局限：它们用起来简单，但控制力弱，更像"抽卡"——你描述想要什么，然后祈祷运气好出好图。而ComfyUI+Stable Diffusion生态给了你完全的控制力——你可以精确控制构图、姿势、线条、深度、风格、局部细节，真正从"AI抽卡玩家"变成"AI视觉创作者"。

这篇文章我们学习ComfyUI工作流和核心控制技术，掌握后你可以稳定产出符合要求的高质量图片，不再靠运气。

## 核心概念

### 为什么用ComfyUI？
ComfyUI是Stable Diffusion的节点式操作界面，和WebUI（Automatic1111）相比，它的优势是：
1. **工作流可复现**：你做的每一步都保存成工作流，分享给别人或者以后用，完全一样的结果
2. **控制力更强**：你可以精确控制模型加载、采样、ControlNet、后期处理的每一个环节
3. **效率更高**：复杂任务（比如换背景、局部重绘）用工作流比在WebUI里点来点去快很多
4. **生态最新**：新出的技术（比如Flux模型、各种新ControlNet）ComfyUI总是最早支持

### ControlNet：给AI加"导航"
ControlNet是控制AI构图的核心技术。简单说就是：你给AI一张参考图（可以是姿势骨架、线稿、深度图、分割图等），AI生成图时会严格遵循这张参考图的结构。这彻底解决了"AI乱构图"的问题。

常用ControlNet类型：
- **OpenPose**：识别人物骨架姿势，控制人物动作
- **Canny/Lineart**：提取线稿，AI沿着你的线稿上色生成
- **Depth**：提取深度信息，控制前后景层次
- **IP-Adapter**：不是ControlNet但同样重要：参考图片风格/内容，实现风格迁移或身份保持

### Inpaint局部重绘
不是整张图重新生成，而是只修改你选中的局部区域，其他部分保持不动。这是修图、改图的核心技术。

## 实战操作

### 第一步：ComfyUI安装与基础工作流
安装ComfyUI（推荐用整合包，新手最方便）：
- Windows用户直接搜"ComfyUI 整合包"下载，解压就能用，不用装环境
- 运行run_nvidia_gpu.bat启动，浏览器打开http://127.0.0.1:8188

ComfyUI里最基础的文生图工作流包含这些核心节点（默认启动时就有一个基础工作流）：
1. **Checkpoint加载器**：选择大模型（推荐新手用RealVisXL（写实）、AnimagineXL（动漫）、JuggernautXL（通用）这些成熟的SDXL模型）
2. **CLIP文本编码器**：分别输入正面提示词和负面提示词
3. **空Latent图像**：设置生成图片尺寸
4. **KSampler（采样器）**：设置采样步数、CFG、种子等参数
5. **VAE解码**：把Latent转成可见图像
6. **保存图像**：输出结果

先跑通这个基础工作流，理解每个节点的作用。

### 第二步：ControlNet OpenPose控制人物姿势
OpenPose可以让AI生成的人物完全按照你给的姿势来。

添加节点流程：
1. 加载一张你想参考姿势的图片（用"加载图像"节点）
2. 添加**ControlNet加载器**节点，选择controlnet-sd-xl-1.0-openpose模型
3. 添加**Apply ControlNet**节点，把ControlNet、图片、正面提示词连起来
4. 在Apply ControlNet节点里设置：
   - strength：0.7-0.9（控制强度，太高会僵硬，太低没效果）
   - start_percent/end_percent：0到1（全程生效）

提示词示例：
\\\`\\\`\\`,
};

export default article;
