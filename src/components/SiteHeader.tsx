import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { path, type RouteKey } from '@/i18n/routes';
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
        <header className="sticky top-0 z-50 border-b-2 border-border-strong bg-bg/80 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 sm:px-6">
                {/* Le nom du site EST son adresse : ce n'est pas la page de
                    quelqu'un, c'est un panneau de jeux. La signature vit dans le
                    pied de page, là où la paternité a sa place. */}
                <Link
                    href={path('home', locale)}
                    aria-current={routeKey === 'home' ? 'page' : undefined}
                    className="group flex items-center gap-2.5 text-fg no-underline"
                >
                    <span
                        aria-hidden="true"
                        className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-contrast transition-transform duration-200 group-hover:-rotate-6"
                    >
                        <Gamepad2 className="size-[1.1rem]" strokeWidth={2.2} />
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight sm:text-lg">
                        {dictionary.header.brand}
                    </span>
                </Link>

                {/* `ml-auto` plutôt qu'un `justify-between` : quand la ligne
                    passe en deux rangées sous 420 px, les contrôles se calent à
                    gauche au lieu de s'étirer bizarrement sur toute la largeur. */}
                <nav
                    aria-label={dictionary.header.navLabel}
                    className="ml-auto flex items-center gap-1"
                >
                    <Link
                        href={path('about', locale)}
                        aria-current={routeKey === 'about' ? 'page' : undefined}
                        className="rounded-full px-3 py-1.5 text-sm font-medium text-fg-muted no-underline transition-colors hover:bg-bg-sunken hover:text-fg aria-[current=page]:bg-bg-sunken aria-[current=page]:text-fg"
                    >
                        {dictionary.header.navAbout}
                    </Link>
                </nav>

                <div className="flex items-center gap-1.5">
                    <LocaleSwitcher locale={locale} routeKey={routeKey} dictionary={dictionary} />
                    <ThemeToggle dictionary={dictionary} />
                </div>
            </div>
        </header>
    );
}
