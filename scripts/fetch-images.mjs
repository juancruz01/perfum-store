/**
 * Descarga la foto oficial de cada perfume (Fragrantica) y la normaliza para
 * que todo el catálogo se vea parejo: recorta el fondo sobrante y centra el
 * frasco en un lienzo blanco de 800x1000 (4:5), guardado como WebP.
 *
 * Uso:  npm run images            -> descarga sólo las que faltan
 *       npm run images -- --force -> vuelve a descargar todas
 *
 * Para usar una foto propia, guardala como public/products/<slug>.webp
 * (o corré el script con tu archivo en .tmp) y no la pises con --force.
 * Después de descargar, corré `npm run catalog` para enlazar las fotos.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const ids = JSON.parse(fs.readFileSync(path.join(root, "scripts/image-ids.json"), "utf8"));
const outDir = path.join(root, "public/products");
fs.mkdirSync(outDir, { recursive: true });

const W = 800;
const H = 1000;
const MAX_W = 560; // margen para que el frasco no toque los bordes ni las etiquetas
const MAX_H = 740;
const force = process.argv.includes("--force");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(id) {
  const url = `https://fimgs.net/mdimg/perfume-thumbs/375x500.${id}.jpg`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function normalize(input) {
  // Recorta el blanco alrededor del frasco (tolerancia para sombras suaves)
  const trimmed = await sharp(input).flatten({ background: "#ffffff" }).trim({ threshold: 18 }).toBuffer();
  const bottle = await sharp(trimmed)
    .resize({ width: MAX_W, height: MAX_H, fit: "inside", withoutEnlargement: false })
    .toBuffer();
  const meta = await sharp(bottle).metadata();
  // Apoya todos los frascos sobre la misma "línea de piso"
  const top = Math.round(H - 90 - meta.height);
  const left = Math.round((W - meta.width) / 2);
  return sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } })
    .composite([{ input: bottle, top: Math.max(0, top), left }])
    .webp({ quality: 82 })
    .toBuffer();
}

let ok = 0;
let skipped = 0;
const failed = [];
for (const [slug, id] of Object.entries(ids)) {
  const file = path.join(outDir, `${slug}.webp`);
  if (!force && fs.existsSync(file)) {
    skipped++;
    continue;
  }
  try {
    const raw = await download(id);
    fs.writeFileSync(file, await normalize(raw));
    ok++;
    process.stdout.write(".");
  } catch (err) {
    failed.push(`${slug} (${id}): ${err.message}`);
  }
  await sleep(250); // no saturar al servidor
}
console.log(`\n✔ ${ok} descargadas, ${skipped} ya existían, ${failed.length} con error`);
if (failed.length) console.log(failed.join("\n"));
