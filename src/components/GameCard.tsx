import { ArrowUpRight } from 'lucide-react';
import { gameHost, type Game } from '@/data/games';
import type { Dictionary } from '@/i18n';
import { GameArt } from './GameArt';

const STATUS_STYLE = {
    beta: 'text-[var(--card-accent)] bg-[var(--card-accent-soft)]',
    soon: 'text-fg-muted bg-bg-sunken',
} as const;

export function GameCard({
    game,
    dictionary,
    tilt,
}: {
    game: Game;
    dictionary: Dictionary;
    /** Inclinaison au repos, en degrés. Alternée par la vue, jamais tirée au sort. */
    tilt: number;
}) {
    const copy = dictionary.games.items[game.id];
    const host = gameHost(game);
    const destinationId = `destination-${game.id}`;

    // Un jeu en ligne ne porte AUCUN badge : c'est le cas normal, et l'annoncer
    // sur chaque tuile ne fait qu'ajouter du bruit. Seule une exception mérite
    // une étiquette.
    const exception =
        game.status === 'live'
            ? null
            : { label: game.status === 'beta' ? dictionary.games.statusBeta : dictionary.games.statusSoon, style: STATUS_STYLE[game.status] };

    return (
        <article
            data-accent={game.accent}
            style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
            className="tile group relative flex w-full flex-col overflow-hidden rounded-2xl border-2 border-border-strong bg-bg-elevated shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]"
        >
            <div className="relative aspect-[5/3] overflow-hidden bg-[#0c0918]">
                <div className="tile-art size-full">
                    <GameArt game={game.id} />
                </div>
                {exception && (
                    <span
                        className={`absolute top-2.5 right-2.5 z-[2] rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold ${exception.style}`}
                    >
                        {exception.label}
                    </span>
                )}
            </div>

            {/* Filet à la couleur du jeu entre l'image et le texte : il relie
                les deux moitiés de la tuile, que la vignette sombre et le
                panneau clair sépareraient sinon nettement. */}
            <span aria-hidden="true" className="h-1 w-full bg-[var(--card-accent)]" />

            {/* Le nom, une ligne de catégorie, la destination. La description
                complète vit dans le JSON-LD : elle sert aux moteurs, pas au
                visiteur, qui a déjà l'illustration sous les yeux. */}
            <div className="flex flex-col gap-0.5 bg-[var(--card-accent-soft)]/40 px-4 py-3.5">
                <h3 className="text-lg leading-tight font-semibold">
                    <a
                        href={game.url}
                        aria-describedby={destinationId}
                        className="card-link text-fg no-underline outline-none group-hover:text-[var(--card-accent)]"
                    >
                        {copy.name}
                    </a>
                </h3>
                {/* La seule action de la page emmène ailleurs, et rien ne le
                    disait. Le domaine l'annonce — une information, pas un
                    avertissement : il reste discret.

                    Rattaché en `aria-describedby` et non ajouté au nom
                    accessible : un lecteur d'écran annonce « Push Your Luck,
                    pushyourluck.net », et le nom continue de correspondre au
                    texte affiché. */}
                <p className="flex flex-wrap items-center justify-between gap-x-3 text-[0.7rem] font-bold tracking-wide text-fg-muted uppercase">
                    <span>{copy.tagline}</span>
                    <span
                        id={destinationId}
                        className="inline-flex items-center gap-0.5 tracking-normal normal-case text-fg-muted/80"
                    >
                        {host}
                        <ArrowUpRight aria-hidden="true" className="size-3" />
                    </span>
                </p>
            </div>
        </article>
    );
}
