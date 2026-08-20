import type { JSX } from 'react';
import type { GameKey } from '@/i18n';

// Illustrations de couverture, une par jeu. Elles sont EN LIGNE et non des
// fichiers de `public/` : ce sont quelques centaines d'octets chacune une fois
// compressées, et une balise <img> ajouterait une requête bloquante au premier
// rendu pour la plus grande surface visible de la page.
//
// Leurs couleurs sont FIXES, identiques en thème clair et sombre. Ce sont des
// scènes nocturnes, comme les jeux qu'elles annoncent : les repeindre en clair
// les rendrait méconnaissables, et une vignette qui change d'aspect selon le
// thème ne se reconnaît plus d'une visite à l'autre.
//
// `aria-hidden` sur chacune : le titre du jeu, juste en dessous, dit déjà de
// quel jeu il s'agit. Les décrire une seconde fois ne ferait qu'allonger le
// parcours au lecteur d'écran.

function Sparkle({ x, y, size, opacity }: { x: number; y: number; size: number; opacity: number }) {
    return (
        <path
            className="twinkle"
            d={`M${x} ${y - size} Q${x + size * 0.28} ${y - size * 0.28} ${x + size} ${y} Q${x + size * 0.28} ${y + size * 0.28} ${x} ${y + size} Q${x - size * 0.28} ${y + size * 0.28} ${x - size} ${y} Q${x - size * 0.28} ${y - size * 0.28} ${x} ${y - size} Z`}
            fill="#F7C860"
            opacity={opacity}
        />
    );
}

