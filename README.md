# Omar & Raghad — Katb Ketab Invitation 💍

An elegant, animated, scrollable online invitation for a Katb Ketab.
Built as a single static site — no build step, no dependencies.

**Style:** Islamic / floral / elegant — deep emerald, warm gold, ivory cream.

## ✨ What's inside

- **Opening "envelope"** with a Bismillah and a tap-to-open seal
- **Animated hero** with the couple's names in a gold ornamental frame
- **Qur'anic verse** (Ar-Rum 30:21) with Arabic calligraphy
- **Live countdown** to the day, plus **Add to calendar** (Google + downloadable `.ics`)
- **Details cards** — when / where (with **map & directions**) / dress
- **Summer colour palette** swatches for the ladies' outfits
- **Photo gallery** (add your own pictures)
- **Background music** toggle (optional)
- Falling gold-petal animation, scroll-reveal effects, scroll progress bar
- Fully responsive + respects "reduce motion" accessibility settings

## ✏️ How to edit (the only file you touch)

Open **`config.js`** and change the values in quotes — names, date, venue,
map link, dress code, colour swatches, photos and music. Save, and that's it.

```js
groom: "Omar",
bride: "Raghad",
eventDate: "2026-07-17T20:00:00+03:00",   // drives the countdown & calendar
venue: "Al-Aziz Al-Hakim Mosque",
mapUrl: "https://www.google.com/maps/...", // the "Get directions" link
```

### Add your photos
Either paste online image links into the `gallery: [ ]` array, or drop files
into the `assets/` folder and reference them, e.g. `"assets/photo1.jpg"`.

### Add music
Put an `.mp3` at `assets/music.mp3` and set `musicUrl: "assets/music.mp3"`.

## 🌐 Hosting on GitHub Pages (free shareable link)

A deploy workflow is already included (`.github/workflows/deploy-pages.yml`).
To turn the link on, **once**:

1. Go to the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to the branch (already automated) — the site publishes in ~1 minute.

Your shareable link will be: **https://theaviator4.github.io/or/**

> Prefer the simplest path? Settings → Pages → Source: *Deploy from a branch* →
> pick this branch and `/ (root)` also works for a static site like this.

## 👀 Preview locally

Just open `index.html` in a browser, or run a tiny server:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```
