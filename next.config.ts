import type { NextConfig } from 'next';
import { version } from './package.json';

const nextConfig: NextConfig = {
    // Version exposée au pied de page. Elle est lue ici, à la construction :
    // importer package.json depuis un composant embarquerait le fichier entier
    // — dépendances comprises — dans le bundle envoyé au navigateur.
    env: { NEXT_PUBLIC_APP_VERSION: version },

    // Le site est un annuaire : aucune donnée, aucune API, rien qui change
    // entre deux requêtes. `export` produit du HTML complet par langue, servi
    // tel quel par nginx — c'est ce qui rend le référencement irréprochable
    // sans qu'aucun processus Node ne tourne en production.
    //
    // ⚠️ Ce mode DÉSACTIVE `headers()` : Next ne sert plus les requêtes, il ne
    // peut donc plus poser d'en-tête. La CSP et les en-têtes de sécurité
    // vivent dans `nginx.conf`. Les ajouter ici ne produirait qu'un
    // avertissement de construction et aucun effet.
    output: 'export',

    // Sans ça l'export produit `/en.html`, que nginx ne sert pas sur `/en`
    // sans réécriture. Avec, il produit `/en/index.html` — servi nativement.
    // Les URL canoniques et le sitemap portent donc la barre finale, eux aussi.
    trailingSlash: true,

    poweredByHeader: false,

    // `next/image` est inutilisable en export statique sans optimiseur externe,
    // et les seules images du site sont des SVG de logo servis tels quels.
    images: { unoptimized: true },

    experimental: {
        // La feuille de style fait 6 Ko et bloque le premier rendu le temps
        // d'un aller-retour réseau complet. L'intégrer au HTML supprime cette
        // requête : mesuré par Lighthouse, c'est le principal poste du délai
        // de rendu du <h1>, qui est l'élément LCP de la page.
        inlineCss: true,
    },
};

export default nextConfig;