function PushYourLuckArt() {
    return (
        <svg viewBox="0 0 400 240" aria-hidden="true" className="size-full">
            <defs>
                <linearGradient id="pylSky" x1="0" y1="0" x2="0.6" y2="1">
                    <stop offset="0" stopColor="#33265f" />
                    <stop offset="1" stopColor="#0b0816" />
                </linearGradient>
                <radialGradient id="pylGlow" cx="0.5" cy="0.66" r="0.5">
                    <stop offset="0" stopColor="#F7C860" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#F7C860" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="pylFelt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#4b2f7a" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#1a1030" stopOpacity="0.95" />
                </linearGradient>
                {/* Vignette : les coins reculent, l'œil va au centre. Sans elle
                    la scène est plate et les cartes se confondent avec le ciel. */}
                <radialGradient id="pylVignette" cx="0.5" cy="0.5" r="0.72">
                    <stop offset="0.55" stopColor="#000000" stopOpacity="0" />
                    <stop offset="1" stopColor="#000000" stopOpacity="0.5" />
                </radialGradient>
            </defs>

            <rect width="400" height="240" fill="url(#pylSky)" />

            {/* Le tapis de la table. C'est lui qui donne un SOL aux cartes :
                sans surface, elles flottaient dans le vide. */}
            <ellipse cx="200" cy="252" rx="248" ry="86" fill="url(#pylFelt)" />
            <ellipse cx="200" cy="168" rx="196" ry="66" fill="url(#pylGlow)" />

            <Sparkle x={58} y={50} size={9} opacity={0.9} />
            <Sparkle x={342} y={40} size={7} opacity={0.75} />
            <Sparkle x={94} y={186} size={6} opacity={0.6} />
            <Sparkle x={318} y={172} size={8} opacity={0.7} />
            <Sparkle x={200} y={22} size={6} opacity={0.5} />

            {/* Jetons épars au pied des cartes : le pot que le jeu fait gonfler. */}
            <g opacity="0.95">
                <ellipse cx="92" cy="216" rx="17" ry="6" fill="#8a6320" />
                <ellipse cx="92" cy="211" rx="17" ry="6" fill="#F7C860" />
                <ellipse cx="316" cy="222" rx="15" ry="5.5" fill="#8a6320" />
                <ellipse cx="316" cy="217" rx="15" ry="5.5" fill="#E4BE72" />
                <ellipse cx="136" cy="228" rx="13" ry="5" fill="#F7C860" />
            </g>

            {/* Les trois cartes de l'éventail. La carte centrale porte la bombe :
                c'est le risque qui doit sauter aux yeux, pas le gain. */}
            <g transform="rotate(-17 128 168)">
                <rect x="88" y="96" width="80" height="112" rx="10" fill="#FBF3E0" />
                <rect
                    x="93"
                    y="101"
                    width="70"
                    height="102"
                    rx="7"
                    fill="none"
                    stroke="#E4BE72"
                    strokeWidth="2"
                />
                <path
                    d="M128 128c-10 11-18 17-18 25a9 9 0 0 0 15 6l-3 12h12l-3-12a9 9 0 0 0 15-6c0-8-8-14-18-25Z"
                    fill="#2b1f57"
                />
            </g>

            <g transform="rotate(17 272 168)">
                <rect x="232" y="96" width="80" height="112" rx="10" fill="#FBF3E0" />
                <rect
                    x="237"
                    y="101"
                    width="70"
                    height="102"
                    rx="7"
                    fill="none"
                    stroke="#E4BE72"
                    strokeWidth="2"
                />
                <ellipse cx="272" cy="166" rx="24" ry="8" fill="#E4BE72" />
                <ellipse cx="272" cy="155" rx="24" ry="8" fill="#F7C860" />
                <ellipse cx="272" cy="144" rx="24" ry="8" fill="#E4BE72" />
                <ellipse cx="272" cy="133" rx="24" ry="8" fill="#F7C860" />
            </g>

            <g>
                {/* Lueur sous la carte centrale : elle la détache des deux autres
                    et désigne l'endroit où l'histoire se joue. */}
                <ellipse cx="200" cy="132" rx="66" ry="76" fill="url(#pylGlow)" />
                <rect x="158" y="72" width="84" height="118" rx="11" fill="#FFFBF0" />
                <rect
                    x="163"
                    y="77"
                    width="74"
                    height="108"
                    rx="8"
                    fill="none"
                    stroke="#D9534F"
                    strokeWidth="2"
                />
                <circle cx="200" cy="140" r="27" fill="#241a45" />
                <rect x="193" y="106" width="14" height="10" rx="3" fill="#241a45" />
                <path
                    d="M207 108c10-6 16-12 14-22"
                    fill="none"
                    stroke="#F7C860"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <Sparkle x={222} y={82} size={11} opacity={1} />
                <circle cx="190" cy="132" r="5" fill="#4b3a86" />
            </g>

            <rect width="400" height="240" fill="url(#pylVignette)" />
        </svg>
    );
}

