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

### [ ] 5. Les liens de langue sont trop petits au doigt

**Le problème.** `FR · EN · ES · DE` en `text-xs` avec `px-0.5` : la cible
utile fait environ 20 px de haut, sous les 24 px recommandés. Lisible à la
souris, hasardeux au pouce.

**Ce qu'on fait.** Élargir la zone tactile sans grossir le texte —
remplissage vertical, pas taille de police.

**Vérification.** L'audit `target-size` de Lighthouse reste conforme, et la
hauteur mesurée dépasse 24 px.

---

### [ ] 6. Le premier octet du jeu attend la résolution DNS

**Le problème.** Au clic, le navigateur découvre `pushyourluck.net` : il doit
résoudre le DNS, ouvrir TCP et négocier TLS avant le premier octet. Sur un
réseau mobile, cela se compte en centaines de millisecondes — et c'est la
transition la plus importante du site.

**Ce qu'on fait.** `dns-prefetch` vers les deux domaines de jeux, sans
`preconnect` : ouvrir une connexion complète pour un clic incertain coûte
plus qu'elle ne rapporte.

**Vérification.** Les balises sont dans le `<head>` des 16 pages, et le score
de performance ne bouge pas.

---

## P3 — finitions

### [ ] 7. `prefers-contrast: more` n'est pas pris en compte

**Le problème.** Le texte secondaire est volontairement doux. Un visiteur qui
demande un contraste renforcé au niveau système ne reçoit rien de plus.

**Ce qu'on fait.** Un bloc `@media (prefers-contrast: more)` qui rapproche
`--fg-muted` de `--fg` et renforce les filets. **Uniquement des variables**,
pour ne pas dupliquer de règles.

**Vérification.** Capture avec la fonctionnalité forcée dans le navigateur.

---

### [ ] 8. La page d'accueil ne dit pas ce qu'on trouve derrière un jeu

**Le problème.** Les tuiles ne portent qu'un nom et une catégorie. Un visiteur
qui hésite entre les deux n'a aucun critère : durée d'une partie, seul ou à
plusieurs, inscription ou non.

**Ce qu'on fait.** Deux ou trois repères factuels par jeu, en petits caractères
— repris des dictionnaires, donc traduits. Sans revenir aux paragraphes de
description qui alourdissaient la tuile.

**Vérification.** La tuile reste sous sa hauteur actuelle en 320 px.
