const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const url = 'https://ai-tools-guide-ar8.pages.dev/';
const outputPath = path.join(__dirname, '..', 'public', 'website-qrcode.png');

QRCode.toFile(outputPath, url, {
  width: 400,
  margin: 2,
  color: {
    dark: '#0d1117',
    light: '#ffffff'
  }
}, function(err) {
  if (err) throw err;
  console.log(`✅ Website QR code saved to: ${outputPath}`);
  console.log(`✅ URL: ${url}`);
});
