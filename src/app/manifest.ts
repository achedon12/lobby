import type { MetadataRoute } from 'next';
import { getDictionary } from '@/i18n';
import { DEFAULT_LOCALE } from '@/i18n/config';

// Un seul manifeste, en français : la spécification n'en prévoit qu'un par
// origine, et rien ne permet d'en servir une variante par langue en export
// statique. Le français est la langue par défaut du site.
// `output: 'export'` traite les gestionnaires de route comme dynamiques par
// défaut et refuse de construire. Cette ligne dit à Next de les évaluer une
// fois, à la construction, et d'écrire le fichier dans `out/`.
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    const dictionary = getDictionary(DEFAULT_LOCALE);

    return {
        name: dictionary.meta.title,
        short_name: dictionary.meta.shortName,
        description: dictionary.meta.description,
        lang: DEFAULT_LOCALE,
        start_url: '/',
        display: 'standalone',
        background_color: '#0c0b10',
        theme_color: '#6d4aff',
        icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
    };
}
