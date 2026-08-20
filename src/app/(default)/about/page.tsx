import type { Metadata } from 'next';
import { PageChrome } from '@/components/PageChrome';
import { DEFAULT_LOCALE } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { TextPageView } from '@/views/TextPageView';

// ⚠️ Le nom du dossier EST le slug français : il doit rester identique à
// `SLUGS.about.fr` dans `src/i18n/routes.ts`. Une divergence donne des liens
// internes vers une page inexistante, sans erreur de construction.
//
// Ici `about` et non `a-propos` : le français reprend le slug anglais pour
// cette page-là.
export const metadata: Metadata = buildMetadata(DEFAULT_LOCALE, 'about');

export default function Page() {
    return (
        <PageChrome locale={DEFAULT_LOCALE} routeKey="about">
            <TextPageView locale={DEFAULT_LOCALE} routeKey="about" />
        </PageChrome>
    );
}
