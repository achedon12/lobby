// Ce script s'exécute AVANT le premier rendu du navigateur : il pose l'attribut
// que la cascade CSS lit, ce qui évite le flash de thème clair sur une page
// que l'utilisateur a forcée en sombre. C'est aussi ce qui impose le
// `suppressHydrationWarning` sur <html> — React voit un attribut qu'il n'a pas
// produit lui-même.
//
// Le try/catch n'est pas décoratif : `localStorage` lève quand les cookies
// tiers sont bloqués ou en navigation privée sur certains navigateurs, et une
// exception ici laisserait la page entière sans style.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export function ThemeScript() {
    return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