function LoupsGarousArt() {
    return (
        <svg viewBox="0 0 400 240" aria-hidden="true" className="size-full">
            <defs>
                <linearGradient id="lgSky" x1="0" y1="0" x2="0.4" y2="1">
                    <stop offset="0" stopColor="#2a4177" />
                    <stop offset="0.5" stopColor="#141f3f" />
                    <stop offset="1" stopColor="#060913" />
                </linearGradient>
                <radialGradient id="lgMoonGlow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#F4E4BC" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#F4E4BC" stopOpacity="0" />
                </radialGradient>
                {/* La brume est ce qui sépare les plans : sans elle, les sapins
                    lointains et ceux du premier plan sont deux aplats noirs à la
                    même distance. */}
                <linearGradient id="lgMist" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7fa0d8" stopOpacity="0" />
                    <stop offset="0.55" stopColor="#7fa0d8" stopOpacity="0.2" />
                    <stop offset="1" stopColor="#7fa0d8" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="lgVignette" cx="0.5" cy="0.5" r="0.72">
                    <stop offset="0.55" stopColor="#000000" stopOpacity="0" />
                    <stop offset="1" stopColor="#000000" stopOpacity="0.5" />
                </radialGradient>
            </defs>

            <rect width="400" height="240" fill="url(#lgSky)" />

            <circle className="breathe" cx="188" cy="106" r="130" fill="url(#lgMoonGlow)" />
            <circle cx="188" cy="106" r="82" fill="#F6E9C6" />
            <circle cx="152" cy="72" r="10" fill="#E8D6AC" />
            <circle cx="228" cy="82" r="7" fill="#E8D6AC" />
            <circle cx="216" cy="140" r="6" fill="#E8D6AC" />

            <circle className="twinkle" cx="44" cy="38" r="2.5" fill="#F6E9C6" opacity="0.9" />
            <circle className="twinkle" cx="88" cy="22" r="2" fill="#F6E9C6" opacity="0.6" />
            <circle className="twinkle" cx="330" cy="30" r="2.5" fill="#F6E9C6" opacity="0.85" />
            <circle className="twinkle" cx="364" cy="74" r="2" fill="#F6E9C6" opacity="0.6" />
            <circle className="twinkle" cx="356" cy="140" r="2" fill="#F6E9C6" opacity="0.45" />
            <circle className="twinkle" cx="32" cy="96" r="2" fill="#F6E9C6" opacity="0.5" />

            {/* Trois rangées de sapins, du plus clair au plus noir. C'est
                l'écart de valeur entre elles qui crée la profondeur, pas leur
                dessin — tous sont de simples triangles. */}
            <g fill="#1b2c56" opacity="0.75">
                <path d="M22 206l20-46 20 46Z" />
                <path d="M58 206l16-38 16 38Z" />
                <path d="M312 206l20-44 20 44Z" />
                <path d="M352 206l18-40 18 40Z" />
            </g>

            <rect y="176" width="400" height="44" fill="url(#lgMist)" />

            <g fill="#0d1730">
                <path d="M0 216l26-58 26 58Z" />
                <path d="M290 216l26-60 26 60Z" />
                <path d="M340 216l24-52 24 52Z" />
            </g>

            {/* Tête de loup de PROFIL, en contre-jour sur la lune.
                ⚠️ Ne pas retenter la version de face ni le corps entier : les
                deux se lisaient comme un chat. En profil, ce sont la ligne
                front-museau et l'oreille unique bien dégagée qui font le loup —
                le reste peut rester grossier, c'est un aplat noir. */}
            <path
                fill="#050a18"
                d="M96 240l10-92c2-22 8-42 20-56l-6-54 40 48h4l16-56 30 68c8 4 14 10 18 16l64 18 14 10-14 10-58 12c-8 10-20 20-34 28-20 12-46 18-68 22Z"
            />
            <ellipse cx="196" cy="132" rx="7" ry="5" fill="#F0913E" transform="rotate(-12 196 132)" />

            {/* Sol et sapins de premier plan, presque noirs : ils referment la
                scène et cachent la base du loup. */}
            <g fill="#02040a">
                <path d="M0 240l30-64 30 64Z" />
                <path d="M300 240l30-70 30 70Z" />
                <path d="M352 240l26-56 26 56Z" />
                <rect y="228" width="400" height="12" />
            </g>

            <rect width="400" height="240" fill="url(#lgVignette)" />
        </svg>
    );
}

