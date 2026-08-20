import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AuthorLink } from '@/components/AuthorLink';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { format } from '@/i18n/format';
import { path, type ContentKey } from '@/i18n/routes';
import { UPDATED, formatUpdated } from '@/lib/legal';
import { AUTHOR, HOST, TO_FILL } from '@/lib/site';

// Une seule vue pour « à propos », « mentions légales » et « confidentialité » :
// les trois ont la même forme — un titre, une accroche, des sections, un
// contact. Trois composants jumeaux auraient dérivé au premier ajustement.
export function TextPageView({ locale, routeKey }: { locale: Locale; routeKey: ContentKey }) {
    const dictionary = getDictionary(locale);
    const copy = dictionary[routeKey];
    const updated = UPDATED[routeKey];

    return (
        <article className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
            <h1 className="text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                {copy.heading}
            </h1>
            <p className="mt-3 text-lg text-fg-muted text-pretty">{copy.lede}</p>

            {/* Sous l'accroche et non en pied de page : c'est en ouvrant des
                mentions légales qu'on se demande quelle version on lit, pas
                après les avoir parcourues.

                `<time>` porte la date lisible par une machine ; le texte, lui,
                est formaté dans la langue de la page. */}
            {updated && (
                <p className="mt-4 text-sm text-fg-muted">
                    {dictionary.updatedLabel.split('{date}')[0]}
                    <time dateTime={updated} className="tabular-nums">
                        {formatUpdated(updated, locale)}
                    </time>
                    {dictionary.updatedLabel.split('{date}')[1]}
                </p>
            )}

            {/* Une liste de définitions, pas une suite de <section> : chaque bloc
                est un intitulé suivi de sa réponse, ce que <dl> décrit
                exactement. Les lecteurs d'écran annoncent alors la paire. */}
            <dl className="mt-10 flex flex-col gap-8">
                {copy.sections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-2">
                        <dt className="font-[family-name:var(--font-display)] text-xl font-semibold">
                            {section.title}
                        </dt>
                        <dd className="m-0 leading-relaxed text-fg-muted text-pretty">
                            {/* Les coordonnées de l'hébergeur sont exigées par
                                la LCEN. Vidées par erreur, elles laissent un
                                texte volontairement voyant plutôt qu'un blanc
                                qui passerait inaperçu. */}
                            {/* `format` d'abord pour les coordonnées de
                                l'hébergeur, `AuthorLink` ensuite pour le nom :
                                le premier produit une chaîne, le second du JSX,
                                l'ordre n'est donc pas interchangeable. */}
                            <AuthorLink
                                template={format(section.body, {
                                    host: HOST.name || TO_FILL,
                                    address: HOST.address || TO_FILL,
                                    phone: HOST.phone || TO_FILL,
                                    registration: HOST.registration || TO_FILL,
                                })}
                            />
                        </dd>
                    </div>
                ))}

                <div className="flex flex-col gap-2">
                    <dt className="font-[family-name:var(--font-display)] text-xl font-semibold">
                        {copy.contactTitle}
                    </dt>
                    <dd className="m-0 leading-relaxed text-fg-muted">
                        {copy.contactBody}{' '}
                        <a
                            href={`mailto:${AUTHOR.email}`}
                            className="font-medium text-accent underline-offset-4 hover:underline"
                        >
                            {AUTHOR.email}
                        </a>
                    </dd>
                </div>
            </dl>

            <Link
                href={path('home', locale)}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-contrast no-underline transition-transform duration-200 hover:-translate-y-0.5"
            >
                {copy.backHome}
                <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
        </article>
    );
}
