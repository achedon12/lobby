import { GameCard } from '@/components/GameCard';
import { GAMES, LIVE_GAMES_COUNT } from '@/data/games';
import { getDictionary } from '@/i18n';
import { format } from '@/i18n/format';
import type { Locale } from '@/i18n/config';

// Inclinaisons au repos, alternées. Une valeur aléatoire changerait à chaque
// construction et ferait bouger les captures de référence sans raison.
const TILTS = [-0.7, 0.7];

export function HomeView({ locale }: { locale: Locale }) {
    const dictionary = getDictionary(locale);

    return (
        <>
            {/* En-tête de page volontairement COURT : sur un annuaire, chaque
                ligne de texte avant la grille repousse les jeux hors de l'écran,
                et ce sont eux qu'on vient voir. */}
            <section className="mx-auto w-full max-w-4xl px-4 pt-10 pb-7 text-center sm:px-6 sm:pt-14 sm:pb-9">
                <h1 className="text-2xl leading-tight font-semibold text-balance sm:text-3xl">
                    {dictionary.hero.title}
                </h1>
                <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm text-fg-muted">
                    <span>{dictionary.hero.tagline}</span>
                    <span aria-hidden="true" className="text-border-strong">
                        ·
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full bg-[var(--status-live)]"
                        />
                        {format(dictionary.hero.countLabel, { count: LIVE_GAMES_COUNT })}
                    </span>
                </p>
            </section>

            <section
                aria-labelledby="titre-jeux"
                className="mx-auto w-full max-w-4xl px-4 pb-14 sm:px-6 sm:pb-20"
            >
                <h2 id="titre-jeux" className="sr-only">
                    {dictionary.games.heading}
                </h2>

                {/* `auto-fit` avec des pistes bornées, et non un nombre fixe de
                    colonnes : à deux jeux une grille en trois colonnes laisse un
                    trou béant à droite, et à quatre jeux une grille en deux
                    colonnes serait à l'étroit. Ici les tuiles gardent leur
                    taille et restent centrées, quel que soit leur nombre. */}
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(15rem,22rem))] justify-center gap-5 sm:gap-6">
                    {GAMES.map((game, index) => (
                        <li key={game.id} className="flex">
                            <GameCard
                                game={game}
                                dictionary={dictionary}
                                tilt={TILTS[index % TILTS.length] ?? 0}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
