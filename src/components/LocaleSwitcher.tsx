import Link from 'next/link';
import type { Dictionary } from '@/i18n';
import { LOCALES, LOCALE_NAMES, LOCALE_SHORT, type Locale } from '@/i18n/config';
import { path, type RouteKey } from '@/i18n/routes';

// Des liens NUS, séparés par des points, plutôt que quatre pastilles. Une
// langue se change une fois par visite au plus : lui donner le poids visuel de
// quatre boutons faisait passer les contrôles devant la marque.
//
// Des liens, et pas un menu déroulant : chaque langue doit rester une URL qu'un
// robot peut suivre et qu'on peut mettre en favori. Un sélecteur en JavaScript
// rendrait les autres langues invisibles à l'indexation, ce qui annulerait
// l'intérêt des `hreflang`.
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
            <ul className="flex items-center gap-1 text-xs font-semibold tracking-wide">
                {LOCALES.map((candidate, index) => {
                    const active = candidate === locale;
                    return (
                        <li key={candidate} className="flex items-center gap-1">
                            {index > 0 && (
                                <span aria-hidden="true" className="text-border-strong">
                                    ·
                                </span>
                            )}
                            <Link
                                href={path(routeKey, candidate)}
                                hrefLang={candidate}
                                lang={candidate}
                                aria-current={active ? 'true' : undefined}
                                title={LOCALE_NAMES[candidate]}
                                className={`rounded px-0.5 no-underline transition-colors ${
                                    active ? 'text-fg' : 'text-fg-muted/70 hover:text-fg'
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
