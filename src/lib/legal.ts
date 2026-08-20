import type { ContentKey } from '@/i18n/routes';

/**
 * Date de dernière mise à jour des pages qui en ont besoin.
 *
 * Écrite à la main, à côté du texte qu'elle date. **Surtout pas une date de
 * construction** : elle changerait à chaque déploiement et ne dirait plus rien
 * — or c'est précisément ce qu'un visiteur cherche à savoir, et ce qu'un
 * éditeur doit pouvoir démontrer.
 *
 * ⚠️ À modifier EN MÊME TEMPS que le texte des pages concernées. Une date qui
 * n'a pas suivi est pire que pas de date du tout.
 */
export const UPDATED: Partial<Record<ContentKey, string>> = {
    legal: '2026-08-20',
    privacy: '2026-08-20',
};

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
