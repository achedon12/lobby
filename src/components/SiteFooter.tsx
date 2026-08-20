import Link from 'next/link';
import { Mail } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { format } from '@/i18n/format';
import { path } from '@/i18n/routes';
import { APP_VERSION, AUTHOR } from '@/lib/site';
import { BrandMark, BrandWordmark } from './BrandMark';
import { GithubMark } from './GithubMark';

const linkClass =
    'inline-flex items-center gap-1.5 text-sm text-fg-muted no-underline underline-offset-4 hover:text-fg hover:underline';

const headingClass = 'text-xs font-bold tracking-[0.12em] text-fg-muted uppercase';

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
    return (
        <footer className="mt-auto border-t-2 border-border-strong bg-bg-sunken">
            <div className="mx-auto grid w-full max-w-4xl gap-8 px-4 py-10 sm:grid-cols-[1.6fr_1fr_1fr] sm:px-6">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5">
                        <BrandMark className="size-7 shrink-0" />
                        <BrandWordmark brand={dictionary.header.brand} className="text-base" />
                    </div>
                    <p className="max-w-xs text-sm text-fg-muted text-pretty">
                        {dictionary.footer.rights}
                    </p>
                </div>

                {/* Les pages légales sont dans le pied de page, et pas ailleurs :
                    c'est là qu'on les cherche, et c'est le seul endroit qui les
                    rend accessibles depuis TOUTES les pages — ce que la loi
                    attend d'elles. */}
                <nav aria-labelledby="pied-site" className="flex flex-col gap-2">
                    <h2 id="pied-site" className={headingClass}>
                        {dictionary.footer.siteHeading}
                    </h2>
                    <Link href={path('about', locale)} className={linkClass}>
                        {dictionary.header.navAbout}
                    </Link>
                    <Link href={path('legal', locale)} className={linkClass}>
                        {dictionary.footer.navLegal}
                    </Link>
                    <Link href={path('privacy', locale)} className={linkClass}>
                        {dictionary.footer.navPrivacy}
                    </Link>
                </nav>

                <nav aria-labelledby="pied-ailleurs" className="flex flex-col gap-2">
                    <h2 id="pied-ailleurs" className={headingClass}>
                        {dictionary.footer.elsewhereHeading}
                    </h2>
                    <a href={AUTHOR.github} rel="noopener" className={linkClass}>
                        <GithubMark className="size-4" />
                        {dictionary.footer.github}
                    </a>
                    <a href={`mailto:${AUTHOR.email}`} className={linkClass}>
                        <Mail aria-hidden="true" className="size-4" />
                        {dictionary.footer.contact}
                    </a>
                </nav>
            </div>

            <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-2 border-t border-border-subtle px-4 py-4 text-xs text-fg-muted sm:px-6">
                <span>{dictionary.footer.madeBy}</span>
                <span className="tabular-nums">
                    {format(dictionary.footer.versionLabel, { version: APP_VERSION })}
                </span>
            </div>
        </footer>
    );
}
