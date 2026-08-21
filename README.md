# jeux.leoderoin.fr

Panneau des jeux publiés sur les domaines de Léo Deroin. Quatre pages, quatre
langues, entièrement statique : elle ne fait que **pointer vers**
`reflow.leoderoin.fr`, `azimut.page`, `pushyourluck.net` et
`loupsgarous.net`, elle ne les héberge pas.

C'est délibéré. Servir un jeu à deux adresses le ferait entrer en concurrence
avec lui-même dans les résultats de recherche, et aucun `hreflang` ne rattrape
ça.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3003
```

Ou dans Docker, pour retrouver la version de Node de la production :

```bash
docker compose -p jeux -f docker-compose.dev.yml up -d --build
```

Avant de pousser :

```bash
npm run check        # typecheck + lint + build
```

## Ce que fait le projet

| Sujet | Choix |
|---|---|
| Rendu | Next.js 16 en `output: 'export'` — du HTML complet par langue, aucun Node en production |
| Langues | `fr` sur `/`, puis `/en/`, `/es/`, `/de/` — **slugs traduits** (`/a-propos/`, `/en/about/`) |
| Icônes | `lucide-react`, aucun emoji dans l'interface |
| Vignettes | des SVG en ligne écrits à la main, un par jeu (`components/GameArt.tsx`) |
| Typographie | Fredoka (titres) et Outfit (texte), variables et auto-hébergées |
| Thèmes | système, clair forcé, sombre forcé |
| Production | une image nginx sans privilèges, en lecture seule, **28 Mo** |

## Structure

```
src/
  app/(default)/        les pages françaises : /, /a-propos/, /mentions-legales/…
  app/(prefixed)/       les autres langues, sur /xx/ et /xx/<slug traduit>/
  app/sitemap.ts        une entrée par langue ET par page, avec ses alternatives
  i18n/routes.ts        LA table des chemins — toute URL interne passe par path()
  components/           en-tête, pied de page, carte de jeu, sélecteurs
  components/GameArt    les illustrations de couverture, en SVG
  data/games.ts         LA liste des jeux — donnée pure, sans React
  fonts/                les .woff2 auto-hébergés et leurs licences OFL
  i18n/dictionaries/    fr.ts fait référence, les autres en sont typées
  lib/seo.ts            métadonnées et JSON-LD
  views/               le corps des pages, partagé par les deux racines
