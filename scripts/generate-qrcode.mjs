import QRCode from 'qrcode';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const SITE_URL = 'https://ai-tools-guide-ar8.pages.dev/';
const AVATAR_PATH = path.join(publicDir, 'avatar.jpg');
const OUTPUT_PATH = path.join(publicDir, 'personal-qrcode.png');

const QR_SIZE = 820;
const QR_MARGIN = 2;
const OUTER_PADDING = 65;
const LOGO_AREA = 180;
const FOOTER_H = 120;
const BORDER_W = 10;
const RADIUS = 40;

async function generateQRCode() {
  console.log('🔄 正在生成专业二维码...');

  const innerSize = QR_SIZE;
  const qrCanvas = innerSize + OUTER_PADDING * 2;
  const totalH = qrCanvas + FOOTER_H;
  const finalW = qrCanvas + BORDER_W * 2;
  const finalH = totalH + BORDER_W * 2;

  const qrSvg = await QRCode.toString(SITE_URL, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: QR_MARGIN,
    width: innerSize,
    color: { dark: '#1a202c', light: '#ffffff' },
  });

  const qrPng = await sharp(Buffer.from(qrSvg)).png().toBuffer();

  const whiteBg = { r: 255, g: 255, b: 255, alpha: 1 };

  const qrOnCanvas = await sharp({ create: { width: qrCanvas, height: qrCanvas, channels: 4, background: whiteBg } })
    .composite([{ input: qrPng, left: OUTER_PADDING, top: OUTER_PADDING }])
    .png()
    .toBuffer();

  console.log('✅ 二维码主体生成完成');

  const avatarSize = LOGO_AREA - 28;
  const avatarCircle = await sharp(AVATAR_PATH)
    .resize(avatarSize, avatarSize, { fit: 'cover', position: 'attention' })
    .composite([{
      input: Buffer.from(`<svg width="${avatarSize}" height="${avatarSize}"><circle cx="${avatarSize/2}" cy="${avatarSize/2}" r="${avatarSize/2}" fill="black"/></svg>`),
      blend: 'dest-in',
    }])
    .png()
    .toBuffer();

  const logoBg = await sharp({ create: { width: LOGO_AREA, height: LOGO_AREA, channels: 4, background: whiteBg } })
    .composite([
      {
        input: Buffer.from(`<svg width="${LOGO_AREA}" height="${LOGO_AREA}"><circle cx="${LOGO_AREA/2}" cy="${LOGO_AREA/2}" r="${LOGO_AREA/2-2}" fill="white" stroke="#169c7b" stroke-width="6"/></svg>`),
      },
      { input: avatarCircle, left: 14, top: 14 },
    ])
    .png()
    .toBuffer();

  console.log('✅ 头像处理完成');

  const logoX = Math.floor((qrCanvas - LOGO_AREA) / 2);
  const logoY = Math.floor((qrCanvas - LOGO_AREA) / 2);

  const qrWithLogo = await sharp(qrOnCanvas)
    .composite([{ input: logoBg, left: logoX, top: logoY }])
    .png()
    .toBuffer();

  console.log('✅ 头像叠加完成');

  const footerSvg = Buffer.from(`
    <svg width="${qrCanvas}" height="${FOOTER_H}">
      <text x="${qrCanvas/2}" y="48" text-anchor="middle" font-family="-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="34" font-weight="bold" fill="#1a202c">AI 工具指南</text>
      <text x="${qrCanvas/2}" y="92" text-anchor="middle" font-family="-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="19" fill="#64748b">${SITE_URL}</text>
    </svg>
  `);

  const content = await sharp({ create: { width: qrCanvas, height: totalH, channels: 4, background: whiteBg } })
    .composite([
      { input: qrWithLogo, left: 0, top: 0 },
      { input: footerSvg, left: 0, top: qrCanvas },
    ])
    .png()
    .toBuffer();

  const borderSvg = Buffer.from(`
    <svg width="${finalW}" height="${finalH}">
      <rect x="0" y="0" width="${finalW}" height="${finalH}" rx="${RADIUS}" ry="${RADIUS}" fill="#169c7b"/>
    </svg>
  `);

  await sharp({ create: { width: finalW, height: finalH, channels: 4, background: whiteBg } })
    .composite([
      { input: borderSvg },
      { input: content, left: BORDER_W, top: BORDER_W },
    ])
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(OUTPUT_PATH);

  console.log(`\n🎉 专业个人二维码已生成!`);
  console.log(`📁 文件路径: public/personal-qrcode.png`);
  console.log(`🔗 跳转网址: ${SITE_URL}`);
  console.log(`📐 图片尺寸: ${finalW} x ${finalH}px`);
}

generateQRCode().catch(console.error);
