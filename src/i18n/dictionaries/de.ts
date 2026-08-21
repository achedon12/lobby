import type { Dictionary } from './fr';

export const de: Dictionary = {
    meta: {
        title: 'Kostenlose Onlinespiele',
        titleTag: 'Kostenlose Onlinespiele, direkt im Browser spielbar',
        description:
            'Kostenlose Spiele, ohne Anmeldung, direkt im Browser spielbar. Nichts zu installieren, nichts herunterzuladen: Seite öffnen und spielen.',
        shortName: 'Spiele',
        ogAlt: 'Kostenlose Onlinespiele, direkt im Browser spielbar',
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
        tagline: 'Spiele, die sofort im Browser laufen — ohne Installation.',
        countLabel: '{count} Spiele online',
    },
    games: {
        heading: 'Die Spiele',
        statusBeta: 'In der Beta',
        statusSoon: 'Demnächst',
        items: {
            reflow: {
                name: 'Reflow',
                facts: [
                    'Solo',
                    '54 Rätsel',
                    'Ohne Konto',
                ],
                description:
                    'Ein Jump-and-Run, dessen Kulisse das Browserfenster ist: jede Plattform hängt an einem Rand, und die Fenstergröße zu ändern verschiebt das Level selbst. 54 handgebaute Rätsel, danach endlos erzeugte Partien, ohne Konto und ohne Werbung.',
            },
            azimut: {
                name: 'Azimut',
                facts: [
                    'Solo',
                    'Täglich',
                    'Ohne Konto',
                ],
                description:
                    'Errate das Land des Tages allein an seiner Silhouette. Jeder Versuch verrät Entfernung und Richtung: sechs Anläufe, um näher zu kommen. Für alle dasselbe Rätsel, jeden Tag, ohne Anmeldung und ohne Werbung.',
            },
            'push-your-luck': {
                name: 'Push Your Luck',
                facts: [
                    'Solo',
                    'Täglich',
                    'Ohne Konto',
                ],
                description:
                    'Ziehe Karten, um den Topf zu füllen — fünf Bomben stecken im Stapel. Kassierst du zu früh, lässt du Punkte liegen; kassierst du zu spät, verlierst du alles. Die Partie des Tages ist für alle dieselbe, mit täglicher Rangliste und ohne Anmeldung.',
            },
            'loups-garous': {
                name: 'Werwölfe',
                facts: [
                    'Mehrspieler',
                    'Echtzeit',
                    'Mit Konto',
                ],
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
                body: '{author}, Entwickler. Die Seite wird von einer einzigen Person geschrieben, gehostet und gepflegt.',
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
                body: 'jeux.leoderoin.fr wird von {author} herausgegeben, privat und nicht gewerblich. Der Herausgeber ist zugleich verantwortlich für den Inhalt.',
            },
            {
                title: 'Hoster',
                body: 'Die Seite wird gehostet von {host}, {address}. Telefon: {phone}. SIREN {registration}.',
            },
            {
                title: 'Inhalte',
                body: 'Texte und Illustrationen dieser Seite stammen vom Herausgeber. Die Namen der hier aufgeführten Spiele bezeichnen Spiele derselben Person, auf eigenen Domains und zu eigenen Bedingungen.',
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
    updatedLabel: 'Zuletzt aktualisiert: {date}',
    footer: {
        madeBy: 'Erstellt von {author}',
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
