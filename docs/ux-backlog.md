# Carnet UX/UI

File d'attente des améliorations d'expérience, traitée **une entrée par
itération** sur `main`. Chaque entrée dit ce qui cloche, ce qu'on fait, et
comment on vérifie que c'est fait.

Convention : `[ ]` à faire · `[~]` en cours · `[x]` fait, avec le commit.

---

## P1 — défauts réels, visibles par un visiteur

### [x] 1. Le lien d'évitement atterrit sous l'en-tête collante

**Le problème.** `#contenu` est ciblé par le lien d'évitement, mais l'en-tête
est `sticky` : le navigateur amène l'ancre en haut du cadre, donc *derrière*
la barre. Un utilisateur au clavier saute le menu et se retrouve devant un
titre à moitié caché.

**Ce qu'on fait.** `scroll-margin-top` sur `#contenu`, égal à la hauteur de
l'en-tête. Vaut aussi pour toute ancre future.

**Vérification.** Charger `/#contenu` et constater que le `<h1>` est
entièrement visible, en 320 et en 1280 px.

**Fait.** `--header-h` posée sur `:root`, et `scroll-margin-block-start`
appliqué à **tout `[id]`** plutôt qu'au seul `#contenu` : une ancre ajoutée
plus tard aurait sinon hérité du même défaut, en silence. Vérifié sur
`/mentions-legales/#contenu`, la seule page assez haute pour que le navigateur
défile vraiment — le titre s'arrête bien sous la barre.

---

### [x] 2. La page 404 est en français quoi qu'il arrive

**Le problème.** L'export statique produit une seule `404.html`, rendue en
français. Un visiteur allemand qui suit un lien mort vers `/de/quelquechose`
tombe sur une page qu'il ne lit pas — et sans aucun moyen de revenir dans sa
langue.

**Ce qu'on fait.** Faire porter à la 404 les quatre langues côte à côte, ou à
défaut les quatre liens de retour. Pas de détection JavaScript : la page doit
rester utile sans script.

**Vérification.** `curl /de/zzz` renvoie 404 et la page contient un chemin de
retour vers `/de/`.

**Fait.** Le diagnostic était plus profond que l'entrée ne le disait : la page
servie n'était pas la nôtre du tout. Avec deux layouts racine, un
`not-found.tsx` de groupe n'est jamais promu en `out/404.html` — Next y mettait
SA page d'erreur intégrée, et notre version ne vivait que sous `/404/` et
`/_not-found/`, deux adresses que personne n'atteint. Il fallait
`global-not-found.tsx` et le drapeau `experimental.globalNotFound`.

Au passage : ces deux adresses répondaient **200**, donc une page « introuvable »
indexable. `npm run build` les élague désormais (`scripts/prune-export.mts`) —
un fichier absent ne peut pas être servi par erreur.

---

### [x] 3. Rien ne dit qu'une tuile quitte le site

**Le problème.** Cliquer une tuile emmène sur `pushyourluck.net`. Aucun
repère ne l'annonce : ni icône, ni domaine, ni mention. C'est la seule action
importante de la page, et elle est muette sur sa destination.

**Ce qu'on fait.** Afficher le domaine de destination dans la tuile, et le
signaler aussi aux lecteurs d'écran. Discret : c'est une information, pas un
avertissement.

**Vérification.** Le domaine est lisible sur chaque tuile ; le nom accessible
du lien mentionne la destination.

**Fait.** Le domaine est affiché à droite de la catégorie, avec une flèche
sortante, et il est DÉRIVÉ de `url` (`gameHost()`) — deux champs à tenir
d'accord auraient fini par diverger, et c'est l'affichage qui aurait menti sur
la destination réelle.

Rattaché par `aria-describedby` plutôt qu'ajouté au nom accessible : un lecteur
d'écran annonce « Push Your Luck, pushyourluck.net », et le nom continue de
correspondre au texte affiché. Vérifié en 1000 et en 320 px, la ligne ne se
casse pas.

**Défaut introduit, puis corrigé.** Le domaine avait d'abord été atténué en
`text-fg-muted/80` : sur le panneau teinté, le rapport de contraste tombait
sous 4,5:1 et l'accessibilité passait de 100 à 96. Repéré à l'itération
suivante, faute d'avoir relancé Lighthouse sur celle-ci. L'opacité est retirée
— la discrétion vient de la taille et de la casse, pas d'un texte délavé.

**Leçon retenue pour les entrées suivantes** : toute entrée qui touche à une
couleur ou à une opacité passe par un audit d'accessibilité avant d'être
cochée, même si sa section « Vérification » ne le demande pas.

---

## P2 — confort

### [x] 4. Aucun retour au toucher sur les tuiles

**Le problème.** Tout l'effet de survol (levée, zoom de la vignette) est en
`:hover`, qui n'existe pas au doigt. Sur mobile, appuyer sur une tuile ne
produit rien jusqu'au changement de page.

**Ce qu'on fait.** Un état `:active` bref — enfoncement léger — pour que
l'appui soit accusé immédiatement.

