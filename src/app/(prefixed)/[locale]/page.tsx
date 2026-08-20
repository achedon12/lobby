import { notFound } from 'next/navigation';
import { PageChrome } from '@/components/PageChrome';
import { isLocale } from '@/i18n/config';
import { HomeView } from '@/views/HomeView';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    return (
        <PageChrome locale={locale} routeKey="home">
            <HomeView locale={locale} />
        </PageChrome>
    );
}
