import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import { fr } from '../src/i18n/dictionaries/fr.ts';
import { en } from '../src/i18n/dictionaries/en.ts';
import { es } from '../src/i18n/dictionaries/es.ts';
import { de } from '../src/i18n/dictionaries/de.ts';

// Les SVG de `public/` sont la SOURCE des icônes ; l'image de partage, elle,
// est décrite ICI parce qu'elle est PARAMÉTRÉE PAR LANGUE — un fichier figé ne
// pourrait pas l'être. Les PNG produits sont versionnés : la construction
// Docker les copie sans jamais rejouer ce script, faute de sharp et de polices.
//
// Les textes viennent des dictionnaires : une accroche traduite ici et non
// là-bas finirait par diverger de la page qu'elle annonce.
const ROOT = join(import.meta.dirname, '..');

const DICTIONARIES = { fr, en, es, de };

const FONT = 'DejaVu Sans, Noto Sans, Liberation Sans, sans-serif';

// Vignette d'un jeu, à l'échelle 0.75 depuis le viewBox 400×240 des
// illustrations du site. Les tracés sont recopiés de `GameArt.tsx` :
// ⚠️ toute retouche du dessin doit être reportée dans les deux fichiers.
const PUSH_YOUR_LUCK_ART = `
  <rect width="400" height="240" fill="url(#pylSky)"/>
  <ellipse cx="200" cy="150" rx="190" ry="120" fill="url(#pylGlow)"/>
  <g transform="rotate(-17 128 168)">
    <rect x="88" y="96" width="80" height="112" rx="10" fill="#FBF3E0"/>
    <rect x="93" y="101" width="70" height="102" rx="7" fill="none" stroke="#E4BE72" stroke-width="2"/>
    <path d="M128 128c-10 11-18 17-18 25a9 9 0 0 0 15 6l-3 12h12l-3-12a9 9 0 0 0 15-6c0-8-8-14-18-25Z" fill="#2b1f57"/>
  </g>
  <g transform="rotate(17 272 168)">
    <rect x="232" y="96" width="80" height="112" rx="10" fill="#FBF3E0"/>
    <rect x="237" y="101" width="70" height="102" rx="7" fill="none" stroke="#E4BE72" stroke-width="2"/>
    <ellipse cx="272" cy="166" rx="24" ry="8" fill="#E4BE72"/>
    <ellipse cx="272" cy="155" rx="24" ry="8" fill="#F7C860"/>
    <ellipse cx="272" cy="144" rx="24" ry="8" fill="#E4BE72"/>
    <ellipse cx="272" cy="133" rx="24" ry="8" fill="#F7C860"/>
  </g>
  <rect x="158" y="72" width="84" height="118" rx="11" fill="#FFFBF0"/>
  <rect x="163" y="77" width="74" height="108" rx="8" fill="none" stroke="#D9534F" stroke-width="2"/>
  <circle cx="200" cy="140" r="27" fill="#241a45"/>
  <rect x="193" y="106" width="14" height="10" rx="3" fill="#241a45"/>
  <path d="M207 108c10-6 16-12 14-22" fill="none" stroke="#F7C860" stroke-width="4" stroke-linecap="round"/>
  <circle cx="190" cy="132" r="5" fill="#4b3a86"/>`;

const LOUPS_GAROUS_ART = `
  <rect width="400" height="240" fill="url(#lgSky)"/>
  <circle cx="188" cy="106" r="130" fill="url(#lgMoonGlow)"/>
  <circle cx="188" cy="106" r="82" fill="#F6E9C6"/>
  <circle cx="152" cy="72" r="10" fill="#E8D6AC"/>
  <circle cx="228" cy="82" r="7" fill="#E8D6AC"/>
  <circle cx="216" cy="140" r="6" fill="#E8D6AC"/>
  <circle cx="44" cy="38" r="2.5" fill="#F6E9C6" opacity="0.9"/>
  <circle cx="330" cy="30" r="2.5" fill="#F6E9C6" opacity="0.85"/>
  <circle cx="364" cy="74" r="2" fill="#F6E9C6" opacity="0.6"/>
  <g fill="#101c3c" opacity="0.9">
    <path d="M292 212l24-56 24 56Z"/><path d="M338 212l22-48 22 48Z"/><path d="M0 212l24-54 24 54Z"/>
  </g>
  <path fill="#050a18" d="M96 240l10-92c2-22 8-42 20-56l-6-54 40 48h4l16-56 30 68c8 4 14 10 18 16l64 18 14 10-14 10-58 12c-8 10-20 20-34 28-20 12-46 18-68 22Z"/>
  <ellipse cx="196" cy="132" rx="7" ry="5" fill="#F0913E" transform="rotate(-12 196 132)"/>
  <g fill="#02040a">
    <path d="M0 240l30-64 30 64Z"/><path d="M300 240l30-70 30 70Z"/>
    <path d="M352 240l26-56 26 56Z"/><rect y="228" width="400" height="12"/>
  </g>`;

