import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/config';
import { url, type RouteKey } from '@/i18n/routes';
import { SITE_URL } from '@/lib/site';
import { UPDATED } from '@/lib/updated';

// `output: 'export'` traite les gestionnaires de route comme dynamiques par
// défaut et refuse de construire. Cette ligne dit à Next de les évaluer une
// fois, à la construction, et d'écrire le fichier dans `out/`.
export const dynamic = 'force-static';

// Une entrée par langue ET par page. Les traductions sont donc toutes listées,
// chacune sous sa propre adresse.
//
// ⚠️ SANS `alternates`. Les déclarer ici ajoute des éléments `xhtml:link` au
// document, et Chrome DÉSACTIVE son visualiseur XML dès qu'un document contient
// l'espace de noms XHTML : le plan s'affichait en texte brut au lieu de l'arbre
// habituel.
//
// Rien n'est perdu pour autant : les `hreflang` sont déjà déclarés dans le
// `<head>` de chacune des seize pages, cinq par page, et Google accepte
// indifféremment ce canal ou celui du plan du site. Les mettre aux deux
// endroits était une redondance, pas une sécurité.
const PAGES: { key: RouteKey; priority: number }[] = [
    { key: 'home', priority: 1 },
    { key: 'about', priority: 0.5 },
    // Les pages légales sont indexables mais secondaires : une priorité basse
    // dit à un moteur de ne pas les faire remonter à la place de l'accueil.
    { key: 'legal', priority: 0.2 },
    { key: 'privacy', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return PAGES.flatMap(({ key, priority }) => {
        // `lastModified` vient de la table des dates de contenu, pas de
        // l'horloge de construction : une date qui bouge à chaque déploiement
        // sans qu'un mot ait changé finit par être ignorée par les moteurs.
        const lastModified = new Date(`${UPDATED[key]}T00:00:00Z`);

        return LOCALES.map((locale) => ({
            url: url(key, locale, SITE_URL),
            lastModified,
            changeFrequency: 'monthly' as const,
            priority,
        }));
    });
}
