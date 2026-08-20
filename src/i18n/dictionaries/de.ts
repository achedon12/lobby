import type { Dictionary } from './fr';

export const de: Dictionary = {
    meta: {
        title: 'Kostenlose Onlinespiele',
        titleTag: 'Kostenlose Onlinespiele, direkt im Browser spielbar',
        description:
            'Push Your Luck und Werwölfe: kostenlose Spiele, ohne Anmeldung, direkt im Browser spielbar. Nichts zu installieren.',
        shortName: 'Spiele',
        ogAlt: 'Kostenlose Onlinespiele — Push Your Luck und Werwölfe',
        keywords:
            'Onlinespiele, Browserspiel, kostenloses Spiel, Kartenspiel, Werwölfe online, Léo Deroin',
    },
    header: {
        skipToContent: 'Zum Inhalt springen',
        brand: 'jeux.leoderoin.fr',
        navLabel: 'Navigation',
        navAbout: 'Über',
        languageLabel: 'Sprache',
        themeLabel: 'Design',
        themeToggle: 'Design: {mode}',
        themeSystem: 'System',
        themeLight: 'Hell',
        themeDark: 'Dunkel',
    },
    hero: {
        eyebrow: 'Verzeichnis',
        title: 'Kostenlose Onlinespiele',
        tagline: 'Zwei Spiele, sofort im Browser spielbar.',
        countLabel: '{count} Spiele online',
    },
    games: {
        heading: 'Die Spiele',
        statusBeta: 'In der Beta',
        statusSoon: 'Demnächst',
        items: {
            'push-your-luck': {
                name: 'Push Your Luck',
                tagline: 'Solo-Kartenspiel',
                description:
                    'Ziehe Karten, um den Topf zu füllen — fünf Bomben stecken im Stapel. Kassierst du zu früh, lässt du Punkte liegen; kassierst du zu spät, verlierst du alles. Die Partie des Tages ist für alle dieselbe, mit täglicher Rangliste und ohne Anmeldung.',
            },
            'loups-garous': {
                name: 'Werwölfe',
                tagline: 'Gesellschaftsspiel in Echtzeit',
                description:
                    'Werwölfe online, mit deinen Freunden. Fortschritt, Kosmetik, Clans und ELO-Rangliste, dazu ein Discord-Bot, der Partien direkt von deinem Server aus startet.',
            },
        },
    },
    about: {
        title: 'Über',
        titleTag: 'Über diese Seite — jeux.leoderoin.fr',
        description:
            'Was diese Seite tut, wie sie gebaut ist und wer sie gemacht hat. Ein Eingang zu Spielen für den Browser.',
        heading: 'Über diese Seite',
        lede: 'Ein winziges Panel, das eine Sache tut: zu den Spielen führen.',
        sections: [
            {
                title: 'Was es ist',
                body: 'Ein Eingang, mehr nicht. Diese Seite hostet kein Spiel: jedes lebt auf seiner eigenen Domain, mit eigener Community und eigenem Rhythmus. Was es hier gibt, ist ein einziger Link zum Weitergeben — einer, der auch dann noch gilt, wenn ein neues Spiel dazukommt.',
            },
            {
                title: 'Wie sie gebaut ist',
                body: 'Vollständig statisch: das HTML entsteht beim Bauen und wird unverändert ausgeliefert, ohne Datenbank und ohne Anwendungsserver. Vier Sprachen, mit übersetzten Adressen. Die Illustrationen sind von Hand gezeichnete SVG direkt in der Seite, es gibt also keine Bilder zu laden.',
            },
            {
                title: 'Was sie nicht erhebt',
                body: 'Keine Werbung, keine Tracker von Dritten, keine eingebetteten sozialen Widgets, keine Statistik-Cookies. Die Einzelheiten stehen auf der Datenschutzseite.',
            },
            {
                title: 'Wer sie gemacht hat',
                body: 'Léo Deroin, Entwickler. Die Seite wird von einer einzigen Person geschrieben, gehostet und gepflegt.',
            },
        ],
        contactTitle: 'Schreiben',
        contactBody: 'Eine Anmerkung, ein toter Link, ein Spiel zum Aufnehmen:',
        backHome: 'Die Spiele ansehen',
    },
    legal: {
        title: 'Impressum',
        titleTag: 'Impressum — jeux.leoderoin.fr',
        description: 'Herausgeber, Hoster und Nutzungsbedingungen von jeux.leoderoin.fr.',
        heading: 'Impressum',
        lede: 'Die Angaben, die das französische Recht für eine öffentlich zugängliche Seite verlangt.',
        sections: [
            {
                title: 'Herausgeber',
                body: 'jeux.leoderoin.fr wird von Léo Deroin herausgegeben, privat und nicht gewerblich. Der Herausgeber ist zugleich verantwortlich für den Inhalt.',
            },
            {
                title: 'Hoster',
                body: 'Die Seite wird gehostet von {host}, {address}. Telefon: {phone}. SIREN {registration}.',
            },
            {
                title: 'Inhalte',
                body: 'Texte und Illustrationen dieser Seite stammen vom Herausgeber. Die Namen Push Your Luck und Werwölfe bezeichnen Spiele derselben Person, auf eigenen Domains und zu eigenen Bedingungen.',
            },
            {
                title: 'Ausgehende Links',
                body: 'Diese Seite verlinkt nur auf pushyourluck.net, loupsgarous.net und das öffentliche Repository ihres Autors. Sie zeigt keine Werbung und enthält keine kommerziellen oder Affiliate-Links.',
            },
        ],
        contactTitle: 'Kontakt',
        contactBody: 'Bei Fragen zu diesem Impressum:',
        backHome: 'Die Spiele ansehen',
    },
    privacy: {
        title: 'Datenschutz',
        titleTag: 'Datenschutz — jeux.leoderoin.fr',
        description:
            'Was diese Seite misst, was nicht, und was in deinem Browser bleibt. Keine Tracker von Dritten, keine Statistik-Cookies.',
        heading: 'Datenschutz',
        lede: 'Was gemessen wird, was nicht, und wo es bleibt.',
        sections: [
            {
                title: 'Statistik',
                body: 'Die Seite nutzt Matomo, installiert auf demselben Server. Erfasst werden aufgerufene Seiten, Browsersprache, Gerätetyp und die verweisende Seite. Es gehen keine Daten an Dritte, und es gibt weder Werbenetzwerk noch eingebettetes soziales Widget.',
            },
            {
                title: 'Cookies',
                body: 'Matomo ist ohne Cookies konfiguriert: es wird kein Statistik-Cookie auf deinem Gerät gespeichert, deshalb zeigt die Seite auch kein Einwilligungsbanner. Wählst du ein helles oder dunkles Design, bleibt diese Wahl im lokalen Speicher deines Browsers; sie wird nie an den Server gesendet.',
            },
            {
                title: 'Server-Protokolle',
                body: 'Wie jeder Webserver führt auch dieser technische Zugriffsprotokolle: IP-Adresse, Datum, angeforderte Seite. Sie dienen der Diagnose und der Sicherheit, sonst nichts.',
            },
            {
                title: 'Deine Rechte',
                body: 'Du kannst Auskunft über die dich betreffenden Daten, deren Berichtigung oder Löschung verlangen. Die Anfrage erfolgt per E-Mail und muss nicht begründet werden.',
            },
        ],
        contactTitle: 'Schreiben',
        contactBody: 'Um deine Rechte auszuüben oder eine Frage zu stellen:',
        backHome: 'Die Spiele ansehen',
    },
    footer: {
        madeBy: 'Erstellt von Léo Deroin',
        navLegal: 'Impressum',
        navPrivacy: 'Datenschutz',
        siteHeading: 'Die Seite',
        github: 'GitHub',
        contact: 'Kontakt',
        rights: 'Die Spiele bleiben kostenlos und werbefrei.',
        versionLabel: 'Version {version}',
    },
    notFound: {
        title: 'Seite nicht gefunden',
        body: 'Diese Adresse gehört zu nichts auf dieser Seite.',
        back: 'Zurück zur Startseite',
    },
};
