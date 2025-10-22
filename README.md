# DevPlayground — v0.2

Lightweight collection of embeddable developer widgets (Random Dev Quote, Dev Console) designed to be hosted on GitHub Pages and embedded into Google Sites, Notion, or any site that accepts an `<iframe>`.

Widgets are intentionally minimal and use a transparent background and `Courier New` / monospace styling to blend with host pages.

---

## Project structure

```
dev-playground/
│
├── api/
│   ├── quotes/
│   │   └── index.json
│   └── console/
│       ├── messages.json
│       └── ascii.json
│
├── widgets/
│   ├── random-quote.html
│   └── dev-console.html
│
├── assets/
│   ├── css/
│   │   └── base.css
│   └── js/
│       ├── quote.js
│       └── console.js
│
├── index.html
└── README.md
```

---

## Features
- Random quote widget (quotes stored in `api/quotes/index.json`)
- Dev console widget (pseudo-login, random messages, ASCII micro-animation)
- All content is static JSON + client-side JS — no backend required
- Perfect for embedding in Google Sites via iframe

---

## Deploy on GitHub Pages
1. Create repo `dev-playground` under your GitHub username.
2. Add files (preserve paths).
3. Push to `main` branch.
4. In repo Settings → Pages, choose branch `main`, folder `/root` and save.
5. GitHub Pages publishes at: `https://yourusername.github.io/dev-playground/`

---

## Embed examples (Google Sites)
Use **Insert → Embed → By URL** in Google Sites, and paste one of:
- `https://yourusername.github.io/dev-playground/widgets/random-quote.html`
- `https://yourusername.github.io/dev-playground/widgets/dev-console.html`

Or embed with an iframe in other HTML:

<iframe src="https://yourusername.github.io/dev-playground/widgets/random-quote.html"
     width="600" height="30" style="border:none;background:transparent;"></iframe>

Notes:
- For single-line quote widget, use a small height (e.g., height="30"); for console, use a larger height (e.g., height="250").
- All widgets use transparent backgrounds so they blend with your Google Site's #000 page background and font styles.

---

## Customize

Add or edit quotes in api/quotes/index.json.
Change console messages in `api/console/messages.json`.
Add more ASCII frames to `api/console/ascii.json`.
Tweak timing and behavior in `assets/js/console.js` and `assets/js/quote.js`.
Style adjustments in assets/css/base.css.

---

## Ideas for expansion

Add `/api/errors/index.json` with random (funny) error messages.
Add a tiny interactive terminal with a few read-only commands (help, joke, fortune) implemented client-side.
Provide an `/embed-generator` page that prints the iframe snippet with recommended width/height presets.

---

## License

MIT License — free to use, modify, and share.
Just keep the humor alive ✨

---

## Final notes & tips
- **Relative paths**: The widgets use relative fetch paths like `../api/...` so the structure must be preserved when you upload to GitHub Pages.
- **CORS**: GitHub Pages serves static files with appropriate headers and `fetch()` will work if the widget is hosted on the same GitHub Pages domain. Embedding into Google Sites via iframe is safe.
- **Heights**: For the quote widget, use a small iframe height (e.g., `height="28"`–`32`) so it looks inline. For console, `height="220"`–`350` depending on how much output you want visible.
- **Editing JSON**: You can edit `api/*.json` directly in GitHub UI to add new lines without redeploying.

---



