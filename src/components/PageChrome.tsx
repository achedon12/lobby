import type { ReactNode } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import type { RouteKey } from '@/i18n/routes';
import { buildJsonLd } from '@/lib/seo';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function PageChrome({
    locale,
    routeKey,
    children,
}: {
    locale: Locale;
    routeKey: RouteKey;
    children: ReactNode;
}) {
    const dictionary = getDictionary(locale);

    return (
        <>
            {/* Premier élément focalisable de la page : sans lui, un utilisateur
                au clavier traverse l'en-tête entier à chaque visite. */}
            <a
                href="#contenu"
                className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-contrast"
            >
                {dictionary.header.skipToContent}
            </a>

            <SiteHeader locale={locale} routeKey={routeKey} dictionary={dictionary} />
            <main id="contenu" className="flex flex-1 flex-col justify-center">
                {children}
            </main>
            <SiteFooter locale={locale} dictionary={dictionary} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: buildJsonLd(locale, routeKey) }}
            />
        </>
    );
}
