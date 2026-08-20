import Link from 'next/link';
import type { Dictionary } from '@/i18n';
import { LOCALES, LOCALE_NAMES, LOCALE_SHORT, type Locale } from '@/i18n/config';
import { path, type RouteKey } from '@/i18n/routes';

// Des liens, pas un menu déroulant : chaque langue doit être une URL qu'un
// robot peut suivre et qu'un visiteur peut mettre en favori. Un sélecteur en
// JavaScript rendrait les autres langues invisibles à l'indexation, ce qui
// annulerait l'intérêt des `hreflang`.
//
// Chaque lien vise la MÊME page dans l'autre langue, slug traduit compris —
// d'où `routeKey`. Renvoyer vers l'accueil ferait perdre sa place au visiteur.
export function LocaleSwitcher({
    locale,
    routeKey,
    dictionary,
}: {
    locale: Locale;
    routeKey: RouteKey;
    dictionary: Dictionary;
}) {
    return (
        <nav aria-label={dictionary.header.languageLabel}>
            <ul className="flex items-center gap-0.5 rounded-full bg-bg-sunken p-0.5">
                {LOCALES.map((candidate) => {
                    const active = candidate === locale;
                    return (
                        <li key={candidate}>
                            <Link
                                href={path(routeKey, candidate)}
                                hrefLang={candidate}
                                lang={candidate}
                                aria-current={active ? 'true' : undefined}
                                title={LOCALE_NAMES[candidate]}
                                className={`flex h-8 items-center rounded-full px-2.5 text-xs font-semibold tracking-wide transition-colors ${
                                    active
                                        ? 'bg-accent text-accent-contrast'
                                        : 'text-fg-muted hover:bg-bg-elevated hover:text-fg'
                                }`}
                            >
                                <span aria-hidden="true">{LOCALE_SHORT[candidate]}</span>
                                <span className="sr-only">{LOCALE_NAMES[candidate]}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
