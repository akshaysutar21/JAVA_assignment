# Vivah Biodata Maker

A free Marathi and English marriage biodata maker. It's a static site with no backend: plain HTML, CSS and JavaScript.

## Features
- **Select format**: 8 original templates (Classic Red, Royal Maroon, Modern Teal, Floral Pink, Saffron Festive, Navy & Gold, Green Leaf, Minimal)
- Marathi and English interface with matching default fields
- Edit any label or value; add, remove or reorder fields and sections
- Photo upload, a god-symbol header and a custom heading
- Live A4 preview, then **Download PDF**, **Download image (PNG)** or **Print**
- Auto-saves to the visitor's browser; nothing is uploaded to a server

## Run locally
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000   # then visit http://localhost:8000

## Publish
Upload this folder to any static host:
- **Netlify / Cloudflare Pages / Vercel**: drag the `biodata-site` folder into the dashboard (no build command).
- **GitHub Pages**: put these files in a repo (root or `/docs`), then enable Pages in the repo's **Settings → Pages**.
- Then point your own domain at the host from its domain settings.

Before publishing, change the site name in `index.html` (the `<title>` and the `brand` strings in `app.js`).
