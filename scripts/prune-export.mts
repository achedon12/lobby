import { readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

// Next produit TROIS matérialisations de la page « introuvable » :
// `out/404.html`, `out/404/index.html` et `out/_not-found/index.html`. nginx
// n'utilise que la première, via `error_page`. Les deux autres sont servies
// normalement, en **200** — donc indexables : un moteur pouvait référencer
// « Page introuvable » comme une page ordinaire du site.
//
// Les supprimer vaut mieux qu'une règle nginx : un fichier absent ne peut pas
// être servi par erreur, et la protection suit l'export où qu'il aille.
const ROOT = join(import.meta.dirname, '..');

const DUPLICATES = ['out/404', 'out/_not-found'];

for (const path of DUPLICATES) {
    const target = join(ROOT, path);
    try {
        await stat(target);
    } catch {
        continue;
    }
    await rm(target, { recursive: true, force: true });
    console.log(`${path} — supprimé (doublon indexable de 404.html)`);
}

// ── Feuille de style du plan du site ────────────────────────────────────────
// `MetadataRoute.Sitemap` de Next produit le XML lui-même et n'offre aucun
// moyen d'y insérer une instruction de traitement. Elle est donc ajoutée ici,
// juste après la déclaration XML — la seule place que la spécification
// autorise.
//
// Réécrire le plan à la main pour gagner cette ligne aurait signifié
// re-sérialiser les alternatives de langue soi-même, pour un gain nul.
//
// Aucun effet sur les moteurs : tout ce qui lit du XML ignore cette
// instruction. Elle ne sert qu'aux navigateurs, qui affichent sinon un arbre
// brut — ou proposent de télécharger le fichier.
const SITEMAP = join(ROOT, 'out/sitemap.xml');
const STYLESHEET = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';

try {
    const xml = await readFile(SITEMAP, 'utf8');
    if (!xml.includes('xml-stylesheet')) {
        await writeFile(SITEMAP, xml.replace(/(<\?xml[^>]*\?>)/, `$1\n${STYLESHEET}`));
        console.log('out/sitemap.xml — feuille de style déclarée');
    }
} catch {
    // Pas de plan du site : rien à styler, rien à signaler.
}