**Vérification.** Capture avec `:active` forcé, et `prefers-reduced-motion`
toujours respecté.

**Fait.** `:active` bref — redressement, 1 px d'enfoncement, 1,5 % de retrait,
80 ms — appliqué sur TOUS les appareils : c'est le seul retour dont dispose un
doigt entre le geste et le changement de page.

Second défaut trouvé en chemin : le survol n'était pas conditionné. Au toucher,
`:hover` reste accroché après l'appui sur la plupart des navigateurs mobiles —
la tuile restait levée et sa vignette agrandie jusqu'au prochain toucher
ailleurs, ce qui la faisait passer pour sélectionnée. Le survol est désormais
sous `@media (hover: hover)`, le focus clavier restant traité à part.

Le halo gris d'iOS est neutralisé, mais seulement parce qu'il est REMPLACÉ.

Vérifié en rejouant les déclarations de `:active` sous une classe, sur une
copie de la page réellement servie — Chrome sans pilotage ne sait pas forcer
la pseudo-classe.

---

### [x] 5. Les liens de langue sont trop petits au doigt

**Le problème.** `FR · EN · ES · DE` en `text-xs` avec `px-0.5` : la cible
utile fait environ 20 px de haut, sous les 24 px recommandés. Lisible à la
souris, hasardeux au pouce.

**Ce qu'on fait.** Élargir la zone tactile sans grossir le texte —
remplissage vertical, pas taille de police.

**Vérification.** L'audit `target-size` de Lighthouse reste conforme, et la
hauteur mesurée dépasse 24 px.

**Fait.** `py-1.5` et `px-1.5` portent la cible de ~20 à 28 px de haut, avec
des marges négatives `-my-1.5` pour que la hauteur de l'en-tête ne bouge pas
d'un pixel. Élargi par le REMPLISSAGE, jamais par la taille du texte :
grossir les codes de langue aurait redonné aux contrôles le poids visuel qu'on
venait tout juste de leur retirer.

---

### [x] 6. Le premier octet du jeu attend la résolution DNS

**Le problème.** Au clic, le navigateur découvre `pushyourluck.net` : il doit
résoudre le DNS, ouvrir TCP et négocier TLS avant le premier octet. Sur un
réseau mobile, cela se compte en centaines de millisecondes — et c'est la
transition la plus importante du site.

**Ce qu'on fait.** `dns-prefetch` vers les deux domaines de jeux, sans
`preconnect` : ouvrir une connexion complète pour un clic incertain coûte
plus qu'elle ne rapporte.

**Vérification.** Les balises sont dans le `<head>` des 16 pages, et le score
de performance ne bouge pas.

**Fait, avec un écart assumé sur la vérification.** Les balises ne sont posées
que sur les **4 pages d'accueil**, pas sur les 16. Les pages « à propos » et
légales ne contiennent aucun lien vers un jeu depuis que le pied de page ne
les répète plus : y résoudre ces domaines serait du travail pur perte. Le
critère « 16 pages » avait été écrit avant ce changement.

`dns-prefetch` et non `preconnect`, comme prévu : ouvrir une connexion complète
— poignée de main TLS comprise — pour un clic incertain coûte plus qu'elle ne
rapporte. React 19 remonte les balises dans le `<head>` sans aide.

Vérifié : 4/4 accueils portent les deux balises, 0/12 pour les autres, et la
performance ne régresse pas.

---

## P3 — finitions

### [x] 7. `prefers-contrast: more` n'est pas pris en compte

**Le problème.** Le texte secondaire est volontairement doux. Un visiteur qui
demande un contraste renforcé au niveau système ne reçoit rien de plus.

**Ce qu'on fait.** Un bloc `@media (prefers-contrast: more)` qui rapproche
`--fg-muted` de `--fg` et renforce les filets. **Uniquement des variables**,
pour ne pas dupliquer de règles.

**Vérification.** Capture avec la fonctionnalité forcée dans le navigateur.

**Fait.** Trois blocs, un par état de thème — clair, sombre système, sombre
forcé — exactement comme la palette de base. Uniquement des **variables** : y
redéfinir des règles les aurait fait diverger de leur version normale à la
première retouche, avec trois jeux à tenir d'accord.

Mesuré plutôt qu'apprécié à l'œil, le texte secondaire passe de :

| | normal | renforcé |
|---|---|---|
| clair, sur papier | 5,51:1 | **9,74:1** |
| sombre, sur fond | 7,75:1 | **12,54:1** |
| or du jeu, sur panneau | 4,78:1 | **6,87:1** |

Les deux premiers dépassent le seuil AAA de 7:1.

**Limite de la vérification.** Chrome sans pilotage ne sait pas forcer
`prefers-contrast`. La capture rejoue donc les valeurs du bloc clair en fin de
cascade, sur une copie de la page réellement servie : elle prouve la palette,
pas le déclenchement de la requête média. Celui-ci est vérifié par la présence
des trois blocs dans le CSS servi.

---

### [x] 8. La page d'accueil ne dit pas ce qu'on trouve derrière un jeu

