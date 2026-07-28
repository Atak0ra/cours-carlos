# Cours de SOUZA — Site vitrine

Landing page pour **Cours de SOUZA**, centre de préparation au BEPC et au CEPD en candidat libre à Lomé, Togo.

## Stack

- HTML5 sémantique, CSS3 mobile-first, JavaScript vanilla (zéro dépendance)
- Déployé sur **Vercel** : https://cours-carlos.vercel.app

## Structure

```
index.html      — Page unique (landing page)
style.css       — Feuille de style (mobile-first, palette institutionnelle)
script.js       — Menu mobile, animation canvas hero, toggle métiers
robots.txt      — Directives pour les robots d'indexation
sitemap.xml     — Plan du site pour Google
vercel.json     — Headers de sécurité HTTP
og-image.svg    — Image de partage Open Graph (1200×630) — à remplacer par un PNG
```

## Déploiement

Le site se déploie automatiquement sur Vercel à chaque push sur la branche `main`.

```bash
git add .
git commit -m "votre message"
git push
```

## Image de partage (og:image)

Le fichier `og-image.svg` est une image de partage provisoire.  
Pour un résultat optimal sur WhatsApp/Facebook, remplacez-le par un fichier **`og-image.png`** (1200 × 630 px).  
Mettez à jour la balise `og:image` dans `index.html` si vous changez le nom du fichier.

## Analytics (optionnel)

Pour activer Vercel Analytics :
1. Activez-le dans le dashboard Vercel (onglet Analytics de votre projet)
2. Ajoutez ce script juste avant `</body>` dans `index.html` :

```html
<script defer src="/_vercel/insights/script.js"></script>
```

## Contact

WhatsApp : +228 92 17 87 26
