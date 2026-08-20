import localFont from 'next/font/local';

// Fontes AUTO-HÉBERGÉES, et non chargées depuis Google Fonts. Deux raisons :
// la CSP du site n'autorise `font-src` que sur `'self'`, et un hôte tiers
// ajouterait une résolution DNS bloquante avant le premier texte affiché.
//
// Les .woff2 viennent de @fontsource-variable, installé en dépendance de
// développement puis recopié ici par `npm run fonts`. Les licences OFL les
// accompagnent dans ce dossier, comme la licence l'exige.
//
// Un seul fichier par famille : ce sont des fontes VARIABLES, une graisse de
// plus ne coûte donc aucun octet supplémentaire. Le sous-ensemble `latin`
// suffit — les accents du français, de l'espagnol et de l'allemand y sont tous.

export const display = localFont({
    src: './fredoka-latin-wght-normal.woff2',
    // Suffixe `-local` OBLIGATOIRE : `--font-sans` est déjà un jeton de thème
    // Tailwind, et lui réaffecter sa propre valeur dans @theme produirait une
    // référence circulaire que le navigateur résout en… rien.
    variable: '--font-display-local',
    weight: '300 700',
    // Mesuré : `optional` ne gagne rien sur le LCP ici, et priverait une
    // première visite lente de la fonte d'affichage — qui EST l'identité.
    display: 'swap',
    fallback: ['ui-rounded', 'Segoe UI', 'system-ui', 'sans-serif'],
});

export const sans = localFont({
    src: './outfit-latin-wght-normal.woff2',
    variable: '--font-sans-local',
    weight: '100 900',
    display: 'swap',
    fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});
