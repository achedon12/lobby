// Dictionnaire de RÉFÉRENCE. Les autres langues sont typées d'après lui :
// ajouter une clé ici et l'oublier ailleurs casse `npm run typecheck`, et
// c'est le seul filet qui empêche une page à moitié traduite d'atteindre la
// production.
export const fr = {
    meta: {
        title: 'Jeux en ligne gratuits',
        titleTag: 'Jeux en ligne gratuits, jouables dans le navigateur',
        description:
            'Push Your Luck et Loups-Garous : des jeux gratuits, sans inscription, jouables directement dans le navigateur. Rien à installer.',
        shortName: 'Jeux',
        ogAlt: 'Jeux en ligne gratuits — Push Your Luck et Loups-Garous',
        keywords:
            'jeux en ligne, jeu navigateur, jeu gratuit, jeu de cartes, loup-garou en ligne, Léo Deroin',
    },
    header: {
        skipToContent: 'Aller au contenu',
        brand: 'jeux.leoderoin.fr',
        navLabel: 'Navigation',
        navAbout: 'À propos',
        languageLabel: 'Langue',
        themeLabel: 'Thème',
        themeSystem: 'Système',
        themeLight: 'Clair',
        themeDark: 'Sombre',
    },
    hero: {
        eyebrow: 'Annuaire',
        title: 'Jeux en ligne gratuits',
        tagline: 'Deux jeux, jouables tout de suite dans le navigateur.',
        countLabel: '{count} jeux en ligne',
    },
    games: {
        heading: 'Les jeux',
        statusBeta: 'En bêta',
        statusSoon: 'Bientôt',
        items: {
            'push-your-luck': {
                name: 'Push Your Luck',
                tagline: 'Jeu de cartes solo',
                // Affichée nulle part : elle alimente le JSON-LD, qui décrit
                // chaque jeu aux moteurs. La tuile, elle, montre l'illustration.
                description:
                    'Tirez des cartes pour gonfler le pot : cinq bombes sont dans le paquet. Encaissez trop tôt et vous laissez des points sur la table ; encaissez trop tard et vous perdez tout. La partie du jour est la même pour tout le monde, avec un classement quotidien et aucune inscription.',
            },
            'loups-garous': {
                name: 'Loups-Garous',
                tagline: 'Jeu de société en temps réel',
                description:
                    'Le Loup-Garou en ligne, avec vos amis, en français. Progression, cosmétiques, clans et classement ELO, plus un bot Discord compagnon pour lancer les parties directement depuis votre serveur.',
            },
        },
    },
    about: {
        title: 'À propos',
        titleTag: 'À propos du site — jeux.leoderoin.fr',
        description:
            'Ce que fait ce site, comment il est construit, et qui l’a fait. Un panneau d’entrée vers des jeux jouables dans le navigateur.',
        heading: 'À propos de ce site',
        lede: 'Un panneau minuscule, qui ne fait qu’une chose : conduire vers les jeux.',
        sections: [
            {
                title: 'Ce que c’est',
                body: 'Une page d’entrée, et rien d’autre. Ce site n’héberge aucun jeu : chacun vit sur son propre domaine, avec sa communauté et son rythme de mises à jour. Ce qui est ici, c’est un lien unique à partager — un lien qui restera valable le jour où un nouveau jeu s’ajoutera.',
            },
            {
                title: 'Comment il est fait',
                body: 'Entièrement statique : le HTML est écrit à la construction et servi tel quel, sans base de données ni serveur applicatif. Quatre langues, avec des adresses traduites. Les illustrations sont des SVG dessinés à la main et intégrés à la page, donc aucune image à télécharger.',
            },
            {
                title: 'Ce qu’il ne collecte pas',
                body: 'Aucune publicité, aucun traqueur tiers, aucun réseau social embarqué, aucun cookie de mesure. Le détail est sur la page de confidentialité.',
            },
            {
                title: 'Qui l’a fait',
                body: 'Léo Deroin, développeur. Le site est écrit, hébergé et maintenu par une seule personne.',
            },
        ],
        contactTitle: 'Écrire',
        contactBody: 'Une remarque, un lien cassé, un jeu à ajouter :',
        backHome: 'Voir les jeux',
    },
    legal: {
        title: 'Mentions légales',
        titleTag: 'Mentions légales — jeux.leoderoin.fr',
        description:
            'Éditeur, hébergeur et conditions d’utilisation du site jeux.leoderoin.fr.',
        heading: 'Mentions légales',
        lede: 'Les informations exigées par la loi pour un site accessible au public.',
        sections: [
            {
                title: 'Éditeur',
                body: 'Le site jeux.leoderoin.fr est édité par Léo Deroin, à titre personnel et non commercial. Le directeur de la publication est l’éditeur lui-même.',
            },
            {
                title: 'Hébergeur',
                body: 'Le site est hébergé par {host}, {address}. Téléphone : {phone}. SIREN {registration}.',
            },
            {
                title: 'Contenu',
                body: 'Les textes et les illustrations de ce site sont l’œuvre de son éditeur. Les noms Push Your Luck et Loups-Garous désignent des jeux édités par la même personne, sur leurs propres domaines et sous leurs propres conditions.',
            },
            {
                title: 'Liens sortants',
                body: 'Ce site ne renvoie que vers pushyourluck.net, loupsgarous.net et le dépôt public de son auteur. Il n’affiche aucune publicité et ne comporte aucun lien commercial ni affilié.',
            },
        ],
        contactTitle: 'Contact',
        contactBody: 'Pour toute question relative à ces mentions :',
        backHome: 'Voir les jeux',
    },
    privacy: {
        title: 'Confidentialité',
        titleTag: 'Confidentialité — jeux.leoderoin.fr',
        description:
            'Ce qui est mesuré sur ce site, ce qui ne l’est pas, et ce qui est stocké dans votre navigateur. Aucun traqueur tiers, aucun cookie de mesure.',
        heading: 'Confidentialité',
        lede: 'Ce qui est mesuré, ce qui ne l’est pas, et où ça reste.',
        sections: [
            {
                title: 'Mesure d’audience',
                body: 'Le site utilise Matomo, installé sur le même serveur que lui. Sont enregistrés les pages consultées, la langue du navigateur, le type d’appareil et la page de provenance. Aucune donnée n’est transmise à un service tiers, et il n’y a ni régie publicitaire ni réseau social embarqué.',
            },
            {
                title: 'Cookies',
                body: 'Matomo est configuré sans cookie : aucun cookie de mesure n’est déposé sur votre appareil, et le site n’affiche donc pas de bandeau de consentement. Si vous choisissez un thème clair ou sombre, ce choix est conservé dans le stockage local de votre navigateur ; il n’est jamais envoyé au serveur.',
            },
            {
                title: 'Journaux du serveur',
                body: 'Comme tout serveur web, celui-ci conserve des journaux d’accès techniques : adresse IP, date, page demandée. Ils servent au diagnostic et à la sécurité, et ne sont exploités à aucune autre fin.',
            },
            {
                title: 'Vos droits',
                body: 'Vous pouvez demander l’accès aux données vous concernant, leur rectification ou leur effacement. La demande se fait par courriel et n’a pas besoin d’être motivée.',
            },
        ],
        contactTitle: 'Écrire',
        contactBody: 'Pour exercer vos droits ou poser une question :',
        backHome: 'Voir les jeux',
    },
    footer: {
        madeBy: 'Créé par Léo Deroin',
        elsewhereHeading: 'Ailleurs',
        navLegal: 'Mentions légales',
        navPrivacy: 'Confidentialité',
        siteHeading: 'Le site',
        github: 'GitHub',
        contact: 'Contact',
        rights: 'Les jeux restent gratuits et sans publicité.',
        versionLabel: 'Version {version}',
    },
    notFound: {
        title: 'Page introuvable',
        body: 'Cette adresse ne correspond à rien sur ce site.',
        back: 'Retour à l’accueil',
    },
} as const;

// `as const` fige chaque chaîne en type littéral : sans élargissement, aucune
// traduction ne serait assignable à `Dictionary` puisque son texte diffère.
// Widen ne conserve donc que la FORME — les clés, l'imbrication, les tableaux —
// et c'est précisément ce qu'on veut vérifier d'une langue à l'autre.
type Widen<T> = T extends string
    ? string
    : T extends readonly (infer Item)[]
      ? readonly Widen<Item>[]
      : { [Key in keyof T]: Widen<T[Key]> };

export type Dictionary = Widen<typeof fr>;

export type GameKey = keyof typeof fr.games.items;
