import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// `output: 'export'` traite les gestionnaires de route comme dynamiques par
// défaut et refuse de construire. Cette ligne dit à Next de les évaluer une
// fois, à la construction, et d'écrire le fichier dans `out/`.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: '*', allow: '/' },
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
