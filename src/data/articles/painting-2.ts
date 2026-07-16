import type { IArticle } from '@/types/tutorial';

const article: IArticle = {
  id: 'painting-2',
  title: 'Midjourney 从入门到精通：参数与风格词完全指南',
  description: '详解 --ar、--stylize、--chaos 等核心参数，附 50+ 高质量风格词库。',
  date: '2026-05-22',
  readTime: '25 分钟',
  content: `## 通俗类比：Midjourney就像高级定制裁缝

Stable Diffusion像缝纫机，功能强大但要学操作，线穿错了还会卡壳；Midjourney像开在巴黎蒙田大道的高级定制裁缝店——你不需要懂怎么缝衣服，甚至不需要亲自量尺寸，你只需要告诉裁缝"我想要一条黑色的丝绒长裙，收腰设计，长度到脚踝，要有1950年代复古感，适合晚宴穿"，裁缝就能给你做出一件惊艳的成品。做工精致、细节完美，但按件收费，而且你没法进裁缝的工作间指手画脚说"这里给我改一改"。

很多人问我："既然SD免费开源，为什么还要花钱用Midjourney？"答案很简单：Midjourney出图质量的上限是目前所有AI绘画工具里最高的，尤其是审美、色彩、光影、氛围感这些"感觉"层面的东西，Midjourney做得比SD好——它就像一个天生审美就很好的天才画师，你不用费尽心机调参数、写一堆Prompt，简单几句话就能出很有艺术感的图。对于不想折腾、只想快速出高质量图的人来说，Midjourney绝对是首选。

## 为什么Midjourney是设计师的秘密武器？

在2026年的今天，如果你去问任何一个顶尖的创意工作室、广告公司、设计公司"你们用什么AI工具出图"，90%的答案里都会有Midjourney。不是因为他们不会用SD，而是因为Midjourney在"快速出高质量概念图"这件事上，确实无人能打。

我认识一个4A广告公司的创意总监，他跟我说："以前给客户提报方案，我们要花一周时间找参考、画草图、做3D渲染，才能出3版概念图给客户选；现在我用Midjourney，一个下午就能出20版风格完全不同的概念图，客户看了直呼'你们效率怎么这么高'。虽然最后落地还是要靠设计师精修，但Midjourney帮我们把'从0到1'的时间从一周压缩到了一下午，这个价值太大了。"

Midjourney的创始人David Holz是个物理学家和数学家，他从一开始就没想做一个"让用户完全控制"的工具，而是想做一个"懂艺术的AI搭档"——它不会完全听你的话，但它会用它的审美给你惊喜。很多时候你输一段很简单的Prompt，它出来的效果比你想象的还要好，这就是Midjourney的魅力。

## 快速开始：10分钟注册并生成第一张图

Midjourney是基于Discord运行的，所以你需要先有个Discord账号。别担心，注册很简单。

**第一步：注册Discord账号**
1. 去discord.com下载Discord客户端（或者直接用网页版）
2. 用邮箱注册账号，验证邮箱
3. 设置用户名和密码，就搞定了

**第二步：加入Midjourney服务器**
1. 打开Midjourney官网midjourney.com，点"Join the Beta"
2. 它会自动跳转到Discord，接受邀请加入Midjourney官方服务器
3. 进去之后你会看到一堆频道，随便进一个newbie-xxxxx的新手频道

**第三步：开始生成图片**
1. 在新手频道的输入框里输入/imagine，然后按空格
2. 你会看到Prompt输入框，输入你想画的内容，比如"a cute corgi dog wearing a spacesuit, floating in space, nebula background, cinematic lighting"
3. 按回车发送，Midjourney就会开始生成图片
4. 大约1分钟后，你会看到一张2x2的网格图，一共4张图
5. 图片下面有U1/U2/U3/U4和V1/V2/V3/V4按钮：U是放大（Upscale）你选的那张图，V是基于你选的那张图再变化（Variation）出4张新图

恭喜你！你的第一张Midjourney图片生成了！

**进阶：把Midjourney拉到自己的服务器（可选）**
在官方服务器里人太多，消息刷得太快，找自己的图很麻烦。推荐你自己建一个Discord服务器，把Midjourney机器人拉进去，这样你就可以在自己的服务器里安安静静画图，没人打扰。方法很简单：
1. 在Discord里点"+"号，新建一个服务器，随便取个名字
2. 回到Midjourney官方服务器，在成员列表里找到Midjourney机器人，点它头像，选"添加到服务器"
3. 选择你刚建的服务器，授权，就搞定了

## 核心参数详解：从新手到高手的关键

只会输Prompt还不够，参数才是Midjourney的精髓。参数用得好，你能精准控制图片的风格、比例、质量、多样性。参数要加在Prompt的最后，前面加--。

### 1. --ar 宽高比（最常用，必须掌握）
控制图片的宽高比例，这是你用得最多的参数，没有之一。
- --ar 1:1：正方形，适合头像、朋友圈配图、Instagram
- --ar 16:9：横屏宽屏，适合电脑壁纸、PPT背景、视频封面、B站封面
- --ar 9:16：竖屏，适合手机壁纸、抖音/小红书/视频号、手机端海报
- --ar 3:4：竖版，适合小红书配图（小红书最佳比例）
- --ar 4:3：传统照片比例，适合摄影作品
- --ar 2:3：竖版照片比例，适合人像、写真
- --ar 21:9：超宽屏，适合电影感、全景图

注意：V6版本支持任意比例，以前V5最多支持到--ar 2:1，现在随便你设什么比例都可以。

### 2. --v 模型版本
Midjourney会不断更新模型，不同版本风格差异很大。
- --v 6.1：目前最新的版本（2026年），写实能力最强，对Prompt理解最好，文字生成能力大幅提升，几乎是万能的，不知道用什么就用V6.1
- --v 6.0：上一个版本，也很好用，风格比6.1稍微艺术一点
- --v 5.2：之前的经典版本，速度快，风格多样
- --niji 6：专门画二次元/动漫风格的模型，如果你要画动漫、插画、日系风格，用Niji比V6效果好10倍
- --niji 5 --style expressive：Niji 5的一个风格，手绘感更强
- --niji 5 --style cute：Q版可爱风格

新手直接用--v 6.1就行，画二次元加--niji 6。

### 3. --s 或 --stylize 风格化程度（0-1000）
这个参数控制Midjourney"自由发挥"的程度，非常重要。
- --s 0：完全听你的话，你Prompt写什么它画什么，几乎不自由发挥，适合需要精准控制的场景
- --s 100：默认值，平衡听指令和艺术感
- --s 250：比较有艺术感，Midjourney会加一些自己的想法
- --s 500：艺术感很强，经常给你惊喜
- --s 1000：放飞自我，完全不怎么听你的，怎么艺术怎么来，适合找灵感、做艺术创作

记住这个规律：做商业设计、需要精准控制的时候--s调低一点（50-150）；做艺术创作、找灵感、想要惊喜的时候--s调高一点（250-750）。

### 4. --c 或 --chaos 多样性/混沌度（0-100）
控制4张图之间的差异程度。
- --c 0：默认值，4张图风格差不多，变化不大
- --c 25：有一定变化，适合探索不同方向
- --c 50：变化比较大，能出很不同的风格
- --c 100：完全放飞，4张图可能看起来完全不一样，适合最开始找灵感的时候用

一般探索阶段用--c 30-50，确定方向之后用--c 0-10精修。

### 5. --q 或 --quality 生成质量（0.25, 0.5, 1, 2）
控制生成图片花费的时间和质量。
- --q 0.25：最快，质量一般，适合快速出草稿找感觉，4倍速省时间
- --q 0.5：较快，质量不错，日常用足够
- --q 1：默认值，质量和速度平衡最好
- --q 2：质量最高，细节最丰富，但生成时间是默认的2倍，耗GPU时间也翻倍

注意：--q 2不代表分辨率更高，只是细节更多、渲染时间更长。日常用--q 1就够了，做最终成品的时候再用--q 2。

### 6. --no 排除元素
告诉Midjourney你不想看到什么东西。
比如：
- --no "blurry, watermark, text"：排除模糊、水印、文字
- --no "ugly, deformed, bad hands"：排除丑的、变形的、坏手
- --no "background"：去掉背景

相当于SD里的负面Prompt，但Midjourney的负面词不用写太多，--no后面加几个最关键的就行。

### 7. --seed 随机种子
跟SD里的seed一样，同一个seed+同一个Prompt+同一个参数，生成的图几乎一样。用来复现图片、微调图片。
用法：先随便生成一张图，找到它的seed（在图片上点右键添加反应✉️信封 emoji，Midjourney会私信你这张图的seed值），下次生成的时候加--seed 123456789就能生成差不多的图，然后你可以微调Prompt来修改细节。

### 8. --style raw 原始风格
V6版本加的参数，加了--style raw之后Midjourney会减少它默认的美化和滤镜感，更写实、更贴近你写的Prompt，适合做产品图、需要精准还原的场景。如果你觉得Midjourney出来的图"太Midjourney了"，加个--style raw就对了。

### 9. --tile 无缝贴图
生成可以无缝平铺的图案，适合做壁纸、布料纹理、包装纸、游戏贴图。生成完可以用在线无缝贴图检测工具看看能不能完美平铺。

### 10. --iw 图片权重（垫图的时候用）
当你用图片Prompt（垫图）的时候，--iw控制参考图的权重，默认是1，范围0-2。
- --iw 0.5：参考图影响很小，主要看文字Prompt
- --iw 1：默认，平衡参考图和文字
- --iw 2：完全参考图片的构图和风格，文字Prompt影响变小

## Prompt结构：写出高质量Midjourney提示词的公式

很多人写Midjourney Prompt就是堆关键词，结果出来的效果不好。其实Midjourney的Prompt是有结构的，按照这个公式写，出图质量立刻上一个台阶：

**[主体描述] + [环境/场景] + [动作/姿态] + [风格/艺术形式] + [光影/氛围] + [构图/镜头] + [画质词] + [参数]**

我给你拆解一下每部分怎么写：

### 1. 主体描述（最重要）
先说清楚你要画什么，这是最核心的。不要只写"一个女孩"，要写具体：
- 年龄："a 20-year-old young woman"
- 外貌特征："long black hair, freckles on her nose, wearing a white linen dress"
- 穿着："wearing a vintage denim jacket, red scarf, round glasses"
- 表情："smiling softly, looking at camera, eyes sparkling"
越具体越好。

### 2. 环境/场景
主体在什么地方？
- 室内："in a cozy sunlit coffee shop, wooden tables, bookshelves, plants on windowsill"
- 室外："on a cliff overlooking the ocean, golden hour, waves crashing below"
- 幻想场景："in a magical forest, glowing mushrooms, fireflies, ancient ruins covered in vines"

### 3. 动作/姿态
主体在做什么？什么姿势？
- "sitting by the window reading a book, legs crossed"
- "walking through rain in Tokyo street, holding a transparent umbrella"
- "dancing under starlight, dress flowing in the wind"

### 4. 风格/艺术形式（决定画风的关键）
这部分决定了你的图是什么风格，是写实照片还是油画还是动漫？
**摄影类：**
- photorealistic, 8K, DSLR photograph, shot on Portra 400 film, bokeh, shallow depth of field（写实人像）
- National Geographic photo, wildlife photography, award-winning（国家地理风格）
- fashion editorial, Vogue magazine photoshoot, studio lighting（时尚大片）
- street photography, candid shot, grainy film, 35mm（街头摄影）

**艺术绘画类：**
- oil painting by Rembrandt, chiaroscuro lighting, baroque style（伦勃朗油画）
- watercolor painting, soft edges, wet on wet technique（水彩）
- Studio Ghibli style, Hayao Miyazaki, anime, hand-painted texture（吉卜力风格）
- pixel art, 16-bit, retro game style, vibrant colors（像素风）
- vector art, flat design, minimalistic, bold lines（矢量扁平风）

**设计类：**
- graphic design poster, minimalist, Swiss style, typography（海报设计）
- UI/UX design, app interface, clean, modern, Dribbble style（UI设计）
- isometric illustration, 3D render, pastel colors（2.5D等距插画）

### 5. 光影/氛围
光影和氛围决定了一张图的"感觉"，是高级感的来源。
- golden hour lighting, warm sunlight filtering through trees, soft shadows（黄金时刻，暖光）
- cinematic lighting, moody, low key, dramatic shadows（电影感光影）
- soft diffused light, overcast day, studio lighting, even lighting（柔光）
- neon lights, cyberpunk, rain reflections, purple and blue color palette（赛博朋克霓虹）
- ethereal glow, dreamy, hazy, magical atmosphere（梦幻氛围）
- volumetric fog, god rays, atmospheric perspective（体积雾，丁达尔效应）

### 6. 构图/镜头
告诉Midjourney用什么镜头、什么景别。
- close-up shot, extreme close-up on eyes（特写）
- medium shot, waist up（中景）
- wide shot, full body, establishing shot（全景）
- aerial view, drone shot, top-down view（航拍/俯拍）
- Dutch angle, low angle shot, worm's eye view（特殊角度）
- shot with 50mm f/1.4 lens, shot with 85mm portrait lens（镜头焦段）

### 7. 画质词
最后加几个提升画质的词，不要堆太多，一两个就行：
- masterpiece, best quality, ultra-detailed, hyper-detailed, intricate details
- sharp focus, high resolution, 8K UHD, DSLR quality

### 8. 参数
最后加上我们前面讲的参数：--ar 9:16 --v 6.1 --s 250之类的。

**一个完整的Prompt示例：**
\\\`\\\`\\`,
};

export default article;
