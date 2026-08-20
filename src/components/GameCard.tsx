import type { Game } from '@/data/games';
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

            {/* Le nom et une ligne, rien d'autre. La description complète vit
                dans le JSON-LD : elle sert aux moteurs, pas au visiteur, qui a
                déjà l'illustration sous les yeux. */}
            {/* Filet à la couleur du jeu entre l'image et le texte : il relie
                les deux moitiés de la tuile, que la vignette sombre et le
                panneau clair sépareraient sinon nettement. */}
            <span aria-hidden="true" className="h-1 w-full bg-[var(--card-accent)]" />

            <div className="flex flex-col gap-0.5 bg-[var(--card-accent-soft)]/40 px-4 py-3.5">
                <h3 className="text-lg leading-tight font-semibold">
                    <a
                        href={game.url}
                        className="card-link text-fg no-underline outline-none group-hover:text-[var(--card-accent)]"
                    >
                        {copy.name}
                    </a>
                </h3>
                <p className="text-[0.7rem] font-bold tracking-wide text-fg-muted uppercase">
                    {copy.tagline}
                </p>
            </div>
        </article>
    );
}
