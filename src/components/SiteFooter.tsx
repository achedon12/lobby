import Link from 'next/link';
import type { Dictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { format } from '@/i18n/format';
import { path } from '@/i18n/routes';
import { APP_VERSION, AUTHOR } from '@/lib/site';
import { AuthorLink } from './AuthorLink';
import { BrandMark, BrandWordmark } from './BrandMark';

const linkClass =
    'text-sm text-fg-muted no-underline underline-offset-4 transition-colors hover:text-fg hover:underline';

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
    // Cinq liens en UNE ligne, et non deux colonnes de deux et trois. À ce
    // nombre-là, des colonnes titrées font sérieux sans rien ranger : elles
    // ajoutent deux intitulés à lire pour cinq destinations évidentes.
    const links = [
        { key: 'about', href: path('about', locale), label: dictionary.header.navAbout },
        { key: 'legal', href: path('legal', locale), label: dictionary.footer.navLegal },
        { key: 'privacy', href: path('privacy', locale), label: dictionary.footer.navPrivacy },
    ];

    return (
        <footer className="mt-auto border-t border-border-subtle bg-bg-sunken">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-9 sm:px-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2.5">
                            <BrandMark className="size-6 shrink-0" />
                            <BrandWordmark
                                brand={dictionary.header.brand}
                                className="text-[0.95rem]"
                            />
                        </div>
                        <p className="max-w-xs text-sm text-fg-muted text-pretty">
                            {dictionary.footer.rights}
                        </p>
                    </div>

                    <nav aria-label={dictionary.footer.siteHeading}>
                        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
                            {links.map((link) => (
                                <li key={link.key}>
                                    <Link href={link.href} className={linkClass}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a href={AUTHOR.github} rel="noopener" className={linkClass}>
                                    {dictionary.footer.github}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${AUTHOR.email}`} className={linkClass}>
                                    {dictionary.footer.contact}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle pt-5 text-xs text-fg-muted">
                    <span>
                        <AuthorLink template={dictionary.footer.madeBy} />
                    </span>
                    <span className="tabular-nums">
                        {format(dictionary.footer.versionLabel, { version: APP_VERSION })}
                    </span>
                </div>
            </div>
        </footer>
    );
}
