<?xml version="1.0" encoding="UTF-8"?>
<!--
  Feuille de style du plan du site.

  Un `sitemap.xml` est écrit pour les moteurs, mais il est aussi la première
  chose qu'on ouvre quand on veut vérifier ce qui est indexé — et sans elle, le
  navigateur affiche un arbre XML brut, ou pire, propose de télécharger le
  fichier.

  Elle ne change RIEN pour les moteurs : l'instruction de traitement qui la
  déclare est ignorée par tout ce qui lit du XML.

  XSLT 1.0 : c'est la seule version que les navigateurs implémentent.
-->
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:x="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="fr">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Plan du site — jeux.leoderoin.fr</title>
        <style>
          :root { color-scheme: light dark; }
          body {
            margin: 0; padding: 2.5rem 1.25rem 4rem;
            background: #fdf8ec; color: #17131f;
            font: 16px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          }
          main { max-width: 60rem; margin: 0 auto; }
          h1 { margin: 0 0 .35rem; font-size: 1.6rem; letter-spacing: -.01em; }
          p.lede { margin: 0 0 2rem; color: #6a6178; }
          .count { font-variant-numeric: tabular-nums; font-weight: 600; }
          .wrap { overflow-x: auto; border: 2px solid #d2c4a6; border-radius: .75rem; background: #fffdf7; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: .7rem .9rem; text-align: left; vertical-align: top; }
          th {
            font-size: .7rem; letter-spacing: .12em; text-transform: uppercase;
            color: #6a6178; border-bottom: 2px solid #d2c4a6; white-space: nowrap;
          }
          td { border-bottom: 1px solid #e7dcc4; font-size: .95rem; }
          tr:last-child td { border-bottom: 0; }
          a { color: #17131f; text-underline-offset: 3px; }
          .meta { color: #6a6178; font-variant-numeric: tabular-nums; white-space: nowrap; }
          .langs { color: #6a6178; font-size: .8rem; }
          @media (prefers-color-scheme: dark) {
            body { background: #0d0a16; color: #f6f2fb; }
            p.lede, th, .meta, .langs { color: #a79fba; }
            .wrap { background: #191325; border-color: #3f3459; }
            th { border-bottom-color: #3f3459; }
            td { border-bottom-color: #2c2440; }
            a { color: #f6f2fb; }
          }
        </style>
      </head>
      <body>
        <main>
          <h1>Plan du site</h1>
          <p class="lede">
            <span class="count"><xsl:value-of select="count(s:urlset/s:url)"/></span>
            <xsl:text> adresses déclarées aux moteurs de recherche. Cette mise en forme
            n'est visible que dans un navigateur : le fichier reste un sitemap XML
            standard.</xsl:text>
          </p>
          <div class="wrap">
            <table>
              <tr>
                <th>Adresse</th>
                <th>Langues</th>
                <th>Modifiée</th>
                <th>Priorité</th>
              </tr>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td>
                    <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                  </td>
                  <td class="langs">
                    <xsl:for-each select="x:link[@rel='alternate']">
                      <xsl:if test="position() &gt; 1"><xsl:text> · </xsl:text></xsl:if>
                      <xsl:value-of select="@hreflang"/>
                    </xsl:for-each>
                  </td>
                  <td class="meta"><xsl:value-of select="substring(s:lastmod, 1, 10)"/></td>
                  <td class="meta"><xsl:value-of select="s:priority"/></td>
                </tr>
              </xsl:for-each>
            </table>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
