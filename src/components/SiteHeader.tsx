import Link from 'next/link';
import type { Dictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { path, type RouteKey } from '@/i18n/routes';
import { BrandMark, BrandWordmark } from './BrandMark';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader({
    locale,
    routeKey,
    dictionary,
}: {
    locale: Locale;
    routeKey: RouteKey;
    dictionary: Dictionary;
}) {
    return (
        // Un simple filet, sans fond ni flou : la barre translucide se voyait
        // plus que ce qu'elle contient, et elle coupait la page en deux au
        // repos. Ici l'en-tête ne se remarque qu'au moment où on la cherche.
        <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg/90 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-4 py-3 sm:px-6">
                <Link
                    href={path('home', locale)}
                    aria-current={routeKey === 'home' ? 'page' : undefined}
                    className="group flex shrink-0 items-center gap-2.5 text-fg no-underline"
                >
                    <BrandMark className="size-7 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5" />
                    {/* Sous 640 px, la signature se réduit à sa moitié utile :
                        « jeux ». Le domaine complet, les quatre langues et le
                        bouton de thème ne tiennent pas ensemble à 320 px — et
                        c'est le domaine qu'on peut se permettre de perdre. */}
                    <BrandWordmark
                        brand={dictionary.header.brand}
                        className="text-[0.95rem]"
                        tailClassName="hidden sm:inline"
                    />
                </Link>

                {/* Les contrôles pesaient plus que la marque : trois groupes,
                    sept objets cliquables, chacun dans sa pastille. Ils sont
                    maintenant nus et alignés sur une seule ligne, séparés par
                    un filet. Rien ne se replie sous 320 px. */}
                <div className="ml-auto flex items-center gap-3 sm:gap-4">
                    {/* Masquée sous 480 px : la page « à propos » reste
                        atteignable depuis le pied de page, présent partout. */}
                    <nav aria-label={dictionary.header.navLabel} className="hidden xs:block">
                        <Link
                            href={path('about', locale)}
                            aria-current={routeKey === 'about' ? 'page' : undefined}
                            className="text-sm text-fg-muted no-underline transition-colors hover:text-fg aria-[current=page]:font-medium aria-[current=page]:text-fg"
                        >
                            {dictionary.header.navAbout}
                        </Link>
                    </nav>

                    <span aria-hidden="true" className="hidden h-4 w-px bg-border-subtle xs:block" />

                    <LocaleSwitcher locale={locale} routeKey={routeKey} dictionary={dictionary} />

                    <ThemeToggle dictionary={dictionary} />
                </div>
            </div>
        </header>
    );
}
