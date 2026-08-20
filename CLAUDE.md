# CLAUDE.md

Guide pour travailler sur ce dépôt. Voir `README.md` pour le démarrage.

## Le projet en un paragraphe

Panneau statique d'entrée vers les jeux publiés par Léo Deroin, sur
**jeux.leoderoin.fr**, port **3003** en développement. Next.js 16 (App Router,
TypeScript, Tailwind v4) en `output: 'export'` : quatre pages, quatre langues,
aucun serveur applicatif en production — nginx sert du HTML déjà écrit. Le site
ne fait que **pointer vers** les jeux, il n'en héberge aucun. Aucune base de
données, aucune API, aucun état.

## Conventions

- **Français** pour toute la copie utilisateur et pour les commentaires ;
  **anglais** pour les identifiants.
- **Aucun emoji dans l'interface.** Les icônes viennent de `lucide-react`.
  ⚠️ lucide v1 a retiré les icônes de marque : `Github` n'existe plus, le
  glyphe est dans `components/GithubMark.tsx`.
- **Les logos se modifient dans les SVG de `public/`**, jamais dans les PNG.
  `npm run og` régénère les rasterisations et les quatre images de partage.
- **Les polices sont auto-hébergées** (`src/fonts/`), jamais chargées depuis
  Google Fonts : la CSP n'autorise `font-src` que sur `'self'`.
- **Les vignettes de `GameArt.tsx` gardent les mêmes couleurs dans les trois
  thèmes.** Ce sont des scènes nocturnes ; les repeindre en clair les rendrait
  méconnaissables d'une visite à l'autre.
- **Le site ne porte pas le nom de son auteur.** C'est un panneau de jeux, et
  son nom est son adresse. La signature reste au pied de page.
- **Commits** : conventional commits en français, corps explicatif quand le
  « pourquoi » ne tient pas dans le titre. **Aucune mention d'outil IA.**

## Commentaires — le pourquoi, jamais le quoi

Un commentaire qui paraphrase le code qu'il surplombe est un déchet. Il ne se
justifie que s'il porte une information qu'on ne peut pas déduire en lisant le
code : la raison d'un choix contre-intuitif, un contrat entre deux fichiers, ou
**ce qui a déjà cassé**. Les pièges nginx documentés dans
`nginx/default.conf.template` sont de cette dernière catégorie — ils valent
chacun une heure de débogage.

## Internationalisation

Français sur `/`, les autres langues préfixées. **Aucune chaîne visible en dur
dans un composant** : tout passe par `src/i18n/`. Les dictionnaires ne
contiennent QUE des chaînes — l'interpolation se fait avec `format()`.

`fr.ts` fait référence ; les trois autres sont typées d'après lui par `Widen`.
Ajouter une clé en français et l'oublier ailleurs casse `npm run typecheck` :
c'est le filet du projet, ne le contourne jamais avec un `any`.

Les **slugs sont traduits** : `/a-propos/`, `/en/about/`, `/es/aviso-legal/`,
`/de/datenschutz/`. Toute URL interne passe par `path(clé, langue)`
(`src/i18n/routes.ts`) — c'est ce qui garantit que les `hreflang`, le sitemap,
les redirections nginx et le sélecteur de langue restent cohérents. Écrire
`/en/about/` en dur casse les quatre silencieusement.

Le sélecteur de langue pointe vers la MÊME page dans l'autre langue, pas vers
l'accueil : c'est pour ça que `routeKey` traverse `PageChrome` jusqu'à lui.

## Thèmes

Trois états à couvrir, toujours : système, clair forcé, sombre forcé. **Ne
définis jamais une couleur uniquement dans un bloc `@media` ou `[data-theme]`**
— sa valeur de base doit vivre sur `:root`, sinon elle disparaît dans les deux
autres états, et « système » est justement celui qu'on oublie de tester.

Les couleurs de jeu portent du sens : elles servent à RECONNAÎTRE un jeu, pas à
décorer. Une teinte qui n'appartient à aucun jeu n'a rien à faire dans la
palette.

## Mouvement

Une seule idée, déclinée : ce sont des scènes nocturnes, et une nuit n'est
jamais tout à fait immobile. Les étincelles scintillent, le halo de la lune
respire. **Rien d'autre ne bouge.** Ajouter une animation ailleurs ferait
basculer la page du côté « effets empilés », qui est exactement ce qu'on évite.

