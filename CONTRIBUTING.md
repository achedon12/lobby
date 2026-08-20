# Contribuer

Merci d'y jeter un œil. Ce dépôt est petit et le restera : c'est un panneau
d'entrée vers des jeux, pas une plateforme.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3003
npm run check        # typecheck + lint + build — à faire passer avant toute PR
```

## Avant d'ouvrir une pull request

- `npm run check` passe.
- Si tu ajoutes du texte visible, il est présent dans **les quatre**
  dictionnaires (`src/i18n/dictionaries/`). Le typage l'impose : `fr.ts` fait
  référence, et oublier une langue casse la compilation.
- Si tu touches à la mise en page, aux polices ou à la configuration nginx,
  relance Lighthouse — les scores de référence sont dans `docs/seo.md` et ne
  doivent pas se dégrader.
- Aucun secret, aucune URL locale, aucun `console.log` oublié.

## La règle qui ne se négocie pas

**Aucune chaîne visible en dur dans un composant.** Tout passe par `src/i18n/`,
et toute URL interne par `path(clé, langue)`. Une exception laissée « le temps
de tester » finit toujours en production, visible dans une seule langue.

## Style

- **Français** pour la copie utilisateur et les commentaires ; **anglais** pour
  les identifiants.
- Les commentaires disent le **pourquoi**, jamais le quoi. Un commentaire qui
  paraphrase le code qu'il surplombe finit par mentir.
- Conventional commits, en français.

Les choix non évidents sont expliqués **dans le code**, à l'endroit qui les
porte : `nginx/default.conf.template` pour la configuration de production,
`src/i18n/routes.ts` pour les URL, `src/app/globals.css` pour les thèmes.

## Signaler un problème

Un lien mort, une traduction bancale, un jeu à ajouter : ouvre une issue. Pour
une faille de sécurité, voir `SECURITY.md`.