**Le problème.** Les tuiles ne portent qu'un nom et une catégorie. Un visiteur
qui hésite entre les deux n'a aucun critère : durée d'une partie, seul ou à
plusieurs, inscription ou non.

**Ce qu'on fait.** Deux ou trois repères factuels par jeu, en petits caractères
— repris des dictionnaires, donc traduits. Sans revenir aux paragraphes de
description qui alourdissaient la tuile.

**Vérification.** La tuile reste sous sa hauteur actuelle en 320 px.

**Fait.** Trois repères par jeu, sur les **mêmes axes** — seul ou à plusieurs,
à quel rythme, avec ou sans compte. C'est la comparabilité qui aide à choisir,
pas la quantité de texte.

Ils REMPLACENT la catégorie (« Jeu de cartes solo ») au lieu de s'y ajouter :
une catégorie décrit, elle ne départage pas, et l'information « solo » qu'elle
portait est reprise par le premier repère. La tuile garde donc son nombre de
lignes, et le domaine remonte à côté du titre.

Deux défauts corrigés en cours de route : le séparateur, placé avant chaque
repère, se retrouvait seul en tête de ligne au retour à la ligne — il suit
désormais le repère qu'il sépare. Et l'interlettrage a été retiré, qui coûtait
une dizaine de pixels.

**Écart assumé sur la hauteur.** À 320 px, « Multijugador · Tiempo real · Con
cuenta » passe sur deux lignes : la tuile espagnole du loup-garou est plus
haute d'une ligne. Raccourcir davantage reviendrait à retirer l'information que
cette entrée sert justement à ajouter. Le retour à la ligne est propre, sans
débordement horizontal, et les sept autres combinaisons langue/jeu tiennent sur
une ligne.

---

## Deuxième série

### [x] 9. La page 404 ne mène pas aux jeux

**Le problème.** Un visiteur perdu reçoit quatre chemins de retour vers
l'accueil — et rien d'autre. Or sur un panneau de jeux, l'accueil n'est pas la
destination : les jeux le sont. On lui demande donc un clic de plus pour
arriver là où il allait.

**Ce qu'on fait.** Les deux jeux, avec leur domaine, directement sur la 404,
au-dessus des retours par langue. Sans illustration : cette page doit rester
légère, elle est servie à des gens qui n'ont rien demandé.

**Vérification.** `curl /de/zzz` renvoie 404 et contient les deux domaines de
jeux. La page reste sous sa taille actuelle à quelques kilo-octets près.

**Fait.** Les deux jeux figurent au-dessus des retours par langue, avec leur
domaine sous le nom — même convention que les tuiles de l'accueil. La 404 passe
de 68 à 76 Ko, soit 8 Ko pour éviter un clic à quelqu'un qui vient de tomber
sur un lien mort.

Les noms sont ceux du dictionnaire français : la 404 est servie pour toutes les
langues, et l'export statique n'en produit qu'une. Ce sont des noms propres,
que le domaine désambiguïse de toute façon.

---

### [x] 10. La barre d'adresse ne suit pas le thème forcé

**Le problème.** `theme-color` est déclaré par requête média
`prefers-color-scheme`. Un visiteur dont le système est en clair mais qui force
le thème sombre garde une barre d'adresse crème autour d'une page sombre — la
seule partie de l'interface qui ne suit pas son choix.

**Ce qu'on fait.** Le script de thème, qui pose déjà `data-theme` avant le
premier rendu, met aussi à jour la balise `theme-color` correspondante. Il doit
rester minuscule et sans dépendance : il s'exécute avant tout le reste.

**Vérification.** La balise change de valeur quand `data-theme` est posé, sans
clignotement au chargement.

**Fait.** Le script de thème met les DEUX balises à la couleur forcée, sans
regarder laquelle correspond au système : c'est ce qui rend le résultat juste
quel que soit le réglage de la machine. Le sélecteur fait de même au clic — la
barre suivrait sinon avec un rechargement de retard — et rend à chaque balise
la couleur de sa propre requête média au retour en « système ».

Les deux couleurs vivaient en double dans les deux `viewport` de layout. Elles
sont désormais dans `src/lib/theme.ts`, lu par les layouts, le script et le
sélecteur : quatre copies littérales auraient divergé, et la seule chose
visible aurait été une barre d'adresse d'une autre couleur que la page.

Vérifié sur le DOM réel (`--dump-dom`) après exécution du script, avec le
sombre forcé dans le stockage : les deux balises passent à `#0d0a16`, y compris
celle dont la requête média vise le clair.

---

### [ ] 11. La langue active n'est signalée que par la couleur

**Le problème.** Dans `FR · EN · ES · DE`, la langue courante se distingue par
sa seule couleur — encre contre gris. Un visiteur daltonien ou un écran à
faible contraste ne la voient pas. C'est le critère WCAG 1.4.1 : la couleur ne
doit jamais être le seul porteur d'une information.

**Ce qu'on fait.** Un second signal, non coloré, sur la langue active. Discret :
l'en-tête vient d'être allégé, il ne s'agit pas de le réalourdir.

**Vérification.** Capture en niveaux de gris : la langue active doit rester
identifiable.
