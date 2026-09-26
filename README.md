# ravenarcgroup.com

Static website for RavenArc, deployed on Netlify from this repository.

- `index.html`, `style.css`, `script.js`: the home page.
- `insights/<name>.html`: articles, served at the short address `/insights/<name>` (see the redirects in `netlify.toml`). Keep names to two or three words.
- `script.js`: the Perspectives (`ARTICLES`) and Capabilities (`CAPS`) lists.
- `images/`: logos and photos (see `images/readme.txt` for photo file names).

Changes merged into `main` are published by Netlify automatically. Pull requests get a Netlify deploy preview.
