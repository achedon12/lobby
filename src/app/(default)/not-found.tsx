import Link from 'next/link';
import { PageChrome } from '@/components/PageChrome';
import { getDictionary } from '@/i18n';
import { DEFAULT_LOCALE } from '@/i18n/config';
import { path } from '@/i18n/routes';

// La page 404 est rendue par la racine française : l'export la matérialise en
// `out/404.html`, que nginx sert pour toute adresse inconnue, quelle que soit
// la langue demandée.
export default function NotFound() {
    const dictionary = getDictionary(DEFAULT_LOCALE);

    return (
        <PageChrome locale={DEFAULT_LOCALE} routeKey="home">
            <section className="mx-auto flex w-full max-w-2xl flex-col items-start gap-4 px-4 py-20 sm:px-6">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {dictionary.notFound.title}
                </h1>
                <p className="text-fg-muted">{dictionary.notFound.body}</p>
                <Link
                    href={path('home', DEFAULT_LOCALE)}
                    className="mt-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-contrast no-underline"
                >
                    {dictionary.notFound.back}
                </Link>
            </section>
        </PageChrome>
    );
}
