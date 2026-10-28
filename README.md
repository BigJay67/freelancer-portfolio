# Makinde James — Portfolio

A personal portfolio for Makinde James, built with semantic HTML, responsive CSS, and vanilla JavaScript. No install step, build process, or runtime dependencies. Compatible with GitHub Pages and other static hosts.

## Preview locally

From the project directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open <http://127.0.0.1:4173>. The core content and navigation also work without JavaScript. JavaScript adds project filtering, project detail dialogs, mobile menu controls, and copying the email address.

## Editing

- `index.html`: biography, contact links, featured project cards, search/social metadata, and structured data.
- `style.css`: design tokens, layouts, component styling, responsive breakpoints, and reduced-motion support.
- `script.js`: project detail content and interaction behavior. Keep project details aligned with the corresponding HTML cards.
- `images/projects/`: cropped and compressed WebP screenshots, responsive variants, and portrait. Original images remain in `images/`.
- `assets/favicon.svg`: personal monogram.

The site uses Manrope and DM Mono from Google Fonts, with local sans-serif and monospace fallbacks. All application assets are served locally.

## Project selection

The main projects are FlowBase, HomeBase, and Mama Put. Passenger Counter is identified as an early JavaScript learning exercise. Project descriptions were checked against public repository documentation and the previous portfolio. All three main demo URLs returned HTTP 200 on October 28, 2026.

Public source links are provided for HomeBase, Mama Put, and Passenger Counter. FlowBase has a live demo link; its private source repository is not linked. Mama Put is explicitly presented as a restaurant concept.

## Contact behavior

Email links open the visitor’s email application. WhatsApp opens the existing contact conversation link. Copy email uses the Clipboard API where available and explains the fallback when access is unavailable. No messages are collected or silently submitted, and no backend or credentials are needed.

## Checks

```sh
node --check script.js
git diff --check
```

Browser QA covers desktop and phone layouts, horizontal overflow, loaded images, project filtering, project dialogs and Escape/focus restoration, mobile navigation, and contact link destinations. Navigation and project links are standard anchors. Dialogs use the native `<dialog>` element; unsupported browsers retain project links and hide the detail buttons.

To publish, serve the repository root as a static website. There is no generated output directory.
