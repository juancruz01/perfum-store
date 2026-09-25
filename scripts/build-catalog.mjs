/**
 * Genera src/data/products.json a partir de los listados extraídos de los PDFs
 * del proveedor (data/raw/*.json).
 *
 * Uso:  npm run catalog            -> genera el catálogo
 *       npm run catalog -- --report -> además lista los productos sin género asignado
 *
 * Cotización, margen y precio máximo se configuran en src/config/pricing.json.
 * El catálogo completo queda en data/catalogo-completo.json; lo publicado es la
 * selección de scripts/catalog-selection.mjs.
 */
import fs from "node:fs";
import path from "node:path";
import { GENDER_OVERRIDES, NAME_FIXES } from "./catalog-overrides.mjs";
import { SELECTION } from "./catalog-selection.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), "utf8"));
const pricing = read("src/config/pricing.json");
const toArs = (usd, type) =>
  Math.round((usd * pricing.dolar * (1 + (pricing.margen[type] ?? 0) / 100)) / pricing.redondeo) * pricing.redondeo;

function normalizeRaw(str) {
  let raw = str.toUpperCase().replace(/[“”"]/g, "").replace(/´|`|’/g, "'").replace(/\s+/g, " ").trim();
  for (const [from, to] of NAME_FIXES) raw = raw.replace(from, to);
  return raw;
}

// ---------- Marca y tipo según la página del PDF ----------
const ARABES_PAGES = {
  1: "Lattafa", 2: "Lattafa", 3: "Lattafa", 4: "Afnan", 5: "Armaf", 6: "Armaf", 7: "Armaf",
  8: "Al Haramain", 9: "Al Haramain", 10: "Bharara", 11: "Bharara", 12: "French Avenue",
  13: "French Avenue", 14: "Rasasi", 15: "Khadlaj", 16: "Riiffs", 17: "Dumont", 18: "Rayhaan",
  19: "Maison Asrar", 20: "Maison Asrar", 21: "Maison Alhambra", 22: "Maison Alhambra",
  23: "Emper", 24: "Zimaya", 25: "Mykonos", 26: "Ard Al Zaafaran", 27: "Orientica", 28: "Sets",
};

const DISENADOR_PAGES = {
  1: ["Jo Milano", "nicho"], 2: ["Jean Paul Gaultier", "disenador"], 3: ["Valentino", "disenador"],
  4: ["Versace", "disenador"], 5: ["Dior", "disenador"], 6: ["Giorgio Armani", "disenador"],
  7: ["Burberry", "disenador"], 8: ["Cartier", "disenador"], 9: ["Acqua di Parma", "nicho"],
  10: ["Eter di Ba", "disenador"], 11: ["Cher", "disenador"], 12: ["Bensimon", "disenador"],
  13: ["Antonio Banderas", "disenador"], 14: ["Paco Rabanne", "disenador"],
  15: ["Yves Saint Laurent", "disenador"], 16: ["Azzaro", "disenador"],
  17: ["Carolina Herrera", "disenador"], 18: ["Xerjoff", "nicho"], 19: ["Givenchy", "disenador"],
  20: ["Tom Ford", "nicho"], 21: ["Creed", "nicho"], 22: ["Bvlgari", "nicho"], 23: ["Initio", "nicho"],
  24: ["Parfums de Marly", "nicho"], 25: ["Mancera", "nicho"], 26: ["Montale", "nicho"],
  27: ["Lancôme", "disenador"], 28: ["Montblanc", "disenador"], 29: ["Hugo Boss", "disenador"],
  30: ["Ralph Lauren", "disenador"], 31: ["Jimmy Choo", "disenador"], 32: ["Calvin Klein", "disenador"],
  33: ["Viktor & Rolf", "disenador"], 34: ["Mugler", "disenador"], 35: ["Moschino", "disenador"],
};

// Variantes de la marca que pueden aparecer dentro del nombre (para no duplicarla).
const BRAND_ALIASES = {
  Lattafa: ["LATTAFA", "LATTFA"], Afnan: ["AFNAN"], Armaf: ["ARMAF"],
  "Al Haramain": ["AL HARAMAIN", "HARAMAIN"], Bharara: ["BHARARA"],
  "French Avenue": ["FRENCH AVENUE", "FRENCH AVENEU"], Rasasi: ["RASASI", "BY RASASI"],
  Khadlaj: ["KHADLAJ"], Riiffs: ["RIIFFS"], Dumont: ["DUMONT"], Rayhaan: ["RAYHAAN"],
  "Maison Asrar": ["MAISON ASRAR"], "Maison Alhambra": ["MAISON ALHAMBRA", "MASION ALHAMBRA", "MAISON ALHMABRA"],
  Emper: ["EMPER"], Mykonos: ["MYKONOS"], Orientica: ["ORIENTICA"],
  "Jean Paul Gaultier": ["BY JEAN PAUL GAULTIER", "JEAN PAUL GAULTIER"], Valentino: ["VALENTINO"],
  Versace: ["BY VERSACE", "VERSACE"], Dior: ["BY DIOR", "DIOR"],
  "Giorgio Armani": ["BY GIORGIO ARMANI", "BY EMPORIO ARMANI"], Burberry: ["BURBERRY"],
  Cartier: ["CARTIER", "CARITER"], Cher: ["CHER"], Bensimon: ["BENSIMON"],
  "Antonio Banderas": ["ANTONIO BANDERAS"], "Paco Rabanne": ["BY PACO RABANNE", "PACO RABANNE"],
  "Yves Saint Laurent": ["BY YVES SAINT LAURENT", "YVES SAINT LAURENT"], Azzaro: ["BY AZZARO", "AZZARO"],
  "Carolina Herrera": ["BY CAROLINA HERRERA", "CAROLINA HERRERA"], Givenchy: ["BY GIVENCHY"],
  "Tom Ford": ["BY TOM FORD", "TOM FORD"], Creed: ["BY CREED"], Bvlgari: ["BY BVLGARI"],
  Initio: ["BY INITIO"], "Parfums de Marly": ["BY PARFUMS DE MARLY"], Mancera: ["MANCERA"],
  Montblanc: ["BY MONTBLANC"], "Hugo Boss": ["BY HUGO BOSS"], "Ralph Lauren": ["BY RALPH LAUREN"],
  "Jimmy Choo": ["BY JIMMY CHOO", "JIMMY CHOO"], "Calvin Klein": ["BY CALVIN KLEIN"],
  "Viktor & Rolf": ["BY VIKTOR & ROLF", "VIKTOR & ROLF"], Mugler: ["BY MUGLER", "THIERRY MUGLER", "MUGLER"],
  "Jo Milano": ["JO MILANO"],
};

// ---------- Limpieza de nombres ----------
const CONCENTRATIONS = [
  [/EXTRAIT DE PARFUM|\bEXTRAIT\b/, "Extrait de Parfum"],
  [/PARFUM CONCENTR[ÉE]|PARFUM INTENSE|EDP INTENSE|EAU DE PARFUM INTENSE/, "Parfum Intense"],
  [/ESSENCE DE PARFUM/, "Essence de Parfum"],
  [/\bEDP\b|\bEPD\b|\bRDP\b|EAU DE PARFUM/, "Eau de Parfum"],
  [/\bEDT\b|EAU DE TOILETTE/, "Eau de Toilette"],
  [/EAU DE COLOGNE/, "Eau de Cologne"],
  [/\bPARFUM\b/, "Parfum"],
];

const GENDER_WORDS = /\b(FEMENINO|FEM|MASCULINO|MACULINO|MASC|UNISSEX|UNISEEX|UNISEX)\b/g;

const LOWER_WORDS = new Set(["de", "del", "di", "da", "la", "le", "les", "el", "al", "by", "pour", "in", "of", "the", "for", "with", "et", "and", "y", "en"]);
const KEEP_UPPER = new Set(["EDP", "EDT", "XS", "VIP", "NYC", "CH", "CK", "II", "III", "XO", "USA", "L'OR", "ATP", "Y", "A*MEN", "I", "9PM", "9AM"]);

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w, i) => {
      if (!w) return w;
      if (KEEP_UPPER.has(w.toUpperCase())) return w.toUpperCase();
      if (/^\d+(ml|g)$/.test(w)) return w; // 100ml
      if (i > 0 && LOWER_WORDS.has(w)) return w;
      // L'Homme, D'Eau
      return w
        .replace(/(^|[\-.(])(\p{L})/gu, (_, a, b) => a + b.toUpperCase())
        .replace(/^([ldj]')(\p{L})/iu, (_, a, b) => a.toUpperCase() + b.toUpperCase());
    })
    .join(" ");
}

function slugify(s) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function detectGender(raw) {
  const n = ` ${raw} `;
  for (const [needle, g] of GENDER_OVERRIDES) if (n.includes(needle)) return g;
  if (/UNIS+E+X/.test(n)) return "unisex";
  if (/\b(FEM|FEMENINO|FEMME|WOMAN|WOMEN|DONNA|GIRL|LADY|HER|MISS|QUEEN)\b/.test(n)) return "femenino";
  if (/\b(MASC|MASCULINO|MACULINO|MEN|MAN|HOMME|UOMO|HIM|GENTLEMAN)\b/.test(n)) return "masculino";
  return null;
}

function parseName(raw, brand) {
  // Tamaño
  let size = null;
  const sizeMatch = raw.match(/(\d+(?:[.,]\d+)?)\s?ML\b/);
  const isSet = /^KIT\b|\s\+\s|\bX \d+\b|\d+ ?X ?\d+ML/.test(raw);
  if (sizeMatch && !isSet) size = `${sizeMatch[1].replace(",", ".")}ml`;

  // Concentración
  let concentration = null;
  if (!isSet) {
    for (const [re, label] of CONCENTRATIONS) {
      if (re.test(raw)) { concentration = label; break; }
    }
  }

  let name = raw;
  if (!isSet) {
    name = name
      .replace(/(\d+(?:[.,]\d+)?)\s?ML\b/g, "")
      .replace(/EXTRAIT DE PARFUM|EAU DE PARFUM INTENSE|EAU DE PARFUM|EAU DE TOILETTE|EAU DE COLOGNE|ESSENCE DE PARFUM|PARFUM CONCENTR[ÉE]/g, "")
      .replace(/\b(EDP|EPD|RDP|EDT|EXTRAIT)\b/g, "")
      .replace(/\bPARFUM INTENSE\b/g, "")
      .replace(GENDER_WORDS, "")
      .replace(/\bRECHARGA?BLE\b/g, "")
      .replace(/\*([A-Z]+)\*/g, "$1");
    // "Parfum" como concentración sólo si no es parte del nombre (ej. "Le Parfum")
    if (concentration === "Parfum" && !/\bLE PARFUM\b/.test(name)) name = name.replace(/\bPARFUM\b/g, "");
    if (concentration === "Parfum Intense") name = name.replace(/\bINTENSE\b/, "");
  }

  // Quitar la marca del nombre (se muestra aparte)
  // Sólo la primera aparición: "DIOR MISS DIOR" -> "MISS DIOR"
  for (const alias of BRAND_ALIASES[brand] ?? []) {
    const re = new RegExp(`(^|\\s)${alias.replace(/[.*+?^${}()|[\]\\&]/g, "\\$&")}(?=\\s|$)`);
    if (re.test(name)) {
      name = name.replace(re, " ");
      break;
    }
  }
  name = name.replace(/\sBY\s*$/, "");
  name = name.replace(/\s+/g, " ").replace(/^[\s\-,.]+|[\s\-,.(]+$/g, "").trim();

  return { name: titleCase(name), size, concentration, isSet };
}

// ---------- Construcción ----------
const all = [];
const seen = new Set();
const report = [];

function add(item, brand, type, source) {
  const raw = normalizeRaw(item.name);
  const parsed = parseName(raw, brand === "Sets" ? "" : brand);
  let gender = detectGender(raw);
  if (!gender) {
    report.push(`${source} p${item.pg} | ${brand} | ${raw}`);
    gender = "unisex";
  }
  const displayBrand = brand === "Sets" ? "Set de regalo" : brand;
  const fullName = brand === "Sets" ? parsed.name : `${brand} ${parsed.name}`;
  const slug = slugify(`${fullName} ${parsed.concentration ?? ""} ${parsed.size ?? ""}`);
  if (seen.has(slug)) return; // duplicado en el PDF
  seen.add(slug);

  all.push({
    id: slug,
    slug,
    name: parsed.name,
    brand: displayBrand,
    type,
    gender,
    concentration: parsed.concentration,
    size: parsed.size,
    isSet: parsed.isSet || brand === "Sets",
    priceUsd: item.usd,
    price: toArs(item.usd, type),
    image: null,
    raw,
  });
}

for (const it of read("data/raw/arabes.json")) {
  add(it, ARABES_PAGES[it.pg] ?? "Árabe", "arabe", "arabes");
}
for (const it of read("data/raw/disenador-nicho.json")) {
  const [brand, type] = DISENADOR_PAGES[it.pg] ?? ["Diseñador", "disenador"];
  add(it, brand, type, "disenador");
}

// Catálogo completo (referencia para sumar productos a la selección)
fs.writeFileSync(path.join(root, "data/catalogo-completo.json"), JSON.stringify(all, null, 2) + "\n");

// Catálogo publicado: sólo la selección y dentro del precio máximo
const byRaw = new Map(all.map((p) => [p.raw, p]));
const products = [];
const problems = [];
for (const [i, name] of SELECTION.entries()) {
  const p = byRaw.get(normalizeRaw(name));
  if (!p) { problems.push(`No encontrado: ${name}`); continue; }
  if (p.price > pricing.precioMaximo) { problems.push(`Supera el precio máximo ($${p.price}): ${name}`); continue; }
  const product = { ...p, featured: i };
  delete product.raw;
  products.push(product);
}

const out = path.join(root, "src/data/products.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(products, null, 2) + "\n");

const count = (k, v) => products.filter((p) => p[k] === v).length;
const ars = (n) => "$" + n.toLocaleString("es-AR");
console.log(`✔ Catálogo completo: ${all.length} productos -> data/catalogo-completo.json`);
console.log(`✔ Publicados: ${products.length} productos -> src/data/products.json`);
console.log(`  árabes: ${count("type", "arabe")} | diseñador: ${count("type", "disenador")} | nicho: ${count("type", "nicho")}`);
console.log(`  masculino: ${count("gender", "masculino")} | femenino: ${count("gender", "femenino")} | unisex: ${count("gender", "unisex")}`);
const prices = products.map((p) => p.price);
console.log(`  precios: ${ars(Math.min(...prices))} a ${ars(Math.max(...prices))}`);
if (problems.length) console.log("\n⚠ " + problems.join("\n⚠ "));
if (process.argv.includes("--report")) {
  console.log(`\nSin género detectado (${report.length}), se asignó unisex:`);
  console.log(report.join("\n"));
}
