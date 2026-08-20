'use client';

import Script from 'next/script';
import { MATOMO } from '@/lib/site';

// Aucune variable, aucun script : une mesure d'audience à moitié configurée
// enverrait des vues vers un site Matomo inexistant, et polluerait la console
// de chaque visiteur.
export function Matomo() {
    if (!MATOMO.url || !MATOMO.siteId) return null;

    const base = MATOMO.url.replace(/\/$/, '');

    return (
        <Script id="matomo" strategy="lazyOnload">
            {`var _paq=window._paq=window._paq||[];_paq.push(['disableCookies']);_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function(){var u="${base}/";_paq.push(['setTrackerUrl',u+'matomo.php']);_paq.push(['setSiteId','${MATOMO.siteId}']);var d=document,g=d.createElement('script'),s=d.getElementsByTagName('script')[0];g.async=true;g.src=u+'matomo.js';s.parentNode.insertBefore(g,s);})();`}
        </Script>
    );
}
