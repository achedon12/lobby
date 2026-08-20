import { rm, stat } from 'node:fs/promises';
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

