# Audit SEO et performance

Mesuré le **20 août 2026** sur l'image de production (`docker compose -p jeux up
-d --build`), avec Lighthouse 12 en local. À rejouer après tout changement de
mise en page, de police ou de configuration nginx.

## Scores

Page d'accueil :

| | Mobile | Desktop |
|---|---|---|
| Performance | **97** | **100** |
| Accessibilité | **100** | **100** |
| Bonnes pratiques | **100** | **100** |
| SEO | **100** | **100** |

Page « à propos », en mobile : **98 / 100 / 100 / 100**.

Signaux web essentiels, en mobile : **FCP 0,8 s · LCP 2,6 s · TBT 10 ms ·
CLS 0**. Poids total **328 Ko**.

⚠️ Ces chiffres sont mesurés **sans Matomo**. Avec la mesure d'audience active,
les bonnes pratiques tombent à 96 — voir « Ce qui reste à faire ».

## Ce qui est en place

### Indexation

- Une balise `canonical` par langue, barre finale comprise, cohérente avec ce
  que nginx sert réellement.
- `hreflang` réciproques entre `fr`, `en`, `es`, `de`, plus `x-default` pointant
  vers une page réelle et non vers une redirection.
- `sitemap.xml` déclarant les seize URL — quatre pages × quatre langues — avec
  `lastmod`, `changefreq` et `priority`.

  ⚠️ **Sans `xhtml:link`.** Chrome désactive son visualiseur XML dès qu'un
  document contient l'espace de noms XHTML : le plan s'affichait alors en texte
  brut. Les `hreflang` sont déjà déclarés dans le `<head>` des seize pages, et
  Google accepte indifféremment ce canal ou celui du plan — les deux à la fois
  était une redondance, pas une sécurité.
- **Slugs traduits** : `/a-propos/`, `/en/about/`, `/es/acerca-de/`,
  `/de/ueber-uns/`. Un mot-clé dans l'URL, dans la langue du visiteur.
- `robots.txt` avec l'adresse du sitemap.
- `/fr/` et `/index.html` redirigés en 301 : la page d'accueil n'existe qu'à une
  seule adresse.
- `/en` redirigé vers `/en/`, et de même pour chaque slug « à propos » — sans
  quoi chaque page serait servie à deux adresses.

### Contenu

- `<title>` unique par langue, 39 à 57 caractères, sous la limite d'affichage de
  Google.
- `meta description` unique par langue, 104 à 127 caractères, commençant par les
  noms des jeux — c'est ce qu'on cherche.
- Un seul `<h1>` par page ; hiérarchie `h1` → `h2` → `h3` respectée.
- Données structurées JSON-LD : `WebSite`, `Person`, et un `ItemList` de
  `VideoGame` avec un `Offer` à prix zéro sur l'accueil ; une `AboutPage` liée
  au site sur la seconde page. C'est ce qui permet à un moteur de comprendre
  que la page est un annuaire, et que les jeux sont gratuits.
- **Maillage interne** : les tuiles de l'accueil sont le seul chemin vers les
  jeux, volontairement. Le pied de page ne les répète pas.

### Performance

- Site **entièrement statique** : nginx sert du HTML déjà écrit, aucun processus
  applicatif, aucune base.
- CSS **intégrée au HTML** (`experimental.inlineCss`) : plus aucune ressource ne
  bloque le premier rendu.
- Polices **auto-hébergées, variables, sous-ensemble latin**, préchargées, en
  `font-display: swap`. 62 Ko pour les deux familles.
- Illustrations en **SVG intégré** : aucune requête d'image, aucun décalage de
  mise en page.
- Toutes les zones d'image ont un rapport d'aspect fixé — **CLS à 0**.
- `_next/static` en cache un an `immutable`, HTML en revalidation systématique.
- Compression gzip, `text/xml` compris.

### Accessibilité

- Lien d'évitement en premier élément focalisable.
- Contours de focus visibles, `prefers-reduced-motion` respecté.
- Sélecteur de langue en **liens réels**, pas en menu JavaScript : suivable par
  un robot comme au clavier.
- Illustrations `aria-hidden` — le nom du jeu, juste dessous, les décrit déjà.
- Contrastes vérifiés dans les trois états de thème.

## Ce qui reste à faire

### 1. Le lien retour depuis les deux jeux — le plus important

Aucune page n'a d'autorité tant que rien ne pointe vers elle. Un pied de page
« Mes autres jeux » sur `pushyourluck.net` et `loupsgarous.net`, renvoyant ici,
est la seule action de cette liste qui change vraiment le référencement.

C'est aussi ce qui justifie le projet : le trafic qui circule d'un jeu à
l'autre.

### 2. Créer le site dans Matomo

Le score de bonnes pratiques passe de 100 à 96 dès que Matomo est actif, parce
que la requête de mesure répond **400** : l'identifiant de site utilisé pour le
test n'existe pas.

Créer le site dans Matomo, récupérer son `idsite`, et le poser dans le `.env`
du serveur :

```bash
NEXT_PUBLIC_MATOMO_URL="https://matomo.leoderoin.fr"
NEXT_PUBLIC_MATOMO_SITE_ID="<le vrai identifiant>"
```

Le script est chargé en `lazyOnload` : il ne dispute pas la bande passante au
premier rendu.

### 3. Google Search Console

1. Ajouter la propriété `https://jeux.leoderoin.fr` dans Search Console.
2. Choisir la vérification par **balise HTML**, copier le jeton.
3. Le poser dans le `.env` du serveur, puis **reconstruire** — la variable est
   inlinée à la construction, la passer au démarrage n'a aucun effet :
   ```bash
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="<jeton>"
   docker compose -p jeux up -d --build
   ```
4. Vérifier, puis soumettre `https://jeux.leoderoin.fr/sitemap.xml`.

### 4. Ce qui ne sera pas corrigé, et pourquoi

- **`legacy-javascript` et `unused-javascript`** signalent le module de
  compatibilité de Next et son moteur d'hydratation. Les retirer demanderait
  d'abandonner React côté client, pour un seul composant interactif — le
  sélecteur de thème. Le coût mesuré est de 14 Ko ; ça ne vaut pas le prix.
- **`lastmod` absent du sitemap.** Une date recalculée à chaque construction
  ment sur la fraîcheur du contenu, et Google ignore les `lastmod` qu'il juge
  peu fiables. Mieux vaut ne rien déclarer.
- **LCP à 2,6 s en mobile** est mesuré sous la simulation Lighthouse — 4G lente
  et processeur divisé par quatre. En desktop il est à 0,5 s. Testé : passer les
  polices en `font-display: optional` ne change rien, elles ne sont pas en
  cause. Les illustrations détaillées coûtent le point de performance qui sépare
  97 de 98 ; c'est un échange assumé contre la lisibilité des vignettes.

## Rejouer l'audit

```bash
docker compose -p jeux up -d --build
npx -y lighthouse@12 http://127.0.0.1:3006/ --view \
  --chrome-flags="--headless=new --no-sandbox"
```

Une fois le site en ligne, PageSpeed Insights donnera en plus les **données de
terrain** (CrUX), qui sont celles que Google utilise pour le classement — elles
n'apparaissent qu'après quelques semaines de trafic réel.

Contrôles rapides, sans Lighthouse :

```bash
curl -sI https://jeux.leoderoin.fr/ | grep -i content-security-policy
curl -s  https://jeux.leoderoin.fr/ | grep -o '<link rel="alternate"[^>]*>'
curl -s  https://jeux.leoderoin.fr/sitemap.xml | head -20
```
