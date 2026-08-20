import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageChrome } from '@/components/PageChrome';
import { isLocale } from '@/i18n/config';
import { contentKeyForSlug, contentParams } from '@/i18n/routes';
import { buildMetadata } from '@/lib/seo';
import { TextPageView } from '@/views/TextPageView';

// Segment dynamique plutôt qu'un dossier par langue et par page : les slugs
// sont TRADUITS (`/en/about/`, `/es/aviso-legal/`, `/de/datenschutz/`), et
// `routes.ts` en est la seule source. Douze dossiers figés devraient être
// tenus synchronisés à la main avec la table des routes.
export function generateStaticParams() {
    return contentParams();
}

export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    if (!isLocale(locale)) notFound();
    const key = contentKeyForSlug(locale, slug);
    if (!key) notFound();
    return buildMetadata(locale, key);
}

export default async function Page({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    if (!isLocale(locale)) notFound();
    const key = contentKeyForSlug(locale, slug);
    if (!key) notFound();

    return (
        <PageChrome locale={locale} routeKey={key}>
            <TextPageView locale={locale} routeKey={key} />
        </PageChrome>
    );
}
