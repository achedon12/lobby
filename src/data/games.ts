import type { GameKey } from '@/i18n';

export type GameStatus = 'live' | 'beta' | 'soon';

// Clé d'accent, pas une couleur : la valeur vit dans `globals.css`, où elle a
// une variante par thème. Un code hexadécimal posé ici serait juste dans un
// seul des trois états.
export type GameAccent = 'gold' | 'crimson' | 'azure';

// Clé d'icône, pas un composant : ce module est de la donnée pure et doit
// pouvoir être importé par le sitemap ou un script Node, qui ne savent rien de
// React. La correspondance se fait dans `components/GameIcon.tsx`.
export type GameIconKey = 'spade' | 'moon' | 'compass';

export type Game = {
    /** Doit exister dans `games.items` des dictionnaires : le type le garantit. */
    id: GameKey;
    url: string;
    status: GameStatus;
    accent: GameAccent;
    icon: GameIconKey;
    /** Sert au `datePublished` du JSON-LD. */
    year: number;
};

// L'ORDRE de ce tableau est celui de la page. Le plus récent d'abord serait
// arbitraire : c'est le plus abouti qui ouvre, puisque c'est celui qui a le
// plus de chances de retenir un visiteur venu d'un moteur de recherche.
export const GAMES: readonly Game[] = [
    {
        id: 'azimut',
        url: 'https://azimut.leoderoin.fr',
        status: 'live',
        accent: 'azure',
        icon: 'compass',
        year: 2026,
    },
    {
        id: 'push-your-luck',
        url: 'https://pushyourluck.net',
        status: 'live',
        accent: 'gold',
        icon: 'spade',
        year: 2026,
    },
    {
        id: 'loups-garous',
        url: 'https://loupsgarous.net',
        status: 'live',
        accent: 'crimson',
        icon: 'moon',
        year: 2025,
    },
];

export const LIVE_GAMES_COUNT = GAMES.filter((game) => game.status === 'live').length;

/**
 * Le domaine de destination, sans `www.`. Dérivé de `url` plutôt que saisi à
 * côté : deux champs à tenir d'accord finissent toujours par diverger, et
 * c'est l'affichage qui mentirait sur la destination réelle du lien.
 */
export function gameHost(game: Game): string {
    return new URL(game.url).hostname.replace(/^www\./, '');
}