Tout est en `transform` et `opacity` : mesuré, les animations ne coûtent rien
au TBT ni au CLS. La règle `prefers-reduced-motion` de `globals.css` les arrête
toutes.

## Pièges connus

- **`add_header` dans un `location` nginx annule ceux du `server`.** D'où
  `nginx/security-headers.conf.template`, à inclure dans chaque `location` qui
  pose un en-tête. Vérifier avec
  `curl -sI http://127.0.0.1:3006/ | grep -i content-security-policy`.
- **`location ^~ /_next/static/` : le `^~` est obligatoire.** Sans lui, les
  locations en expression régulière l'emportent sur le préfixe, et les polices
  de `_next/static/media/*.woff2` tombent dans la règle `\.(...|woff2)$` — 30
  jours de cache au lieu d'un an. Invisible à l'œil, vu par Lighthouse.
- **`nginx/redirects.conf` est GÉNÉRÉ** par `npm run nginx`, appelé
  automatiquement avant `npm run build`. L'éditer à la main, c'est perdre la
  modification à la construction suivante.
- **L'image de production est bâtie sur `nginx-unprivileged:alpine-slim`**, et
  pas sur la variante complète : 20 Mo au lieu de 82. La slim n'a ni njs, ni
  geoip, ni les scripts `/docker-entrypoint.d/` — donc pas d'envsubst au
  démarrage. Sans effet tant que la configuration reste figée à la construction.
- **Le nom du dossier de route EST le slug.** `app/(default)/a-propos/` doit
  correspondre à `SLUGS.about.fr`. Rien ne le vérifie : une divergence donne
  des liens internes vers une page inexistante, sans erreur de construction.
- **Un layout Next ignore quelle page il enveloppe.** D'où `PageChrome`,
  appelé par chaque page, qui porte l'en-tête et le pied de page ; `SiteShell`
  ne fait plus que `<html>`/`<body>`.
- **`mx-auto` sur un enfant de flex column** annule le `stretch` : toute
  section centrée dans `<main>` doit porter `w-full` en plus de `max-w-*`.
- **`output: 'export'` désactive `headers()`** dans next.config.ts. La CSP vit
  dans nginx, et nulle part ailleurs.
- **Les `NEXT_PUBLIC_*` sont inlinées à la construction.** Les passer au
  démarrage du conteneur n'a aucun effet.
- **Les variables de next/font portent le suffixe `-local`.** `--font-sans` est
  déjà un jeton de thème Tailwind : lui réaffecter sa propre valeur dans
  `@theme` produit une référence circulaire, et plus aucune police ne
  s'applique.
- **`transform-box: fill-box` sur un enfant de SVG animé.** Sans lui,
  `transform-origin: center` se réfère au viewBox entier : l'étincelle part en
  diagonale au lieu de pulser sur place.
- **Le loup de `GameArt.tsx` est de PROFIL.** La version de face et le corps
  entier ont été essayés : les deux se lisaient comme un chat. Ne pas y revenir
  sans regarder une capture.

## Mentions légales

Les coordonnées de l'hébergeur sont dans `src/lib/site.ts`, relevées sur ses
mentions légales et recoupées avec le registre officiel. ⚠️ Deux entités
« LordHosting » existent au registre : l'ancienne **association** de Vitry-sur-
Seine (SIRET 893 302 760 000 10, PDF de 2022 encore en ligne) et la **SASU**
parisienne immatriculée en mai 2026, qui est l'hébergeur actuel. Ne pas
reprendre la première.

## Performance et référencement

Les scores sont tenus, pas espérés. Après tout changement de mise en page, de
police ou de conf nginx :

```bash
docker compose -p jeux up -d --build
npx -y lighthouse@12 http://127.0.0.1:3006/ --view \
  --chrome-flags="--headless=new --no-sandbox"
```

Référence à ne pas dégrader — mesuré le 20 août 2026, sans Matomo, sur
l'accueil : **97 / 100 / 100 / 100** en mobile, **100 / 100 / 100 / 100** en
desktop, CLS 0, TBT 10 ms. Les pages de texte sont à 98 en mobile.

Le détail et la marche à suivre pour Search Console sont dans `docs/seo.md`.

## Vérifier avant de pousser

```bash
npm run check
```
