const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const logoPath = path.join(__dirname, '..', 'public', 'logo-dapoer-pmcsu.png');
const outDir = path.join(__dirname, '..', 'public', 'icons');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generate() {
  for (const size of sizes) {
    const outFile = path.join(outDir, `icon-${size}x${size}.png`);
    await sharp(logoPath)
      .resize(size, size, { fit: 'contain', background: { r: 252, g: 251, b: 246, alpha: 1 } })
      .png()
      .toFile(outFile);
    console.log(`Generated: icon-${size}x${size}.png`);
  }

  // Also generate apple-touch-icon (180x180)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 252, g: 251, b: 246, alpha: 1 } })
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon.png'));
  console.log('Generated: apple-touch-icon.png');

  // Generate maskable icon (512x512 with padding)
  await sharp(logoPath)
    .resize(412, 412, { fit: 'contain', background: { r: 252, g: 251, b: 246, alpha: 1 } })
    .extend({
      top: 50, bottom: 50, left: 50, right: 50,
      background: { r: 252, g: 251, b: 246, alpha: 1 }
    })
    .png()
    .toFile(path.join(outDir, 'icon-maskable-512x512.png'));
  console.log('Generated: icon-maskable-512x512.png');

  console.log('All PWA icons generated!');
}

generate().catch(console.error);
