import type { Metadata } from 'next';
import { GAMES } from '@/data/games';
import { getDictionary } from '@/i18n';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/i18n/config';
import { path, url, type RouteKey } from '@/i18n/routes';
import { AUTHOR, GOOGLE_SITE_VERIFICATION, SITE_URL } from './site';

// Codes complets exigés par Open Graph — `og:locale` refuse un code de langue
// nu comme « fr ». Les `hreflang`, eux, se contentent de la langue seule : y
// mettre un pays restreindrait la page aux visiteurs de ce pays précis, ce
// qu'on ne veut surtout pas pour un site sans variante régionale.
const OG_LOCALES: Record<Locale, string> = {
    fr: 'fr_FR',
    en: 'en_US',
    es: 'es_ES',
    de: 'de_DE',
};

// Une image par langue : le titre et l'accroche y sont écrits en dur, une
// carte de partage en français sous un lien anglais ferait fuir le clic.
// `npm run og` les régénère toutes les quatre depuis les dictionnaires.
const ogImage = (locale: Locale) =>
    ({ url: `/og-${locale}.png`, width: 1200, height: 630, type: 'image/png' }) as const;

function alternateLanguages(key: RouteKey): Record<string, string> {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
        languages[locale] = path(key, locale);
    }
    // `x-default` désigne la page servie à qui ne correspond à aucune langue
    // déclarée. Elle DOIT pointer vers une page réelle : la version française
    // fait l'affaire, une URL de redirection ferait perdre le signal.
    languages['x-default'] = path(key, DEFAULT_LOCALE);
    return languages;
}

export function buildMetadata(locale: Locale, key: RouteKey = 'home'): Metadata {
    const dictionary = getDictionary(locale);
    const copy = key === 'home' ? dictionary.meta : dictionary[key];

    return {
        metadataBase: new URL(SITE_URL),
        title: copy.titleTag,
        description: copy.description,
        keywords: dictionary.meta.keywords,
        applicationName: dictionary.meta.title,
        authors: [{ name: AUTHOR.name, url: AUTHOR.github }],
        creator: AUTHOR.name,
        publisher: AUTHOR.name,
        alternates: {
            canonical: path(key, locale),
            languages: alternateLanguages(key),
        },
        openGraph: {
            type: 'website',
            url: path(key, locale),
            siteName: dictionary.meta.title,
            title: copy.titleTag,
            description: copy.description,
            locale: OG_LOCALES[locale],
            alternateLocale: LOCALES.filter((other) => other !== locale).map(
                (other) => OG_LOCALES[other],
            ),
            images: [{ ...ogImage(locale), alt: dictionary.meta.ogAlt }],
        },
        twitter: {
            card: 'summary_large_image',
            title: copy.titleTag,
            description: copy.description,
            images: [{ url: ogImage(locale).url, alt: dictionary.meta.ogAlt }],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
        },
        formatDetection: { telephone: false, address: false, email: false },
        ...(GOOGLE_SITE_VERIFICATION
            ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
            : {}),
    };
}

// Un seul graphe par page : le `@id` du site est référencé par les autres
// entités, ce qui évite à Google de deviner qu'elles parlent du même site.
export function buildJsonLd(locale: Locale, key: RouteKey = 'home'): string {
    const dictionary = getDictionary(locale);
    const pageUrl = url(key, locale, SITE_URL);

    const author = {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: AUTHOR.name,
        url: SITE_URL,
        sameAs: [AUTHOR.github],
    };

    const website = {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}${path('home', locale)}`,
        name: dictionary.meta.title,
        description: dictionary.meta.description,
        inLanguage: locale,
        author,
        publisher: { '@id': `${SITE_URL}/#person` },
    };

    if (key !== 'home') {
        return JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
                website,
                {
                    // `AboutPage` pour « à propos », `WebPage` pour les pages
                    // légales : décrire un impressum comme une page « à propos »
                    // du site serait faux.
                    '@type': key === 'about' ? 'AboutPage' : 'WebPage',
                    '@id': `${pageUrl}#page`,
                    url: pageUrl,
                    name: dictionary[key].heading,
                    description: dictionary[key].description,
                    inLanguage: locale,
                    isPartOf: { '@id': `${SITE_URL}/#website` },
                    about: { '@id': `${SITE_URL}/#person` },
                },
            ],
        });
    }

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            website,
            {
                '@type': 'ItemList',
                '@id': `${pageUrl}#games`,
                name: dictionary.games.heading,
                numberOfItems: GAMES.length,
                itemListOrder: 'https://schema.org/ItemListOrderAscending',
                itemListElement: GAMES.map((game, index) => {
                    const copy = dictionary.games.items[game.id];
                    return {
                        '@type': 'ListItem',
                        position: index + 1,
                        item: {
                            '@type': 'VideoGame',
                            name: copy.name,
                            description: copy.description,
                            url: game.url,
                            inLanguage: locale,
                            author,
                            gamePlatform: 'Web browser',
                            applicationCategory: 'GameApplication',
                            operatingSystem: 'Any',
                            // Le prix zéro doit être déclaré : sans `offers`, un
                            // jeu gratuit n'est pas signalé comme tel.
                            offers: {
                                '@type': 'Offer',
                                price: 0,
                                priceCurrency: 'EUR',
                                availability: 'https://schema.org/InStock',
                            },
                        },
                    };
                }),
            },
        ],
    });
}
