Hajar App — PWA Setup

How to test the Progressive Web App locally:

- Serve the project from the project root (required for service worker scope). From the `hajar-app` folder run:

```bash
python3 -m http.server 8000
```

- Open http://localhost:8000 in your browser. Service workers require HTTPS or `localhost`.

- The app includes `manifest.json` and a basic `service-worker.js` that precaches core pages and images. To see install prompts, open Chrome DevTools > Application > Manifest and Service Workers sections.

Notes:
- Icons are in `images/icon-192.png` and `images/icon-512.png`.
- If you rename or move files, update `manifest.json` and HTML links accordingly.
