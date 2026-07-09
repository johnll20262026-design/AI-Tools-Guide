import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const articlesPath = path.join(rootDir, 'src', 'data', 'articles.ts');
let content = fs.readFileSync(articlesPath, 'utf-8');

// 在最后一个  }, 后面插入新文章（在};之前）
const insertPosition = content.lastIndexOf('  },');
const before = content.substring(0, insertPosition + 4); // include "  },"
const after = content.substring(insertPosition + 4);

const newArticles = `

  // ==================== AI 绘画续 (painting-3 ~ painting-6) ====================
  'painting-3': {
    id: 'painting-3',
    title: 'ComfyUI 节点式工作流实战：搭建你的第一条 AI 绘画流水线',
    description: '用可视化节点串联模型加载、提示词编码、采样和放大，实现可复用的图像生成流程。',
    date: '2026-06-08',
    readTime: '12 分钟',
    content: \`## 为什么选择 ComfyUI？

如果你用了一段时间 WebUI 后觉得"生成过程像黑盒"、"很多参数调了不知道为什么有用"、"想做复杂的工作流但做不到"，那 ComfyUI 就是为你准备的。ComfyUI 采用节点式（Node-based）界面，你把整个图像生成流程拆解成一个个独立的节点，用线把它们连起来，就能精确控制生成的每一步。

ComfyUI 的优势：
- **完全透明**：你能看到从提示词编码 → 潜空间生成 → VAE解码的完整流程，不再是黑盒
- **工作流可保存复用**：做好的工作流可以保存为 JSON 文件，下次直接打开用，也可以分享给别人
- **更省显存**：同样的配置 ComfyUI 比 WebUI 占用显存更少，低配电脑福音
- **支持复杂流程**：ControlNet 多控、图生图+局部重绘+放大串起来、批量处理等复杂工作流都能轻松实现
- **生态活跃**：新模型、新插件通常先支持 ComfyUI

## 安装 ComfyUI

### 方式一：整合包安装（推荐新手）
和 WebUI 一样，国内有现成的整合包：
1. 推荐秋葉的 ComfyUI 整合包，B站搜索就能找到
2. 下载后解压到非中文路径
3. 双击 \`A启动器.exe\`，一键启动
4. 启动成功后浏览器打开 \`http://127.0.0.1:8188\`

### 方式二：手动安装（适合有经验的用户）
\`\`\`bash
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
python main.py
\`\`\`

## 认识 ComfyUI 界面

第一次打开 ComfyUI 你可能会被一堆节点吓到，别担心，我们从最基础的工作流开始。默认界面会加载一个基础的文生图工作流，包含以下核心节点：

| 节点 | 作用 |
|------|------|
| **Checkpoint Loader** | 加载大模型（Checkpoint），就是你生成图片用的主模型 |
| **CLIP Text Encode（正向）** | 编码正向提示词，告诉 AI 你想要什么 |
| **CLIP Text Encode（负向）** | 编码负向提示词，告诉 AI 你不想要什么 |
| **KSampler** | 采样器，负责实际的"去噪生成"过程，相当于 WebUI 里的迭代步数、采样方法、CFG等参数都在这里 |
| **VAE Decode** | VAE 解码器，把潜空间的张量转换成我们能看到的图片 |
| **Save Image** | 保存生成的图片到本地 |
| **Empty Latent Image** | 创建空白的潜空间图像，设置图片分辨率和批次大小 |

你可以把节点想象成一个个"加工车间"，数据（张量、文本、图片）顺着连线在车间之间流动，最终从另一端产出成品图片。

## 实战：搭建你的第一个文生图工作流

我们从零开始搭建一个最简单的文生图工作流，比默认工作流更清晰：

1. **添加 Checkpoint Loader 节点**
   - 右键空白处 → Add Node → loaders → Checkpoint Loader
   - 在 ckpt_name 下拉菜单选择你下载好的模型（比如 DreamShaperXL）
   - 这个节点输出三个东西：MODEL（模型）、CLIP（文本编码器）、VAE（解码器）

2. **添加两个 CLIP Text Encode 节点**
   - Add Node → conditioning → CLIP Text Encode（添加两个）
   - 一个写正向提示词，一个写负向提示词
   - 把 Checkpoint Loader 的 CLIP 输出连到两个 CLIP Text Encode 的 clip 输入
   - 在第一个（正向）文本框里输入：\`a beautiful Japanese garden, red bridge, cherry blossoms, serene, 8k, highly detailed\`
   - 在第二个（负向）文本框里输入：\`ugly, blurry, low resolution, distorted\`

3. **添加 Empty Latent Image 节点**
   - Add Node → latent → Empty Latent Image
   - 设置 width: 1024, height: 1024（SDXL推荐分辨率），batch_size: 1
   - 这个节点决定生成图片的尺寸

4. **添加 KSampler 节点**
   - Add Node → sampling → KSampler
   - 连接输入：
     - model → Checkpoint Loader 的 MODEL
     - positive → 正向 CLIP Text Encode 的 CONDITIONING
     - negative → 负向 CLIP Text Encode 的 CONDITIONING
     - latent_image → Empty Latent Image 的 LATENT
   - 参数设置：
     - seed：随机种子，想复现结果就固定一个数字，想每次不一样就设 randomize
     - steps：25-30步足够
     - cfg：7（默认值，平衡遵循提示词和创意）
     - sampler：euler 或 dpmpp_2m，新手推荐 dpmpp_2m
     - scheduler：karras
     - denoise：1.0（文生图设1，图生图设低一点）

5. **添加 VAE Decode 节点**
   - Add Node → latent → VAE Decode
   - 连接：
     - samples → KSampler 的 LATENT
     - vae → Checkpoint Loader 的 VAE

6. **添加 Save Image 节点**
   - Add Node → image → Save Image
   - 连接 images → VAE Decode 的 IMAGE
   - filename_prefix 可以设置你保存图片的前缀名

7. **点击 Queue Prompt 生成！**
   - 右下角 Queue Prompt 按钮，点击后开始生成
   - 进度条跑完就能看到生成的图片了

## 常用工作流模板学会基础流程后，你可以开始尝试更实用的工作流。这里推荐几个新手必学的：

### 1. 高清放大工作流（Hires. Fix）
WebUI 里的 Hires Fix 大家都用过，在 ComfyUI 里你需要手动搭建：
- 第一步：先低分辨率生成（比如 512x768 或 768x1024）
- 第二步：把生成的 latent 用 Upscale Latent 节点放大2倍
- 第三步：再接一个 KSampler，denoise 设 0.3-0.5（重绘幅度不要太高，不然会变样）
- 第四步：VAE Decode → Save Image
这样生成的图既有大模型的创意，又有高清细节，不会出现多头多手问题。

### 2. 图生图工作流
和文生图区别：
- 把 Empty Latent Image 换成 Load Image 节点加载你的图片
- 加一个 VAE Encode 节点把图片编码成 latent
- KSampler 的 denoise 设 0.5-0.7（越高越偏离原图）
- 其他节点和文生图一样

### 3. ControlNet 控图工作流
ControlNet 在 ComfyUI 里非常灵活，你可以同时加多个 ControlNet：
- 添加 ControlNet Loader 节点加载 ControlNet 模型
- 添加 Apply ControlNet 节点，把图片和 ControlNet 模型接进去
- 把 Apply ControlNet 输出的 conditioning 接给 KSampler 的 positive
- 可以串联多个 Apply ControlNet 实现多控（比如 OpenPose + Canny 同时用）

## 实用技巧与避坑指南

### 工作流管理
- **保存工作流**：生成的图片本身就内嵌了工作流！你把生成的图片拖进 ComfyUI 就能恢复完整工作流，太方便了
- **导出工作流**：点击 Save 按钮可以保存为 JSON 文件，方便备份和分享
- **导入工作流**：点击 Load 加载 JSON 文件，或者直接拖图片进来

### 效率提升技巧
1. **缓存机制**：ComfyUI 有节点缓存，改了某个节点只会重新执行这个节点后面的部分，不用从头跑
2. **批量生成**：在 Empty Latent Image 里改 batch_size，一次生成多张图
3. **提示词风格切换**：可以接多个 CLIP Text Encode 节点，配合 Switch 节点快速切换不同提示词
4. **预览节点**：加 Preview Image 节点可以在流程中间看结果，方便调试

### 常见问题解决

**Q: 报错 "CUDA out of memory"（显存不足）**
A: 解决方案：
  1. 降低生成分辨率（SDXL 1024x1024 需要 8GB+ 显存）
  2. 启动器加 --lowvram 或 --medvram 参数
  3. 关掉其他占用显存的程序
  4. 用 fp8 精度模型能省一半显存

**Q: 生成的图是黑色的/乱码**
A: 检查：
  1. VAE 是否正确加载？有些模型需要单独加载 VAE
  2. 节点连接有没有错？尤其是 VAE Decode 的输入
  3. 种子是不是固定到一个坏种子了，换个种子试试

**Q: 提示词写了但是 AI 不听**
A: ComfyUI 的 CLIP 模型有不同版本，SD1.5 和 SDXL 的 CLIP 不一样，不要混用。如果你加载的是 SDXL 模型，确保用的是 SDXL 对应的 CLIP（Checkpoint Loader 会自动加载）。

## 从哪里找工作流？
学会搭基础工作流后，你不需要每个工作流都自己从零搭：
1. **ComfyUI 官方 Examples**：安装目录里的 \`examples\` 文件夹有很多官方示例
2. **OpenArt**：https://openart.ai/workflows 有大量免费工作流
3. **LiblibAI（哩布哩布）**：国内最大的 SD 社区，很多国人分享的工作流
4. **B站/小红书**：搜"ComfyUI 工作流"有大量教程和分享下载了别人的工作流后，先拖进 ComfyUI 看一遍节点连接逻辑，理解每一步是做什么的，再改参数用，这样才能真正学会。

## 总结
ComfyUI 上手门槛比 WebUI 高一点，但一旦学会，你会发现它的灵活性和可控性远远超过 WebUI。建议学习路径：
1. 先熟练搭建本文的基础文生图工作流，理解每个节点的作用
2. 尝试高清放大、图生图这两个最常用的工作流
3. 学习 ControlNet、IP-Adapter 等高级节点
4. 下载别人的优秀工作流学习借鉴
5. 开始自己搭建满足特定需求的自定义工作流不要被满屏的节点吓到，所有复杂工作流都是由基础节点拼起来的。多动手搭，遇到不懂的节点搜一下它的作用，一个星期你就能熟练使用 ComfyUI 了。\`,
  },
  'painting-4': {
    id: 'painting-4',
    title: 'ControlNet 精准控图：姿势、线稿、深度图全解析',
    description: '告别随机抽卡，用 ControlNet 精确控制人物姿态、画面构图和风格迁移。',
    date: '2026-06-01',
    readTime: '13 分钟',
    content: \`## 为什么需要 ControlNet？

用过 AI 绘画的人都有过这种痛苦：你想让 AI 画一个"一个人站在山顶张开双臂拥抱日出"，结果生成的人姿势千奇百怪，要么手长在奇怪的地方，要么构图完全不是你想要的。你反复抽卡抽了几十张，好不容易有张姿势对了，脸又崩了——这就是因为没有 ControlNet，AI 是"自由发挥"的，你只能靠运气。

ControlNet 就是解决这个问题的终极方案。它能让你**精确控制 AI 生成图片的构图、人物姿势、线条结构、深度关系**，真正做到"指哪打哪"，而不是随机抽卡。2026 年的今天，ControlNet 已经是 AI 绘画的必备技能，不管你用 WebUI 还是 ComfyUI，不会 ControlNet 都不好意思说自己会 AI 绘画。

## ControlNet 核心原理

简单来说，ControlNet 就是给 AI 加了一个"参考图控制器"：你给它一张参考图（姿势骨架、线稿、深度图、边缘图等），它就会严格按照这张参考图的结构来生成图片，同时保留大模型的风格和细节。

技术上 ControlNet 是在大模型的 U-Net 旁边加了一个可训练的旁路网络，它会学习怎么把参考图的结构信息"注入"到生成过程中，同时不破坏大模型本身的能力。你只需要下载对应的 ControlNet 模型文件，就能实现各种控制效果。

## 常用 ControlNet 模型详解

ControlNet 有很多种模型，每种解决不同的控图需求，新手先掌握最常用的 5 种就够了。

### 1. OpenPose（姿势控制）
**作用**：控制人物的身体姿势、手的位置、甚至脸部表情和身体朝向。

**适用场景**：
- 你想让人物摆出特定姿势（跳舞、运动、拥抱等）
- 你已经有一张图姿势对了，想换人物风格但保留姿势
- 多人合影控制每个人的位置和姿势
- 避免 AI 画出畸形的手和奇怪的肢体

**怎么用**：
1. 你需要一张有人物的参考图，可以是你自己的照片、网上找的姿势图、甚至用 PoseMyArt 这类工具手动摆的骨架
2. WebUI 里放入 ControlNet 单元，控制类型选 OpenPose，预处理器选 openpose_full（能检测身体+手+脸），模型选 control_v11p_sd15_openpose 或 SDXL 对应的 openpose 模型
3. 勾选"启用"，点击"预览"按钮，你会看到提取出来的姿势骨架图
4. 正常写提示词生成，生成的人物姿势就会和参考图一模一样

**进阶技巧**：你可以直接用一张纯骨架图作为输入，不需要真人照片。网上有很多 OpenPose 骨架图库，你甚至可以用 3D 软件自己摆姿势渲染成骨架给 ControlNet 用。

### 2. Canny（边缘检测）
**作用**：提取图片的边缘线条，AI 会严格按照这个线稿的结构生成，你可以理解为"给 AI 一张线稿，它帮你上色细化"。

**适用场景**：
- 你自己画了线稿，想让 AI 上色成完整插画
- 你想保留某张图的精确构图和物体轮廓，但换风格/换内容
- 建筑设计、产品设计等对结构要求精确的场景
- 二次元线稿上色神器

**参数调节**：
- 预处理器选 canny，两个阈值参数：低阈值越低线条越多，高阈值越高线条越少
- 如果预览出来的线条太碎太多，调高阈值；如果线条太少看不出结构，调低阈值

### 3. Depth（深度图）
**作用**：提取图片的深度信息（哪里近哪里远，前后关系），控制画面的空间透视和层次结构。

**适用场景**：
- 建筑和室内场景生成，保证透视正确
- 想保留原图的空间布局但更换场景内容
- 多物体场景控制前后位置关系
- 图生图时保留原图的空间感，不会生成平面化的图片

Depth Midas 是最常用的深度预处理器，能很好地估计单张图的深度关系。还有一个 Depth Leres 效果也不错，可以都试试。

### 4. Lineart（线稿提取）
**作用**：和 Canny 类似，但 Lineart 提取的线条更干净、更像画师画的线稿，Canny 是算法边缘检测，Lineart 是专门训练来提取插画级线稿的。

**适用场景**：给二次元插画线稿上色，效果比 Canny 好太多。Canny 出来的线条有很多杂边，Lineart 出来的线稿干净流畅，更适合插画类场景。

### 5. Reference（参考图风格迁移）
**作用**：不是控制结构，而是让生成的图片风格、色调、人物特征和参考图一致。IP-Adapter 是现在 Reference 的升级版，效果更好。

**适用场景**：
- 你想让多张图保持同一个人物的长相（AI 写真、漫画人物一致性）
- 你喜欢某张图的色调/画风，想让新生成的图也是这个风格
- 不需要相同结构，只要风格和人物一致

**推荐用 IP-Adapter 代替传统的 Reference Only 控制，IP-Adapter 是 SDXL 时代的最佳选择，效果好且速度快。**

## WebUI 中 ControlNet 基础使用步骤

1. **安装 ControlNet 插件**
   - 如果你用的是秋葉整合包，默认已经装好了
   - 没装的话，去 Extensions → Install from URL，输入插件地址，安装后重启 UI

2. **下载 ControlNet 模型文件**
   - 模型下载地址：huggingface.co/lllyasviel/ControlNet-v1-1 （SD1.5）
   - SDXL 版本搜索 ControlNet SDXL
   - 下载后放到 \`models/ControlNet\` 目录
   - 新手先下载：openpose、canny、depth、lineart 这几个最常用的就行

3. **开启 ControlNet**
   - 展开 ControlNet 面板（在文生图/图生图页面下方）
   - 勾选 "Enable"（启用）
   - 勾选 "Allow Preview"（允许预览，方便看预处理结果对不对）

4. **上传参考图**
   - 在 ControlNet 单元的图片框里上传你的参考图（姿势图、线稿等）

5. **选择预处理器和模型**
   - 控制类型（Control Type）选你要的类型（OpenPose/Canny/Depth等）
   - 预处理器（Preprocessor）和模型（Model）会自动匹配
   - 点击 "Preview annotator result" 按钮（爆炸图标）预览预处理结果

6. **设置权重和参数**
   - **Control Weight（控制权重）**：0.5-1.0，越高越严格遵循参考图，越低 AI 自由度越大。一般设 0.7-0.8 比较平衡
   - **Starting Control Step**：从第几步开始控制，0 就是一开始就控制
   - **Ending Control Step**：到第几步结束控制，0.8-1 都可以，如果想后期给 AI 一点自由发挥空间可以设 0.7
   - **Resize Mode**：参考图和生成图尺寸不一样时怎么处理，一般选 Crop and Resize

7. **正常写提示词，点击生成**
   - 建议提示词里也描述一下你想要的内容，ControlNet 只控制结构，内容和风格还是靠提示词和大模型

## 多 ControlNet 同时使用

这是 ControlNet 的强大之处：你可以同时开多个 ControlNet 单元，同时控制多个维度！最经典的组合：

### 组合 1：OpenPose + Canny（姿势+结构）
用 OpenPose 控制人物姿势，用 Canny 控制背景和物体轮廓，人物动作对，构图也对。

### 组合 2：OpenPose + Depth + IP-Adapter（姿势+空间+人物长相）
完美的 AI 写真组合：姿势用 OpenPose 控制，空间透视用 Depth 保证，人物长相用 IP-Adapter 保持一致，生成一套同一个人的不同姿势照片。

### 组合 3：Lineart + Color（线稿+色彩参考）
给 Lineart 线稿上色，再加一个 Color 控制（只传颜色），既能保持线稿结构，又能指定配色。

**多 ControlNet 注意事项**：
- 每个 ControlNet 的权重不要都设 1，适当降低（每个 0.6-0.8），避免多重控制冲突
- 不是越多越好，一般 2-3 个控制已经足够解决大部分问题，太多会让图片僵硬
- 每个控制都先点预览确认预处理结果正确，再生成

## 常见问题与调优技巧

**Q: 为什么加了 ControlNet 还是控制不住？**
A: 检查以下几点：
1. 有没有勾选"启用"？很多新手忘了勾
2. 模型版本对不对？SD1.5 模型用 SD1.5 的 ControlNet，SDXL 用 SDXL 的，不要混用
3. 权重是不是太低了？试着调到 0.9-1.0
4. 预览预处理结果对不对？如果预处理器没提取出正确的结构，AI 当然没法参考
5. 是不是多个 ControlNet 互相冲突了？关掉其他的单独测一个

**Q: 加了 ControlNet 后图片变得很僵硬、不自然**
A: 这是权重太高了：
1. 降低 Control Weight 到 0.6-0.7
2. 把 Ending Control Step 降到 0.7，让 AI 最后几步有自由发挥的空间
3. 提示词写得更详细，提供更多风格和细节描述
4. 不要同时开太多 ControlNet

**Q: 生成的图和参考图角度/位置不对**
A: Resize Mode 没选对：
- 如果参考图和生成图比例一样，选 Crop and Resize
- 如果比例不一样但你想保留全部内容，选 Resize and Fill（会补全边缘）
- 最好直接让参考图和生成图尺寸一致，省得出问题

**Q: 手还是画崩了怎么办？**
A: 组合使用：
1. OpenPose 预处理器用 openpose_full（一定要带 hand 检测！）
2. 加一个专门的 Depth 控制帮助理解手部空间关系
3. 提示词里多强调"beautiful hands, perfect fingers"
4. 如果还是崩，后期用 inpaint 局部重绘手，或者用专门的手部修复模型

## 总结

ControlNet 是 AI 绘画从"玩具"变成"生产力工具"的关键技术。掌握它之后，你不再是靠运气抽卡，而是真正能控制 AI 生成你想要的画面。学习路径建议：
1. 先掌握 OpenPose（姿势）和 Canny（线稿）这两个最常用的
2. 练习单 ControlNet 生成，调权重和起止步长，体会参数变化的效果
3. 尝试 2 个 ControlNet 组合使用，解决更复杂的控制需求
4. 学习 IP-Adapter，解决人物一致性和风格迁移问题
5. 在 ComfyUI 里搭建自己的多 ControlNet 工作流，实现更灵活的控制

记住：ControlNet 是给你"控制权"的，不是给你"枷锁"。权重调多少、用几个控制，都是为了你想要的效果服务，不要为了控制而控制，多试多调，找到最适合你的平衡点。\`,
  },
\`;

// 我会分批写，先插入前两篇（painting-3和painting-4），后续继续
const result = before + newArticles + after;
fs.writeFileSync(articlesPath, result, 'utf-8');
console.log('Added painting-3 and painting-4 successfully');
