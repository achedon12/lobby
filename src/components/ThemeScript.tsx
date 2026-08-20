import { THEME_COLORS } from '@/lib/theme';

// Ce script s'exécute AVANT le premier rendu du navigateur : il pose l'attribut
// que la cascade CSS lit, ce qui évite le flash de thème clair sur une page
// que l'utilisateur a forcée en sombre. C'est aussi ce qui impose le
// `suppressHydrationWarning` sur <html>.
//
// Il corrige au passage `theme-color`. Les deux balises sont déclarées par
// requête média `prefers-color-scheme` : un visiteur dont le SYSTÈME est en
// clair mais qui force le thème sombre gardait une barre d'adresse crème
// autour d'une page sombre — la seule partie de l'interface à ignorer son
// choix. Les deux balises reçoivent donc la couleur forcée, quelle que soit
// celle qui correspond au système.
//
// Le try/catch n'est pas décoratif : `localStorage` lève quand les cookies
// tiers sont bloqués ou en navigation privée sur certains navigateurs, et une
// exception ici laisserait la page entière sans style.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')return;document.documentElement.setAttribute('data-theme',t);var c=t==='light'?'${THEME_COLORS.light}':'${THEME_COLORS.dark}',m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++)m[i].setAttribute('content',c);}catch(e){}})();`;

export function ThemeScript() {
    return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
