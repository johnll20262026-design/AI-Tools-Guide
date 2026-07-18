import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'path-beginner-4',
  title: 'AI 绘画入门：用 Midjourney / DALL·E 生成精美图片',
  description: '从零开始学习AI绘画：工具选择、Prompt写作技巧、常用参数、风格词库，新手10分钟出第一张图。',
  date: '2026-06-18',
  readTime: '8-10 分钟',
  related: ['painting-1', 'painting-2', 'path-beginner-5'],
  content: `## 为什么要学 AI 绘画？

在AI工具中，AI绘画是最容易上手、效果最直观、成就感最强的一个方向。你不需要会画画、不需要懂设计、不需要买昂贵的手绘板，只要会打字描述你想要什么，AI就能在30秒内给你生成一张精美的图片。发朋友圈配图、做PPT插图、做电商主图、做头像壁纸、做孩子的绘本插图、甚至做品牌Logo，AI绘画都能帮你搞定。

我见过完全没有美术基础的人，学了一周AI绘画，做出来的图比工作两三年的设计师还好——不是AI比设计师厉害，而是AI把"技术门槛"彻底打掉了，你只需要有想法、知道怎么描述你想要的东西就行。2024年以来，AI绘画工具的质量已经达到了专业设计师的入门水平，很多电商公司、自媒体团队、广告公司已经把AI绘画作为日常生产工具，能省80%的找图、做图时间。

学会AI绘画，你就相当于拥有了一个24小时待命、不收工资、什么风格都能画的私人设计师。这篇文章我们从零开始，手把手教你10分钟内生成你的第一张AI图片，然后逐步掌握Prompt技巧和常用参数，让你想画什么就能画出来。

## 工具选择：Midjourney vs DALL·E vs Stable Diffusion

新手入门最困惑的就是选工具。三个主流工具各有优势，没有绝对的好坏，按你的需求选择：

**Midjourney（推荐新手首选）**
- 优点：出图质量最高，不用安装，Discord里直接用，上手最简单，审美在线，对新手友好——你随便写几个词出来的图都不会太丑
- 缺点：需要科学上网，收费（基础版$10/月，标准$30/月），可控性相对较差，图一旦生成不好局部修改
- 适合：快速出图、灵感创意、不追求精确控制的场景、新手入门练手

**DALL·E 3（ChatGPT内置）**
- 优点：最能理解自然语言描述，你说中文它也能准确理解，和ChatGPT无缝衔接——你可以让ChatGPT帮你想Prompt再直接生成图，不用切来切去
- 缺点：风格相对单一，精细控制能力弱，有时候会"过度解读"你的描述加很多你没想要的东西
- 适合：和ChatGPT配合用，快速出概念图、插图，不想学复杂Prompt的人

**Stable Diffusion（本地部署）**
- 优点：完全免费，可控性最强，有海量模型和插件（ControlNet、LoRA等），可以训练自己的风格模型，可以精确控制人物姿势、构图、细节
- 缺点：需要较好的显卡（推荐8GB以上显存），安装配置较复杂，要学的东西多
- 适合：想深入学习、做商业批量生产、注重隐私、需要精确控制的用户

**新手建议**：不用纠结，先用Midjourney或DALL·E体验AI绘画的魅力，建立直觉，知道好的Prompt是什么样的、能出什么样的图。等你玩了一两周，觉得不够用了、想要更多控制，再考虑本地部署Stable Diffusion——这时候你已经知道自己需要什么了，学起来也快。

这篇文章我们以Midjourney为例讲解，90%的Prompt技巧和思路是通用的，学会了Midjourney，DALL·E和SD你也能快速上手。

## Midjourney 快速上手（10分钟出第一张图）

Midjourney运行在Discord上，第一次用可能觉得有点怪，跟着步骤来很简单：

1. **准备环境**：注册Discord账号（discord.com），确保能访问Discord
2. **订阅Midjourney**：访问midjourney.com，点击"Join the Beta"，在Discord里输入/subscribe订阅（基础版$10/月，足够新手用，可以生成约200张图）
3. **进入新手频道**：在Midjourney服务器里找一个newbie-xx频道（比如newbie-101），这些频道是给新手试用的
4. **生成第一张图**：在聊天框输入 \`/imagine\` 命令，在prompt框里输入描述，比如：
\`a cute orange cat wearing a small hat, sitting on a windowsill, afternoon sunlight, watercolor painting style, soft warm tones\`
然后按回车发送

等30秒左右，Midjourney会给你生成4张图。你会看到下面有U1-U4和V1-V4按钮：
- **U（Upscale）**：U1就是把第一张图放大成高清大图，其他同理
- **V（Variation）**：V1就是基于第一张图再生成4张类似的变体，你觉得某张图感觉对了但细节不好，就点V让它再变变
- 还有一个刷新按钮🔄，就是重新生成4张新的

点你喜欢的图U，放大，然后右键保存图片——你的第一张AI绘画就完成了！是不是特别简单？

**第一次用的小建议**：
- 不要一上来就想生成复杂的东西，先从简单的开始，比如"一只猫""一个风景"，先感受一下Midjourney的风格
- 看到别人生成的好看的图，可以点"复制Prompt"看看别人是怎么写的，学习别人的关键词
- 新手频道里人很多，你的图很快会被刷上去，没关系，你可以在自己的私信里跟Midjourney机器人对话，生成的图只有你自己能看到，更清净

## AI绘画 Prompt 的黄金公式

很多人生成的图不好看，不是Midjourney不行，是你的Prompt写得太简单了。你说"画一只猫"，AI当然给你一张很普通的猫；但你描述得越具体，生成的图就越接近你想要的效果。

一个好的Midjourney Prompt遵循这个公式：

\`\`\`
主体描述 + 环境背景 + 风格/媒介 + 艺术家/参考 + 细节修饰 + 参数
\`\`\`

我一个个给你拆解：

**1. 主体描述（最重要）**
你要画什么？描述得越具体越好：
- ❌ 差："一个女孩"
- ✅ 好："一个20岁的亚洲女孩，留着齐肩黑发，穿着白色连衣裙，站在樱花树下微笑，微风吹动头发"
主体的年龄、外貌、穿着、动作、表情——这些都写清楚，图的感觉立刻就出来了。

**2. 环境背景**
主体在什么地方？光线怎么样？天气如何？
- 例子："在一个古老的图书馆里，下午的阳光从彩色玻璃窗照进来，空气中有灰尘在光线中浮动，书架上摆满了旧书"
- 光线是非常重要的："golden hour（黄金时刻）""soft natural light（柔和自然光）""dramatic lighting（戏剧性光线）""studio lighting（影棚光）""neon light（霓虹灯光）"——不同的光线完全改变图的氛围。

**3. 风格/媒介**
你想要什么风格？是照片、油画、水彩、插画、3D渲染、动漫？
- 照片类：photorealistic（照片写实）、film photography（胶片摄影）、portrait photography（人像摄影）、shot on 50mm f/1.8 lens（用50mm定焦镜头拍的）
- 绘画类：oil painting（油画）、watercolor（水彩）、ink painting（水墨画）、pixel art（像素画）、anime style（动漫风格）、Studio Ghibli style（吉卜力风格）
- 设计类：3D render（3D渲染）、UI/UX design、flat illustration（扁平插画）、isometric view（等距视角）
- 一定要加风格词，不然AI会给你一个很普通的默认风格，没有特色。

**4. 艺术家/参考**
如果你知道某个艺术家或作品的风格，可以直接说"by 艺术家名字"，AI会模仿那个风格：
- 比如"by Hayao Miyazaki"（宫崎骏）、"by Van Gogh"（梵高）、"in the style of Pixar"（皮克斯风格）
- 不用怕记不住艺术家名字，先记住几个你喜欢的就行，看多了自然就积累了。

**5. 细节修饰词**
这些词能让你的图更精致、更有质感：
- 质量词：highly detailed（高细节）、8k resolution（8k分辨率）、intricate details（精细细节）、masterpiece（杰作）、best quality（最好质量）
- 氛围词：dreamy（梦幻的）、cozy（温馨的）、moody（有氛围感的）、serene（宁静的）、cinematic（电影感）
- 色彩词：vibrant colors（色彩鲜艳）、pastel colors（马卡龙色）、muted tones（柔和色调）、warm color palette（暖色调）、monochrome（单色）

**6. 参数**
最后加Midjourney参数控制图片尺寸、版本等：
- \`--ar 16:9\`：宽高比，16:9是横屏适合封面/电脑壁纸，9:16是竖屏适合手机壁纸/小红书，1:1是正方形适合头像
- \`--v 6.0\`：用Midjourney V6模型，最新版本效果最好
- \`--style raw\`：减少Midjourney默认的美化，更写实
- \`--no 东西\`：不要什么东西，比如\`--no text watermark\`就是不要文字水印

**一个完整Prompt示例**：
\`\`\`
A small cozy coffee shop on a rainy day in Tokyo, warm yellow light from windows, people sitting inside reading books, rain drops on the window, wet pavement outside, cinematic lighting, warm color palette, film photography style, shot on Kodak Portra 400, highly detailed, cozy atmosphere --ar 16:9 --v 6.0 --style raw
\`\`\`
翻译过来就是："东京雨天的一家温馨小咖啡馆，窗户透出暖黄色的灯光，人们坐在里面看书，雨点打在窗户上，外面湿漉漉的人行道，电影感光线，暖色调，胶片摄影风格，用柯达Portra 400拍摄，高细节，温馨氛围"

你把这段Prompt输进去，出来的图会非常有感觉。

## 常用风格词库（直接抄作业）

新手最缺的就是词库，我给你整理了不同场景常用的关键词，直接拿去组合用：

### 人像类
- 摄影风格：portrait photography, studio lighting, soft focus, bokeh background, shallow depth of field, shot on Canon EOS R5
- 光效：golden hour light, Rembrandt lighting, backlit, rim light, natural window light
- 风格：editorial fashion photography, vintage photo, black and white portrait, film grain

### 风景类
- 场景：misty mountains, tropical beach at sunset, snowy forest at night, lavender field in Provence, Japanese countryside in summer
- 光效：golden hour, dramatic sunset, soft morning mist, moonlight, aurora borealis
- 风格：epic landscape photography, National Geographic photo, atmospheric, cinematic wide shot, aerial view

### 插画/设计类
- 扁平插画：flat illustration, vector art, minimalist design, pastel colors, clean lines
- 3D风格：3D render, Blender, isometric view, cute character design, Pixar style, soft lighting
- 二次元：anime style, Studio Ghibli, Makoto Shinkai style, cel shading, vibrant colors, detailed background
- 中国风：traditional Chinese ink painting, watercolor, Song Dynasty landscape, delicate brushstrokes, elegant

### 商业/电商类
- 产品摄影：product photography, white background, studio lighting, professional commercial photo, sharp focus
- 营销素材：clean minimalist design, eye-catching, vibrant colors, modern aesthetic, social media post

不用死记硬背，看到好看的图就把它的Prompt存下来，慢慢你就有自己的词库了。

## 新手常见问题与避坑

**Q1：为什么我生成的人脸总是歪的/有多的手指？**
A：这是AI绘画的老大难问题，尤其是手。几个解决方法：
- 用Midjourney V6版本，人脸和手的问题比V5好很多
- 特写尽量不要画手，或者把手藏起来（放在口袋里、拿东西、抱胸）
- 生成后用"Vary (Region)"功能局部重画有问题的部分
- 要求不高的话小瑕疵没关系，不影响整体效果；要求高的话后期用PS修一下

**Q2：我想生成某个人的肖像，但AI画得不像怎么办？**
A：Midjourney对公众人物（明星、名人）识别得比较好，但普通人不行。要画特定的人：
- 方法1：用"Character Reference"（\`--cref\` 参数），上传这个人的照片当参考
- 方法2：用Stable Diffusion训练LoRA模型，效果最好但麻烦
- 方法3：多生成几张挑最像的，然后局部修改

**Q3：为什么我写的Prompt出来的图总是不对？**
A：几个常见原因：
- 描述太模糊：加更多具体细节，不要用"好看""漂亮"这种主观词
- 关键词顺序错了：越重要的词放越前面，Midjourney对前面的词权重更高
- 风格冲突：你同时写了"photorealistic照片"和"anime style动漫"，AI会混乱
- 解决方法：一次只改一个词，多试几次，看哪个词影响了结果，慢慢调整

**Q4：我想生成的图涉及暴力/色情/版权内容怎么办？**
A：别试。Midjourney有非常严格的内容审查，违规会被警告甚至封号。不要生成真人的色情内容、不要生成受版权保护的角色（比如迪士尼角色）商用、不要生成政治敏感内容。

**Q5：怎么把自己的想法变成好的Prompt？我不会写怎么办？**
A：有个作弊方法：你用中文跟ChatGPT说"帮我把这段描述写成Midjourney Prompt：[你的想法]"，ChatGPT会帮你翻译成专业的Prompt，包括风格词和参数——DALL·E 3更是不用写Prompt，直接说中文就行。

**避坑提醒**：
1. 不要上来就堆100个关键词，先从核心描述开始，慢慢加词，不然你都不知道哪个词起了作用
2. 多V（变体）比一直重新生成好——觉得某张图方向对了就点V，在它基础上变，不要重新roll
3. 善用/describe命令：上传一张你喜欢的图，输入/describe，Midjourney会帮你反推Prompt，学习别人怎么写的
4. 初期不要追求"一次就生成完美的图"，AI绘画是个迭代过程——先出个大概方向，再变体、再放大、再局部修改，逐步靠近你想要的效果。

## 进阶技巧预告

今天讲的是基础，入门足够用了。等你玩熟了，还可以学这些进阶玩法：
- **图生图**：上传一张参考图，让AI在这张图基础上改——你拍一张手绘图，AI帮你变成精美插画
- **ControlNet**：用线稿、姿势图、深度图精确控制构图和人物姿势，想怎么摆就怎么摆
- **LoRA模型**：加载特定风格/人物/物体的小模型，比如专门画赛博朋克的、专门画汉服的、专门画你家猫的
- **局部重绘**：只修改图片的某一部分，脸画歪了只改脸，手不对只改手
- **AI绘画+PS后期**：AI生成大效果，PS修细节和瑕疵，这是现在专业设计师的工作流

## 今天的作业
看完这篇立刻去做，不然看了也白看：
1. 注册Midjourney或打开ChatGPT的DALL·E
2. 用我给的公式，写一个Prompt生成你的第一张图——就画"你梦想中的小房间"或者"你想去的一个地方"
3. 生成4张，选一张你最喜欢的放大保存
4. 发个朋友圈——"我的第一张AI绘画"，你会发现很多人给你点赞

记住：AI绘画不是"会画画的人才能玩的东西"，恰恰相反，不会画画的人受益最大——它把你脑子里的画面直接变成现实，不用经过多年的技法训练。技术门槛没了，剩下的就看你的想象力和审美了。多练、多看、多存好的Prompt，一周之后你就能生成让朋友惊叹的图。`,
};

export default article;