// `&` et `<` casseraient le document : une apostrophe typographique, elle,
// passe très bien en UTF-8.
function escapeXml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function card(x: number, y: number, tilt: number, clip: string, art: string, label: string) {
    return `
  <g transform="translate(${x} ${y}) rotate(${tilt})">
    <rect x="-6" y="-6" width="312" height="252" rx="26" fill="#fffdf7" stroke="#d2c4a6" stroke-width="4"/>
    <g clip-path="url(#${clip})"><g transform="scale(0.75)">${art}</g></g>
    <text x="18" y="216" font-family="${FONT}" font-size="24" font-weight="bold" fill="#1b1526">${escapeXml(label)}</text>
  </g>`;
}

function buildSvg(dictionary: typeof fr): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.8" fill="#1b1526" opacity="0.07"/>
    </pattern>

    <linearGradient id="pylSky" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#2b1f57"/><stop offset="1" stop-color="#0c0918"/>
    </linearGradient>
    <radialGradient id="pylGlow" cx="0.5" cy="0.62" r="0.5">
      <stop offset="0" stop-color="#F7C860" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#F7C860" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="lgSky" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#22376a"/><stop offset="0.55" stop-color="#121c39"/>
      <stop offset="1" stop-color="#070a16"/>
    </linearGradient>
    <radialGradient id="lgMoonGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#F4E4BC" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#F4E4BC" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="clipA"><rect width="300" height="180" rx="18"/></clipPath>
    <clipPath id="clipB"><rect width="300" height="180" rx="18"/></clipPath>
  </defs>

  <rect width="1200" height="630" fill="#fdf8ec"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect y="612" width="1200" height="18" fill="#17131f"/>

  <g transform="translate(84 74)">
    <g transform="scale(1.1875)">
      <rect width="64" height="64" rx="15" fill="#17131f"/>
      <rect x="16" y="16" width="14" height="14" rx="4" fill="#fdf8ec"/>
      <rect x="34" y="16" width="14" height="14" rx="4" fill="#fdf8ec"/>
      <rect x="16" y="34" width="14" height="14" rx="4" fill="#fdf8ec"/>
      <circle cx="41" cy="41" r="7" fill="#fdf8ec"/>
    </g>
  </g>

  <text x="184" y="132" font-family="${FONT}" font-size="52" font-weight="bold"
        fill="#1b1526" letter-spacing="-1">${escapeXml(dictionary.meta.title)}</text>
  <text x="86" y="208" font-family="${FONT}" font-size="27" fill="#5b5369">${escapeXml(dictionary.hero.tagline)}</text>

${card(86, 268, -3, 'clipA', PUSH_YOUR_LUCK_ART, dictionary.games.items['push-your-luck'].name)}
${card(432, 292, 3, 'clipB', LOUPS_GAROUS_ART, dictionary.games.items['loups-garous'].name)}

  <text x="840" y="392" font-family="${FONT}" font-size="30" font-weight="bold"
        fill="#17131f" letter-spacing="0.5">jeux.leoderoin.fr</text>
  <text x="840" y="436" font-family="${FONT}" font-size="24" fill="#8b8299">${escapeXml(dictionary.hero.eyebrow)}</text>
</svg>`;
}

async function rasterize(svg: string | Buffer, output: string, width: number, height: number) {
    const png = await sharp(Buffer.from(svg), { density: 384 })
        .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toBuffer();

    const destination = join(ROOT, output);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, png);
    console.log(`${output} — ${width}×${height}, ${(png.length / 1024).toFixed(1)} Ko`);
}

for (const [locale, dictionary] of Object.entries(DICTIONARIES)) {
    await rasterize(buildSvg(dictionary), `public/og-${locale}.png`, 1200, 630);
}

const ICONS = [
    { source: 'public/logo-mark.svg', output: 'public/icon-192.png', size: 192 },
    { source: 'public/logo-mark.svg', output: 'public/icon-512.png', size: 512 },
    { source: 'public/logo-mark-maskable.svg', output: 'public/icon-maskable-512.png', size: 512 },
    // Next sert automatiquement ce fichier en `apple-touch-icon` : iOS ignore
    // le SVG de favicon et n'accepte qu'un PNG.
    { source: 'public/logo-mark.svg', output: 'src/app/apple-icon.png', size: 180 },
];

for (const icon of ICONS) {
    await rasterize(await readFile(join(ROOT, icon.source)), icon.output, icon.size, icon.size);
}

// Le favicon lui-même reste vectoriel : Next le sert sur `/icon.svg` et tous
// les navigateurs modernes le préfèrent à un PNG, à n'importe quelle taille.
await writeFile(join(ROOT, 'src/app/icon.svg'), await readFile(join(ROOT, 'public/logo-mark.svg')));
console.log('src/app/icon.svg — copié depuis public/logo-mark.svg');
