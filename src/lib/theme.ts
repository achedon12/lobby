/**
 * Les deux couleurs de barre d'adresse, en un seul endroit.
 *
 * Elles étaient répétées dans les deux `viewport` de layout et n'existaient
 * nulle part ailleurs. Elles sont maintenant lues aussi par le script de thème
 * et par le sélecteur : trois copies littérales auraient fini par diverger, et
 * la seule chose visible aurait été une barre d'adresse d'une autre couleur
 * que la page.
 */
export const THEME_COLORS = { light: '#fdf8ec', dark: '#0d0a16' } as const;
