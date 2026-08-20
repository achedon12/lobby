import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BrandMark, BrandWordmark } from '@/components/BrandMark';
import { ThemeScript } from '@/components/ThemeScript';
import { display, sans } from '@/fonts';
import { getDictionary } from '@/i18n';
import { DEFAULT_LOCALE, LOCALES, LOCALE_NAMES } from '@/i18n/config';
import { path } from '@/i18n/routes';
import './globals.css';

// ⚠️ `global-not-found` et pas `(default)/not-found.tsx`. Le second N'EST PAS
// la page servie : avec deux layouts racine (les groupes `(default)` et
// `(prefixed)`), Next ne sait pas laquelle composer et retombe sur SA page
// d'erreur intégrée pour `out/404.html`. Le not-found de groupe n'était rendu
// que sous `/404/` et `/_not-found/`, deux adresses que personne n'atteint.
// C'est le cas que les docs de Next décrivent explicitement.
//
// Cette page CONTOURNE les layouts : elle doit donc importer elle-même les
// styles, les polices et le script de thème. Rien n'est hérité.
const dictionary = getDictionary(DEFAULT_LOCALE);

export const metadata: Metadata = {
    title: dictionary.notFound.title,
    description: dictionary.notFound.body,
    // Servie en 404, elle n'a rien à faire dans un index — et `noindex` la
    // protège aussi si elle se retrouvait un jour derrière un 200.
    robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
    // L'export statique ne produit qu'UNE page 404, servie pour toute adresse
    // inconnue, quelle que soit la langue demandée. Les quatre chemins de
    // retour sont donc la seule façon de la rendre utile à un visiteur
    // allemand — sans détection JavaScript, qui l'exclurait sans script.
    const returns = LOCALES.map((locale) => ({
        locale,
        name: LOCALE_NAMES[locale],
        label: getDictionary(locale).notFound.back,
        href: path('home', locale),
    }));

    return (
        <html
            lang={DEFAULT_LOCALE}
            className={`${display.variable} ${sans.variable}`}
            suppressHydrationWarning
        >
            <body className="flex min-h-dvh flex-col antialiased">
                <ThemeScript />

                <header className="border-b border-border-subtle">
                    <div className="mx-auto flex w-full max-w-2xl items-center px-4 py-3 sm:px-6">
                        <Link
                            href={path('home', DEFAULT_LOCALE)}
                            className="flex items-center gap-2.5 text-fg no-underline"
                        >
                            <BrandMark className="size-7 shrink-0" />
                            <BrandWordmark
                                brand={dictionary.header.brand}
                                className="text-[0.95rem]"
                            />
                        </Link>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:px-6 sm:py-20">
                    <p className="font-[family-name:var(--font-display)] text-5xl font-semibold text-fg-muted/50 tabular-nums">
                        404
                    </p>
                    <h1 className="mt-3 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                        {dictionary.notFound.title}
                    </h1>
                    <p className="mt-3 text-lg text-fg-muted text-pretty">
                        {dictionary.notFound.body}
                    </p>

                    <ul className="mt-10 flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
                        {returns.map((item) => (
                            <li key={item.locale}>
                                <Link
                                    href={item.href}
                                    hrefLang={item.locale}
                                    lang={item.locale}
                                    className="group flex items-center justify-between gap-4 py-3.5 no-underline"
                                >
                                    <span className="flex flex-col">
                                        <span className="text-xs font-bold tracking-[0.12em] text-fg-muted uppercase">
                                            {item.name}
                                        </span>
                                        <span className="text-fg">{item.label}</span>
                                    </span>
                                    <ArrowRight
                                        aria-hidden="true"
                                        className="size-4 shrink-0 text-fg-muted transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </main>
            </body>
        </html>
    );
}
