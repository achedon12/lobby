// La barre finale est retirée une fois pour toutes : toutes les URL du site
// sont construites en concaténant un chemin qui commence déjà par `/`, et un
// double slash dans une canonique la fait pointer ailleurs.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jeux.leoderoin.fr').replace(
    /\/$/,
    '',
);

export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? '0.0.0';

export const AUTHOR = {
    name: 'Léo Deroin',
    // Le site personnel de l'auteur, distinct de ce panneau : c'est vers lui
    // que pointe son nom, partout où il est écrit.
    site: 'https://leoderoin.fr',
    github: 'https://github.com/achedon12',
    email: 'contact@leoderoin.fr',
} as const;

export const MATOMO = {
    url: process.env.NEXT_PUBLIC_MATOMO_URL ?? '',
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? '',
} as const;

// Jeton de propriété Google Search Console. Ce n'est pas un secret : il ne
// prouve la propriété qu'en étant affiché sur le site, et il est donc public
// par construction — le versionner évite d'avoir à le reposer sur le serveur
// à chaque reconstruction.
//
// Vide, aucune balise n'est émise : une balise de vérification fausse ou vide
// fait échouer la validation sans rien dire.
//
// ⚠️ `||` et non `??` : Next charge le `.env` du projet, où une variable peut
// être PRÉSENTE MAIS VIDE. `??` ne bascule que sur `undefined` — la balise
// n'était pas émise alors que le jeton était bien dans le code. Avec `||`,
// « absente » et « vide » se valent, et la valeur ci-dessous fait foi.
export const GOOGLE_SITE_VERIFICATION =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    'WFDl8y1b2cLJG4AJlRVOx0afnb8L08OXC3VhI6l8XYU';

// La LCEN impose de nommer l'hébergeur du site dans les mentions légales, avec
// son ADRESSE et son TÉLÉPHONE — le nom seul ne suffit pas.
//
// Valeurs relevées le 20 août 2026 sur les mentions légales de LordHosting,
// puis recoupées avec le registre officiel (recherche-entreprises.api.gouv.fr,
// SIREN 105383988) : siège, forme, activité et dirigeant concordent.
//
// ⚠️ NE PAS reprendre le PDF « LORDHOSTING ASSOCIATION » qui traîne encore en
// ligne (SIRET 893 302 760 000 10, Vitry-sur-Seine). Il date de 2022 et
// désigne l'ANCIENNE structure : l'hébergeur est une SASU immatriculée en mai
// 2026 à Paris. Les deux entités existent toujours au registre, et c'est
// exactement le genre d'erreur qu'on ne voit jamais.
//
// `||` partout, même raison : une variable présente mais vide dans le `.env`
// ferait afficher « — à renseigner — » sur des mentions légales alors que la
// valeur juste est là, dans le code.
export const HOST = {
    name: process.env.NEXT_PUBLIC_HOST_NAME || 'LordHosting, SASU au capital de 1 000 €',
    address:
        process.env.NEXT_PUBLIC_HOST_ADDRESS || '5 square Frédéric Vallois, 75015 Paris, France',
    phone: process.env.NEXT_PUBLIC_HOST_PHONE || '06 01 21 24 27',
    registration: process.env.NEXT_PUBLIC_HOST_SIREN || '105 383 988 (RCS Paris)',
} as const;

export const TO_FILL = '— à renseigner —';
