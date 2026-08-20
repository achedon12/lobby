import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { allPaths } from '../src/i18n/routes.ts';

// `trailingSlash: true` ne génère que `/en/about/`. Sans redirection, nginx
// sert la MÊME page sur `/en/about` via `try_files $uri/`, sans rien signaler :
// chaque page existerait à deux adresses, et les canoniques devraient rattraper
// le tir page par page.
//
// Ces redirections étaient écrites à la main, et la liste devait être tenue
// synchronisée avec `routes.ts` à chaque ajout de page ou de langue — un oubli
// silencieux garanti. Elle est maintenant DÉRIVÉE de la table des routes, à la
// construction. Ne pas modifier `nginx/redirects.conf` : il est régénéré.
const ROOT = join(import.meta.dirname, '..');

const lines = allPaths()
    // La racine `/` n'a pas de variante sans barre finale à rediriger.
    .filter((p) => p !== '/')
    .sort()
    .map((p) => `location = ${p.replace(/\/$/, '')} { return 301 ${p}; }`);

const content = `# FICHIER GÉNÉRÉ — ne pas modifier à la main.
# Produit par \`npm run nginx\` (lancé automatiquement avant \`npm run build\`)
# à partir de la table des routes de \`src/i18n/routes.ts\`.
${lines.join('\n')}
`;

await writeFile(join(ROOT, 'nginx/redirects.conf'), content);
console.log(`nginx/redirects.conf — ${lines.length} redirections`);
