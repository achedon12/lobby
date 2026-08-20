import { DEFAULT_LOCALE, type Locale } from './config';

export type RouteKey = 'home' | 'about' | 'legal' | 'privacy';

/** Les pages de contenu : celles qui partagent la même mise en page textuelle. */
export const CONTENT_KEYS = ['about', 'legal', 'privacy'] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

// Les SLUGS sont traduits, pas seulement les préfixes de langue : `/a-propos/`
// et `/en/about/`. Un mot-clé dans l'URL, dans la langue du visiteur, vaut
// mieux qu'un chemin anglais uniforme — et c'est gratuit sur un site statique.
//
// ⚠️ Toute URL interne DOIT passer par `path()`. Écrire `/en/about/` en dur
// casse silencieusement les hreflang, le sitemap et le sélecteur de langue,
// qui sont tous construits à partir de cette table.
//
// ⚠️ Le nom du dossier de route français DOIT être identique au slug `fr` :
// `app/(default)/mentions-legales/` ↔ `legal.fr`. Rien ne le vérifie.
const SLUGS: Record<RouteKey, Record<Locale, string>> = {
    home: { fr: '', en: '', es: '', de: '' },
    about: { fr: 'a-propos', en: 'about', es: 'acerca-de', de: 'ueber-uns' },
    legal: {
        fr: 'mentions-legales',
        en: 'legal-notice',
        es: 'aviso-legal',
        de: 'impressum',
    },
    privacy: { fr: 'confidentialite', en: 'privacy', es: 'privacidad', de: 'datenschutz' },
};

export function path(key: RouteKey, locale: Locale): string {
    const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    const slug = SLUGS[key][locale];
    return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

export function url(key: RouteKey, locale: Locale, siteUrl: string): string {
    return `${siteUrl.replace(/\/$/, '')}${path(key, locale)}`;
}

/** Les couples (langue, slug) à générer sous `[locale]/[slug]`. */
export function contentParams(): { locale: Locale; slug: string }[] {
    return CONTENT_KEYS.flatMap((key) =>
        (Object.keys(SLUGS[key]) as Locale[])
            .filter((locale) => locale !== DEFAULT_LOCALE)
            .map((locale) => ({ locale, slug: SLUGS[key][locale] })),
    );
}

/** La clé de route correspondant à un slug, ou `null` si aucune. */
export function contentKeyForSlug(locale: Locale, slug: string): ContentKey | null {
    return CONTENT_KEYS.find((key) => SLUGS[key][locale] === slug) ?? null;
}

/** Tous les chemins sans barre finale, pour la conf nginx. Sert au contrôle. */
export function allPaths(): string[] {
    return (Object.keys(SLUGS) as RouteKey[]).flatMap((key) =>
        (Object.keys(SLUGS[key]) as Locale[]).map((locale) => path(key, locale)),
    );
}
