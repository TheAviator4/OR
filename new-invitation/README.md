# New Wedding Invitation 💍

A fresh, independent copy of the invitation template — separate from the
invitation in the repository root, which is untouched.

This folder is fully self-contained: it has its own `index.html`, `ar.html`,
`config.js`, styles, scripts, and `assets/`. Editing anything here does **not**
affect the root invitation, and vice versa.

## ✏️ How to customise

Open **`config.js`** and replace the placeholder values in quotes — the
couple's names, date, venue, map link, dress code, colour swatches, photos
and music. Save and refresh.

```js
groom: "Groom",
bride: "Bride",
eventDate: "2026-12-31T20:00:00+03:00",  // drives the countdown & calendar
venue: "Venue Name",
mapUrl: "https://maps.google.com/",       // the "Get directions" link
```

### Replace the visuals
The `assets/` folder currently holds copies of the original film and share
images. Swap them for the new couple's own files (keep the same file names),
or point to new paths in `config.js` / the HTML.

## 👀 Preview locally

Open `new-invitation/index.html` in a browser, or run a tiny server from the
repo root and visit the subfolder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000/new-invitation/
```
