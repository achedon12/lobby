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
                                // Pas de `title` : il répétait mot pour mot le
                                // texte `sr-only` ci-dessous, et un lecteur
                                // d'écran annonçait « Français, Français ». Le
                                // `sr-only` est celui des deux qui porte le nom
                                // accessible, c'est donc lui qui reste.
                                // La cible utile faisait ~20 px de haut : lisible
                                // à la souris, hasardeuse au pouce, et sous les
                                // 24 px de la règle WCAG 2.2. Elle est élargie
                                // par du remplissage, PAS par la taille du
                                // texte — grossir les codes de langue aurait
                                // redonné aux contrôles le poids qu'on venait
                                // de leur retirer.
                                //
                                // Les marges négatives compensent : la hauteur
                                // de l'en-tête ne bouge pas d'un pixel.
                                className={`-my-1.5 rounded px-1.5 py-1.5 transition-colors ${
                                    // ⚠️ La langue active portait la SEULE
                                    // distinction de couleur — encre contre
                                    // gris. Invisible à un daltonien ou sur un
                                    // écran peu contrasté, et contraire au
                                    // critère WCAG 1.4.1. Le soulignement est
                                    // le second signal, non coloré.
                                    //
                                    // Réservé à l'état actif : les liens
                                    // inactifs restent sans soulignement, y
                                    // compris au survol, sinon le repère
                                    // « vous êtes ici » se confondrait avec un
                                    // simple survol.
                                    active
                                        ? 'text-fg underline decoration-2 underline-offset-4'
                                        : 'text-fg-muted/70 no-underline hover:text-fg'
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
