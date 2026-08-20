import type { ReactNode } from 'react';
import { display, sans } from '@/fonts';
import type { Locale } from '@/i18n/config';
import { Matomo } from './Matomo';
import { ThemeScript } from './ThemeScript';

// Enveloppe <html>/<body>, et RIEN d'autre. L'en-tête et le pied de page ont
// besoin de savoir QUELLE page est rendue, pour que le sélecteur de langue
// pointe vers sa traduction et non vers l'accueil — or un layout Next ignore
// tout de la page qu'il enveloppe. C'est donc `PageChrome`, appelé par chaque
// page, qui porte le châssis.
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
    return (
        <html
            lang={locale}
            className={`${display.variable} ${sans.variable}`}
            suppressHydrationWarning
        >
            <body className="flex min-h-dvh flex-col antialiased">
                <ThemeScript />
                {children}
                <Matomo />
            </body>
        </html>
    );
}
