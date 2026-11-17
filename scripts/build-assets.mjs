// Genera los assets optimizados del sitio a partir de los originales en _referencias/.
// Uso: npm run assets
//
// El logotipo original trae fondo canela opaco. Aquí se separa el trazo crema del
// fondo para obtener versiones transparentes (crema y terracota), el isotipo,
// el favicon y la imagen Open Graph.

import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const REF = "_referencias";
const OUT_IMG = "public/images";
const OUT_APP = "src/app";

const CREMA = { r: 0xf3, g: 0xea, b: 0xdf };
const TERRACOTA = { r: 0x94, g: 0x59, b: 0x3a };
const CANELA = { r: 0xb9, g: 0x92, b: 0x72 };

await mkdir(OUT_IMG, { recursive: true });

// --- 1. Máscara alfa del logotipo -------------------------------------------
// Se descarta la franja negra superior de la captura y se mide qué tan "crema"
// es cada píxel respecto del fondo canela.
const TOP_CROP = 40;
const src = sharp(`${REF}/Logo Plenamente.png`).removeAlpha();
const meta = await src.metadata();
const { data, info } = await src
  .extract({ left: 0, top: TOP_CROP, width: meta.width, height: meta.height - TOP_CROP })
  .raw()
  .toBuffer({ resolveWithObject: true });

const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;
const bgLum = lum(data[0], data[1], data[2]);
let fgLum = 0;
for (let i = 0; i < data.length; i += 3) {
  fgLum = Math.max(fgLum, lum(data[i], data[i + 1], data[i + 2]));
}

const alpha = Buffer.alloc(info.width * info.height);
for (let p = 0, i = 0; p < alpha.length; p++, i += 3) {
  const t = (lum(data[i], data[i + 1], data[i + 2]) - bgLum) / (fgLum - bgLum);
  alpha[p] = Math.round(Math.min(1, Math.max(0, (t - 0.08) / 0.84)) * 255);
}

const tinted = (color) => {
  const rgba = Buffer.alloc(alpha.length * 4);
  for (let p = 0; p < alpha.length; p++) {
    rgba[p * 4] = color.r;
    rgba[p * 4 + 1] = color.g;
    rgba[p * 4 + 2] = color.b;
    rgba[p * 4 + 3] = alpha[p];
  }
  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } });
};

const png = (img) => img.png({ compressionLevel: 9, palette: true }).toBuffer();

// --- 2. Logotipo completo e isotipo ------------------------------------------
const fullCrema = await tinted(CREMA).trim().png().toBuffer();
const fullTerracota = await tinted(TERRACOTA).trim().png().toBuffer();
await writeFile(`${OUT_IMG}/logo-crema.png`, await png(sharp(fullCrema).resize({ width: 640 })));
await writeFile(`${OUT_IMG}/logo-terracota.png`, await png(sharp(fullTerracota).resize({ width: 640 })));

// El isotipo (trazo manuscrito) ocupa la parte superior del logotipo.
const ISO = { left: 380, top: 40, width: 380, height: 250 };
const isoCrema = await tinted(CREMA).extract(ISO).png().toBuffer();
const isoTerracota = await tinted(TERRACOTA).extract(ISO).png().toBuffer();
const isoCremaTrim = await sharp(isoCrema).trim().png().toBuffer();
await writeFile(`${OUT_IMG}/isotipo-crema.png`, await png(sharp(isoCremaTrim).resize({ width: 240 })));
await writeFile(
  `${OUT_IMG}/isotipo-terracota.png`,
  await png(sharp(await sharp(isoTerracota).trim().png().toBuffer()).resize({ width: 240 })),
);

// --- 3. Fotografía de la doctora ----------------------------------------------
await sharp(`${REF}/Doctora Barriere.jpg`)
  .resize({ width: 1100 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT_IMG}/dra-natalia-barriere.jpg`);

// --- 4. Favicon e iconos ------------------------------------------------------
const icon = async (size) => {
  const mark = await sharp(isoCremaTrim)
    .resize({ width: Math.round(size * 0.68), height: Math.round(size * 0.68), fit: "inside" })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: CANELA } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
};

await writeFile(`${OUT_APP}/icon.png`, await icon(512));
await writeFile(`${OUT_APP}/apple-icon.png`, await icon(180));

// favicon.ico: contenedor ICO con un PNG de 48 px dentro.
const ico48 = await icon(48);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reservado
header.writeUInt16LE(1, 2); // tipo: icono
header.writeUInt16LE(1, 4); // una imagen
header.writeUInt8(48, 6); // ancho
header.writeUInt8(48, 7); // alto
header.writeUInt16LE(1, 10); // planos
header.writeUInt16LE(32, 12); // bits por píxel
header.writeUInt32LE(ico48.length, 14);
header.writeUInt32LE(22, 18); // offset de los datos
await writeFile(`${OUT_APP}/favicon.ico`, Buffer.concat([header, ico48]));

// --- 5. Imagen Open Graph (1200 × 630) ---------------------------------------
const ogLogo = await sharp(fullCrema).resize({ height: 430 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: CANELA } })
  .composite([{ input: ogLogo, gravity: "center" }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/og.jpg");

console.log("Assets generados en public/ y src/app/");
