# ravenarcgroup.com

Static website for RavenArc, deployed on Cloudflare Pages from this repository (Netlify until September 2026).

- `index.html`, `style.css`, `script.js`: the home page.
- `insights/<name>.html`: articles, served at the short address `/insights/<name>` (Cloudflare Pages serves clean addresses automatically; `netlify.toml` holds the Netlify equivalents). Keep names to two or three words.
- `script.js`: the Perspectives (`ARTICLES`) and Capabilities (`CAPS`) lists.
- `images/`: logos and photos (see `images/readme.txt` for photo file names).

Changes merged into `main` are published by Cloudflare Pages automatically, and pull requests get a preview link.
`_redirects` holds permanent redirects and `_headers` the security headers; both work on Cloudflare Pages and Netlify.
