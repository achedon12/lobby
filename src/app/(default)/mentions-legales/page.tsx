import type { Metadata } from 'next';
import { PageChrome } from '@/components/PageChrome';
import { DEFAULT_LOCALE } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { TextPageView } from '@/views/TextPageView';

// ⚠️ Le nom du dossier EST le slug français : il doit rester identique à
// `SLUGS.legal.fr` dans `src/i18n/routes.ts`. Une divergence donne des liens
// internes vers une page inexistante, sans erreur de construction.
export const metadata: Metadata = buildMetadata(DEFAULT_LOCALE, 'legal');

export default function Page() {
    return (
        <PageChrome locale={DEFAULT_LOCALE} routeKey="legal">
            <TextPageView locale={DEFAULT_LOCALE} routeKey="legal" />
        </PageChrome>
    );
}
