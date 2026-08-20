import type { Metadata, Viewport } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { DEFAULT_LOCALE } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import '../globals.css';

// Métadonnées de l'accueil. Chaque page qui n'est pas l'accueil exporte les
// siennes, qui priment sur celles-ci.
export const metadata: Metadata = buildMetadata(DEFAULT_LOCALE, 'home');

export const viewport: Viewport = {
    // Deux entrées, pas une : le navigateur choisit selon le thème actif, et
    // c'est la couleur de la barre d'adresse sur mobile.
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#fdf8ec' },
        { media: '(prefers-color-scheme: dark)', color: '#0d0a16' },
    ],
    colorScheme: 'light dark',
};

export default function DefaultLocaleLayout({ children }: { children: React.ReactNode }) {
    return <SiteShell locale={DEFAULT_LOCALE}>{children}</SiteShell>;
}
