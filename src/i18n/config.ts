export const LOCALES = ['fr', 'en', 'es', 'de'] as const;

export type Locale = (typeof LOCALES)[number];

// Le français n'est PAS préfixé : il vit sur `/`, les autres langues sur
// `/en/`, `/es/`, `/de/`. Même convention que pushyourluck.net, pour qu'un
// visiteur qui passe d'un site à l'autre retrouve la même forme d'URL.
export const DEFAULT_LOCALE: Locale = 'fr';

// Les seules langues à générer sous le segment `[locale]`. Y laisser le
// français créerait `/fr/`, un doublon exact de `/` que Google pénalise.
export const PREFIXED_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

export function isLocale(value: string): value is Locale {
    return (LOCALES as readonly string[]).includes(value);
}

// Chemin racine d'une langue, barre finale comprise — `trailingSlash: true`
// dans next.config.ts impose cette forme, et les canoniques doivent la suivre
// à la lettre sous peine de déclarer une URL que le serveur redirige.
export function localePath(locale: Locale): string {
    return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
}

export function localeUrl(locale: Locale, siteUrl: string): string {
    return `${siteUrl.replace(/\/$/, '')}${localePath(locale)}`;
}

// Endonymes : une langue se nomme toujours dans sa propre langue, sinon le
// sélecteur n'est lisible que par ceux qui n'en ont pas besoin.
export const LOCALE_NAMES: Record<Locale, string> = {
    fr: 'Français',
    en: 'English',
    es: 'Español',
    de: 'Deutsch',
};

// Étiquette courte du sélecteur en vue mobile, où le nom complet déborde.
export const LOCALE_SHORT: Record<Locale, string> = {
    fr: 'FR',
    en: 'EN',
    es: 'ES',
    de: 'DE',
};