function AzimutArt() {
    // Les cercles de distance du cadran. Quatre paliers, comme dans le jeu.
    const rings = [26, 48, 70, 92];

    return (
        <svg viewBox="0 0 400 240" aria-hidden="true" className="size-full">
            <defs>
                <linearGradient id="azSky" x1="0" y1="0" x2="0.5" y2="1">
                    <stop offset="0" stopColor="#0d2137" />
                    <stop offset="1" stopColor="#04090f" />
                </linearGradient>
                <radialGradient id="azWell" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#4cc9f0" stopOpacity="0.30" />
                    <stop offset="0.55" stopColor="#4cc9f0" stopOpacity="0.10" />
                    <stop offset="1" stopColor="#4cc9f0" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="azBeam" x1="0" y1="0" x2="1" y2="0.4">
                    <stop offset="0" stopColor="#4cc9f0" stopOpacity="0.42" />
                    <stop offset="1" stopColor="#4cc9f0" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="azVignette" cx="0.5" cy="0.5" r="0.72">
                    <stop offset="0.55" stopColor="#000000" stopOpacity="0" />
                    <stop offset="1" stopColor="#000000" stopOpacity="0.55" />
                </radialGradient>
                <filter id="azHalo" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="6" />
                </filter>
            </defs>

            <rect width="400" height="240" fill="url(#azSky)" />

            {/* Quelques étoiles, très discrètes : le ciel plat faisait carton. */}
            {[[38, 40], [92, 26], [318, 34], [366, 62], [58, 196], [352, 190]].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" fill="#cfe6f5" opacity="0.5" />
            ))}

            <g transform="translate(200 120)">
                <circle r="100" fill="url(#azWell)" />

                {rings.map((r) => (
                    <circle
                        key={r}
                        r={r}
                        fill="none"
                        stroke="#4cc9f0"
                        strokeOpacity={r === 92 ? 0.45 : 0.2}
                        strokeWidth={r === 92 ? 1.4 : 0.9}
                    />
                ))}
                <line x1="0" y1="-92" x2="0" y2="92" stroke="#4cc9f0" strokeOpacity="0.16" strokeWidth="0.9" />
                <line x1="-92" y1="0" x2="92" y2="0" stroke="#4cc9f0" strokeOpacity="0.16" strokeWidth="0.9" />

                {/* Le faisceau, figé : une illustration ne tourne pas, et une
                    animation ici tirerait l'œil hors du titre du jeu. */}
                <path d="M0 0 L0 -92 A92 92 0 0 1 62 -68 Z" fill="url(#azBeam)" />
                <line x1="0" y1="0" x2="0" y2="-92" stroke="#4cc9f0" strokeOpacity="0.6" strokeWidth="1.2" />

                {/* Une silhouette générique, pas un pays reconnaissable : la
                    vignette ne doit rien dévoiler de la partie du jour. */}
                <g>
                    <path
                        d="M-16 -40 L6 -44 L20 -30 L16 -12 L28 2 L22 22 L4 34 L-14 28 L-24 10 L-18 -8 L-26 -22 Z"
                        fill="#4cc9f0"
                        opacity="0.5"
                        filter="url(#azHalo)"
                    />
                    <path
                        d="M-16 -40 L6 -44 L20 -30 L16 -12 L28 2 L22 22 L4 34 L-14 28 L-24 10 L-18 -8 L-26 -22 Z"
                        fill="#e8f4fb"
                    />
                </g>

                {/* Deux relevés, chacun relié au centre : c'est la mécanique du
                    jeu en un coup d'œil — une distance et un cap. */}
                {[
                    { x: -74, y: -44, c: '#f2604a' },
                    { x: 54, y: 58, c: '#e0b64a' },
                ].map((b) => (
                    <g key={b.c}>
                        <line x1="0" y1="0" x2={b.x} y2={b.y} stroke={b.c} strokeOpacity="0.4" strokeWidth="1" />
                        <circle cx={b.x} cy={b.y} r="8" fill={b.c} opacity="0.45" filter="url(#azHalo)" />
                        <circle cx={b.x} cy={b.y} r="3.6" fill={b.c} />
                    </g>
                ))}

                <text x="0" y="-104" textAnchor="middle" fill="#7d92a8" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="1.5">N</text>
            </g>

            <rect width="400" height="240" fill="url(#azVignette)" />
        </svg>
    );
}

const ART: Record<GameKey, () => JSX.Element> = {
    azimut: AzimutArt,
    'push-your-luck': PushYourLuckArt,
    'loups-garous': LoupsGarousArt,
};

export function GameArt({ game }: { game: GameKey }) {
    const Art = ART[game];
    return <Art />;
}
