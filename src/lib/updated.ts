import type { ContentKey, RouteKey } from '@/i18n/routes';

/**
 * Date de dernière modification de fond de chaque page.
 *
 * Écrite à la main, à côté du contenu qu'elle date. **Surtout pas une date de
 * construction** : elle changerait à chaque déploiement sans que rien n'ait
 * bougé, et Google finit par ignorer les `lastmod` qu'il juge peu fiables.
 *
 * Elle sert deux fois : le `<lastmod>` du plan du site pour toutes les pages,
 * et la mention affichée sur celles qui font foi.
 *
 * ⚠️ À modifier EN MÊME TEMPS que le texte de la page concernée. Une date qui
 * n'a pas suivi est pire que pas de date du tout.
 */
export const UPDATED: Record<RouteKey, string> = {
    home: '2026-08-20',
    about: '2026-08-20',
    legal: '2026-08-20',
    privacy: '2026-08-20',
};

/**
 * Les pages qui AFFICHENT leur date. Les mentions légales et la politique de
 * confidentialité font foi : un visiteur doit savoir quelle version il lit. La
 * page « à propos » et l'accueil, non — la date y serait du bruit.
 */
const SHOWN: ContentKey[] = ['legal', 'privacy'];

export function shownUpdate(key: ContentKey): string | undefined {
    return SHOWN.includes(key) ? UPDATED[key] : undefined;
}

/**
 * La date dans la langue du lecteur. `Intl` tourne à la CONSTRUCTION, jamais
 * dans le navigateur : le format est donc figé dans le HTML servi et ne peut
 * pas différer d'un visiteur à l'autre.
 */
export function formatUpdated(iso: string, locale: string): string {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(
        new Date(`${iso}T00:00:00Z`),
    );
}
