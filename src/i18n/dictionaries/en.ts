import type { Dictionary } from './fr';

export const en: Dictionary = {
    meta: {
        title: 'Free online games',
        titleTag: 'Free online games, playable in your browser',
        description:
            'Free games, no sign-up, playable straight from your browser. Nothing to install, nothing to download: open the page and play.',
        shortName: 'Games',
        ogAlt: 'Free online games, playable in your browser',
        keywords: 'online games, browser game, free game, card game, werewolf online, Léo Deroin',
    },
    header: {
        skipToContent: 'Skip to content',
        brand: 'jeux.leoderoin.fr',
        navLabel: 'Navigation',
        navAbout: 'About',
        languageLabel: 'Language',
        themeLabel: 'Theme',
        themeToggle: 'Theme: {mode}',
        themeSystem: 'System',
        themeLight: 'Light',
        themeDark: 'Dark',
    },
    hero: {
        eyebrow: 'Directory',
        title: 'Free online games',
        tagline: 'Games you can play right now in your browser, nothing to install.',
        countLabel: '{count} games online',
    },
    games: {
        heading: 'The games',
        statusBeta: 'In beta',
        statusSoon: 'Coming soon',
        items: {
            reflow: {
                name: 'Reflow',
                facts: [
                    'Solo',
                    '100 puzzles',
                    'No account',
                ],
                description:
                    'A platformer whose scenery is the browser window: every platform is pinned to an edge, and resizing the window moves the level itself. 100 hand-built puzzles, then endless generated runs, with no account and no ads.',
            },
            azimut: {
                name: 'Azimut',
                facts: [
                    'Solo',
                    'Daily',
                    'No account',
                ],
                description:
                    'Guess the country of the day from its outline alone. Every guess tells you how far away it is and which way to head: six tries to close in. The same puzzle for everyone, every day, with no sign-up and no ads.',
            },
            'push-your-luck': {
                name: 'Push Your Luck',
                facts: [
                    'Solo',
                    'Daily',
                    'No account',
                ],
                description:
                    'Draw cards to grow the pot — five bombs are hiding in the deck. Bank too early and you leave points behind; bank too late and you lose everything. Everyone plays the same daily deal, with a daily leaderboard and no sign-up.',
            },
            'loups-garous': {
                name: 'Werewolf',
                facts: [
                    'Multiplayer',
                    'Real time',
                    'Account',
                ],
                description:
                    'Werewolf online, with your friends. Progression, cosmetics, clans and ELO ranking, plus a companion Discord bot that starts games straight from your server.',
            },
        },
    },
    about: {
        title: 'About',
        titleTag: 'About this site — jeux.leoderoin.fr',
        description:
            'What this site does, how it is built, and who made it. A front door to games playable in your browser.',
        heading: 'About this site',
        lede: 'A tiny panel that does one thing: point you to the games.',
        sections: [
            {
                title: 'What it is',
                body: 'A front door, and nothing else. This site hosts no games: each one lives on its own domain, with its own community and its own release rhythm. What is here is a single link to pass around — one that will still work the day a new game is added.',
            },
            {
                title: 'How it is built',
                body: 'Entirely static: the HTML is written at build time and served as-is, with no database and no application server. Four languages, with translated addresses. The illustrations are hand-drawn SVG inlined in the page, so there are no images to download.',
            },
            {
                title: 'What it does not collect',
                body: 'No ads, no third-party trackers, no embedded social widgets, no analytics cookies. The details are on the privacy page.',
            },
            {
                title: 'Who made it',
                body: '{author}, a developer. The site is written, hosted and maintained by one person.',
            },
        ],
        contactTitle: 'Get in touch',
        contactBody: 'A remark, a broken link, a game to add:',
        backHome: 'See the games',
    },
    legal: {
        title: 'Legal notice',
        titleTag: 'Legal notice — jeux.leoderoin.fr',
        description: 'Publisher, host and terms of use for jeux.leoderoin.fr.',
        heading: 'Legal notice',
        lede: 'The information French law requires for a publicly accessible site.',
        sections: [
            {
                title: 'Publisher',
                body: 'jeux.leoderoin.fr is published by {author}, in a personal and non-commercial capacity. The publisher is also the publication director.',
            },
            {
                title: 'Host',
                body: 'The site is hosted by {host}, {address}. Telephone: {phone}. SIREN {registration}.',
            },
            {
                title: 'Content',
                body: 'The text and illustrations on this site are the work of its publisher. The names of the games listed here refer to games published by the same person, on their own domains and under their own terms.',
            },
            {
                title: 'Outbound links',
                body: 'This site links only to pushyourluck.net, loupsgarous.net and its author’s public repository. It carries no advertising and no commercial or affiliate links.',
            },
        ],
        contactTitle: 'Contact',
        contactBody: 'For any question about this notice:',
        backHome: 'See the games',
    },
    privacy: {
        title: 'Privacy',
        titleTag: 'Privacy — jeux.leoderoin.fr',
        description:
            'What this site measures, what it does not, and what stays in your browser. No third-party trackers, no analytics cookies.',
        heading: 'Privacy',
        lede: 'What is measured, what is not, and where it stays.',
        sections: [
            {
                title: 'Analytics',
                body: 'The site uses Matomo, installed on the same server. It records pages viewed, browser language, device type and referring page. No data is sent to any third-party service, and there is no ad network or embedded social widget.',
            },
            {
                title: 'Cookies',
                body: 'Matomo is configured without cookies: no analytics cookie is stored on your device, so the site shows no consent banner. If you pick a light or dark theme, that choice is kept in your browser’s local storage; it is never sent to the server.',
            },
            {
                title: 'Server logs',
                body: 'Like any web server, this one keeps technical access logs: IP address, date, requested page. They are used for diagnostics and security, and for nothing else.',
            },
            {
                title: 'Your rights',
                body: 'You may request access to the data concerning you, its correction or its deletion. Ask by email; no justification is needed.',
            },
        ],
        contactTitle: 'Get in touch',
        contactBody: 'To exercise your rights or ask a question:',
        backHome: 'See the games',
    },
    updatedLabel: 'Last updated: {date}',
    footer: {
        madeBy: 'Built by {author}',
        navLegal: 'Legal notice',
        navPrivacy: 'Privacy',
        siteHeading: 'The site',
        github: 'GitHub',
        contact: 'Contact',
        rights: 'The games stay free and ad-free.',
        versionLabel: 'Version {version}',
    },
    notFound: {
        title: 'Page not found',
        body: 'This address does not match anything on this site.',
        back: 'Back to home',
    },
};