nginx/                  configuration de production, figée à la construction
                        (redirects.conf est GÉNÉRÉ, ne pas l'éditer)
scripts/export-og.mts   rasterise les SVG de public/ en PNG
```

## Ajouter un jeu

1. Une entrée dans `src/data/games.ts` (URL, dépôt, statut, accent, icône).
2. La copie dans **les quatre** dictionnaires — `npm run typecheck` refuse de
   compiler tant qu'il en manque une.
3. Une paire de variables `--card-accent` dans `globals.css` si la couleur du
   jeu n'existe pas encore, et sa clé dans `[data-accent='…']`.
4. La clé d'icône dans `components/GameIcon.tsx`.
5. **Une illustration dans `components/GameArt.tsx`.** C'est la moitié haute de
   la tuile, donc la première chose qu'on voit — c'est aussi le plus long à
   faire. Compte plusieurs allers-retours : dessine, construis, regarde la
   capture, recommence. Les couleurs de la vignette sont FIXES, elles ne
   changent pas avec le thème.

Le sitemap, le JSON-LD et le compteur de la page suivent tout seuls.

## Avant la mise en ligne publique

- [x] **Hébergeur** — LordHosting, SASU au capital de 1 000 €, 5 square
      Frédéric Vallois, 75015 Paris, 06 01 21 24 27, SIREN 105 383 988 (RCS
      Paris). Relevé sur leurs mentions légales et recoupé avec le registre
      officiel le 20 août 2026. ⚠️ Un PDF « LORDHOSTING ASSOCIATION » de 2022
      circule encore avec une adresse à Vitry-sur-Seine : c'est l'ancienne
      structure, ne pas la reprendre.
- [x] **`NEXT_PUBLIC_MATOMO_SITE_ID=7`** — confirmé le 20 août 2026 en sondant
      le serveur : `idsite=7` répond 200, un identifiant inexistant répond 400.
      Le 400 observé pendant un audit antérieur ne se reproduit pas.
- [x] **Jeton Search Console** posé dans `src/lib/site.ts`. Il reste à
      ajouter la propriété dans Search Console, cliquer « Vérifier », puis
      soumettre `https://jeux.leoderoin.fr/sitemap.xml`.
- [ ] Relire les mentions légales et la page de confidentialité : elles
      décrivent une configuration Matomo **sans cookie**
      (`_paq.push(['disableCookies'])`, posé dans `src/components/Matomo.tsx`).
      Si cette configuration change, le texte devient faux.

## Ajouter une page

1. Sa clé et ses quatre slugs dans `SLUGS` (`src/i18n/routes.ts`).
2. Sa copie dans les quatre dictionnaires, avec au minimum `titleTag` et
   `description`.
3. Sa clé dans `CONTENT_KEYS` si c'est une page de texte — elle réutilise
   alors `TextPageView` sans une ligne de plus.
4. Un dossier de route français, **dont le nom EST le slug** : il doit rester
   identique à `SLUGS.<clé>.fr`, rien ne le vérifie. Les autres langues sont
   servies par `[locale]/[slug]`, qui se génère depuis la table.
5. Son entrée dans `PAGES` (`src/app/sitemap.ts`).

Les redirections nginx, elles, se régénèrent seules : `npm run nginx` dérive
`nginx/redirects.conf` de la table des routes, et `npm run build` l'appelle.

## Ajouter une langue

1. Le code dans `LOCALES` (`src/i18n/config.ts`), plus son endonyme et son
   abréviation.
2. Un dictionnaire dans `src/i18n/dictionaries/`, typé `Dictionary`.
3. Son `og:locale` dans `OG_LOCALES` (`src/lib/seo.ts`).
4. Son slug pour **chaque** page dans `SLUGS` (`src/i18n/routes.ts`).

## Référencement

Ce qui est en place, et qu'il ne faut pas casser :

- une balise `canonical` par langue, barre finale comprise ;
- `hreflang` réciproques entre les quatre langues, plus `x-default` ;
- `sitemap.xml` avec `lastmod`, `changefreq` et `priority` sur chaque URL — et
  **sans** `xhtml:link` : ces éléments désactivent le visualiseur XML du
  navigateur, et les `hreflang` sont déjà dans le `<head>` des seize pages ;
- JSON-LD `WebSite` + `ItemList` de `VideoGame`, prix zéro déclaré ;
- Open Graph et Twitter Card avec une image 1200×630 **par langue** ;
- `/fr/` redirigé en 301 vers `/`, pour ne jamais avoir deux fois la même page.

Vérifier après un changement :

```bash
npm run build
grep -o '<link rel="alternate"[^>]*>' out/index.html
head -20 out/sitemap.xml
```

## Images et polices

Les **SVG de `public/` sont la source** des icônes. Les PNG en sont des
rasterisations, versionnées, régénérées par :

```bash
npm run og      # 4 images de partage (une par langue) + les icônes
npm run fonts   # recopie les .woff2 depuis @fontsource-variable
```

L'image de partage n'a pas de fichier source : elle est **décrite dans le
script**, parce qu'elle est paramétrée par langue et que ses textes viennent
des dictionnaires.

La construction Docker ne fait que copier les PNG : elle n'a ni `sharp` ni
polices système, et un rendu de texte y donnerait un résultat différent de
celui vérifié à l'œil.

## Déploiement

```bash
docker compose -p jeux up -d --build
```

Le conteneur écoute sur `127.0.0.1:${JEUX_HOST_PORT:-3006}` — jamais sur une
interface publique : le proxy inverse de la machine porte le TLS, la limitation
de débit et les journaux.

⚠️ `NEXT_PUBLIC_SITE_URL` doit être posée dans le `.env` du serveur **avant**
la construction : elle est inlinée dans les fichiers produits, et c'est elle
qui écrit les canoniques, les `hreflang` et le sitemap. La passer au démarrage
n'a aucun effet.

Voir `.env.example` pour la liste complète, dont
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, qui pose la balise de propriété Google
Search Console. Vide, aucune balise n'est émise.

## Performance

Mesuré sur l'image de production, Lighthouse 12, sans Matomo :

| | Mobile | Desktop |
|---|---|---|
| Performance | 97 | 100 |
| Accessibilité | 100 | 100 |
| Bonnes pratiques | 100 | 100 |
| SEO | 100 | 100 |

CLS 0, TBT 10 ms, 328 Ko au total. La page « à propos » est à 98 en mobile.
Voir `docs/seo.md` pour l'audit complet.

## Ce qui reste à faire

Le lien retour depuis Push Your Luck et Loups-Garous vers cette page. Azimut et
Reflow le portent déjà, dans leur pied de page. Sans lui, l'annuaire ne reçoit
aucun trafic et ne sert qu'à son auteur — c'est le maillage entre les jeux qui
justifie le projet, pas la page elle-même.
