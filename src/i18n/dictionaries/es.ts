import type { Dictionary } from './fr';

export const es: Dictionary = {
    meta: {
        title: 'Juegos en línea gratis',
        titleTag: 'Juegos en línea gratis, jugables en el navegador',
        description:
            'Push Your Luck y Hombres Lobo: juegos gratis, sin registro, jugables directamente en el navegador. Nada que instalar.',
        shortName: 'Juegos',
        ogAlt: 'Juegos en línea gratis — Push Your Luck y Hombres Lobo',
        keywords:
            'juegos en línea, juego de navegador, juego gratis, juego de cartas, hombres lobo en línea, Léo Deroin',
    },
    header: {
        skipToContent: 'Ir al contenido',
        brand: 'jeux.leoderoin.fr',
        navLabel: 'Navegación',
        navAbout: 'Acerca de',
        languageLabel: 'Idioma',
        themeLabel: 'Tema',
        themeToggle: 'Tema: {mode}',
        themeSystem: 'Sistema',
        themeLight: 'Claro',
        themeDark: 'Oscuro',
    },
    hero: {
        eyebrow: 'Directorio',
        title: 'Juegos en línea gratis',
        tagline: 'Dos juegos, jugables ahora mismo en el navegador.',
        countLabel: '{count} juegos en línea',
    },
    games: {
        heading: 'Los juegos',
        statusBeta: 'En beta',
        statusSoon: 'Próximamente',
        items: {
            'push-your-luck': {
                name: 'Push Your Luck',
                facts: [
                    'En solitario',
                    'Cada día',
                    'Sin cuenta',
                ],
                description:
                    'Roba cartas para agrandar el bote: cinco bombas esperan en la baraja. Si te plantas demasiado pronto dejas puntos sobre la mesa; si tardas demasiado lo pierdes todo. La partida del día es la misma para todos, con clasificación diaria y sin registro.',
            },
            'loups-garous': {
                name: 'Hombres Lobo',
                facts: [
                    'Multijugador',
                    'Tiempo real',
                    'Con cuenta',
                ],
                description:
                    'Hombres Lobo en línea, con tus amigos. Progresión, cosméticos, clanes y clasificación ELO, además de un bot de Discord que lanza las partidas desde tu propio servidor.',
            },
        },
    },
    about: {
        title: 'Acerca de',
        titleTag: 'Acerca del sitio — jeux.leoderoin.fr',
        description:
            'Qué hace este sitio, cómo está construido y quién lo hizo. Una puerta de entrada a juegos jugables en el navegador.',
        heading: 'Acerca de este sitio',
        lede: 'Un panel diminuto que hace una sola cosa: llevarte a los juegos.',
        sections: [
            {
                title: 'Qué es',
                body: 'Una puerta de entrada, y nada más. Este sitio no aloja ningún juego: cada uno vive en su propio dominio, con su comunidad y su ritmo de actualizaciones. Lo que hay aquí es un enlace único que compartir — uno que seguirá funcionando el día que se añada un juego nuevo.',
            },
            {
                title: 'Cómo está hecho',
                body: 'Totalmente estático: el HTML se escribe al construir y se sirve tal cual, sin base de datos ni servidor de aplicaciones. Cuatro idiomas, con direcciones traducidas. Las ilustraciones son SVG dibujados a mano e incrustados en la página, así que no hay imágenes que descargar.',
            },
            {
                title: 'Qué no recopila',
                body: 'Sin publicidad, sin rastreadores de terceros, sin widgets sociales incrustados, sin cookies de analítica. El detalle está en la página de privacidad.',
            },
            {
                title: 'Quién lo hizo',
                body: 'Léo Deroin, desarrollador. El sitio está escrito, alojado y mantenido por una sola persona.',
            },
        ],
        contactTitle: 'Escribir',
        contactBody: 'Un comentario, un enlace roto, un juego que añadir:',
        backHome: 'Ver los juegos',
    },
    legal: {
        title: 'Aviso legal',
        titleTag: 'Aviso legal — jeux.leoderoin.fr',
        description: 'Editor, alojamiento y condiciones de uso de jeux.leoderoin.fr.',
        heading: 'Aviso legal',
        lede: 'La información que la ley francesa exige para un sitio accesible al público.',
        sections: [
            {
                title: 'Editor',
                body: 'jeux.leoderoin.fr está editado por Léo Deroin, a título personal y sin fines comerciales. El editor es también el director de la publicación.',
            },
            {
                title: 'Alojamiento',
                body: 'El sitio está alojado por {host}, {address}. Teléfono: {phone}. SIREN {registration}.',
            },
            {
                title: 'Contenido',
                body: 'Los textos y las ilustraciones de este sitio son obra de su editor. Los nombres Push Your Luck y Hombres Lobo designan juegos editados por la misma persona, en sus propios dominios y bajo sus propias condiciones.',
            },
            {
                title: 'Enlaces salientes',
                body: 'Este sitio solo enlaza a pushyourluck.net, loupsgarous.net y al repositorio público de su autor. No muestra publicidad ni contiene enlaces comerciales o de afiliación.',
            },
        ],
        contactTitle: 'Contacto',
        contactBody: 'Para cualquier pregunta sobre este aviso:',
        backHome: 'Ver los juegos',
    },
    privacy: {
        title: 'Privacidad',
        titleTag: 'Privacidad — jeux.leoderoin.fr',
        description:
            'Qué mide este sitio, qué no mide y qué se queda en tu navegador. Sin rastreadores de terceros, sin cookies de analítica.',
        heading: 'Privacidad',
        lede: 'Qué se mide, qué no, y dónde se queda.',
        sections: [
            {
                title: 'Analítica',
                body: 'El sitio usa Matomo, instalado en el mismo servidor. Registra las páginas vistas, el idioma del navegador, el tipo de dispositivo y la página de procedencia. No se envía ningún dato a servicios de terceros, y no hay red publicitaria ni widget social incrustado.',
            },
            {
                title: 'Cookies',
                body: 'Matomo está configurado sin cookies: no se guarda ninguna cookie de analítica en tu dispositivo, por lo que el sitio no muestra banner de consentimiento. Si eliges un tema claro u oscuro, esa elección se guarda en el almacenamiento local de tu navegador; nunca se envía al servidor.',
            },
            {
                title: 'Registros del servidor',
                body: 'Como todo servidor web, este conserva registros técnicos de acceso: dirección IP, fecha, página solicitada. Sirven para el diagnóstico y la seguridad, y para nada más.',
            },
            {
                title: 'Tus derechos',
                body: 'Puedes solicitar el acceso a los datos que te conciernen, su rectificación o su supresión. La solicitud se hace por correo y no necesita justificación.',
            },
        ],
        contactTitle: 'Escribir',
        contactBody: 'Para ejercer tus derechos o hacer una pregunta:',
        backHome: 'Ver los juegos',
    },
    footer: {
        madeBy: 'Creado por Léo Deroin',
        navLegal: 'Aviso legal',
        navPrivacy: 'Privacidad',
        siteHeading: 'El sitio',
        github: 'GitHub',
        contact: 'Contacto',
        rights: 'Los juegos siguen siendo gratuitos y sin publicidad.',
        versionLabel: 'Versión {version}',
    },
    notFound: {
        title: 'Página no encontrada',
        body: 'Esta dirección no corresponde a nada en este sitio.',
        back: 'Volver al inicio',
    },
};
