import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/config';
import { path, url, type RouteKey } from '@/i18n/routes';
import { SITE_URL } from '@/lib/site';
import { UPDATED } from '@/lib/updated';

// `output: 'export'` traite les gestionnaires de route comme dynamiques par
// défaut et refuse de construire. Cette ligne dit à Next de les évaluer une
// fois, à la construction, et d'écrire le fichier dans `out/`.
export const dynamic = 'force-static';

// Une entrée par langue ET par page, chacune déclarant TOUTES les autres
// langues en alternative. Un sitemap qui n'en listerait qu'une laisserait les
// traductions à la merci d'un lien entrant — le sélecteur de langue seul ne
// suffit pas à les faire indexer.
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
        const languages = Object.fromEntries(
            LOCALES.map((locale) => [locale, `${SITE_URL}${path(key, locale)}`]),
        );

        // `lastModified` vient de la table des dates de contenu, pas de
        // l'horloge de construction : une date qui bouge à chaque déploiement
        // sans qu'un mot ait changé finit par être ignorée par les moteurs.
        const lastModified = new Date(`${UPDATED[key]}T00:00:00Z`);

        return LOCALES.map((locale) => ({
            url: url(key, locale, SITE_URL),
            lastModified,
            changeFrequency: 'monthly' as const,
            priority,
            alternates: { languages },
        }));
    });
}
