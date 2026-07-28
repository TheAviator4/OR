/* =========================================================================
   ✦  EDIT YOUR INVITATION HERE  ✦
   This is the ONLY file you need to change. Replace the values in quotes.
   After editing, save and refresh the page (or re-push to update the live link).
   ========================================================================= */

window.INVITATION = {

  /* ---- The couple ---- */
  groom: "Omar",
  bride: "Raghad",
  groomAr: "عمر",
  brideAr: "رغد",

  /* ---- Date & time ----
     eventDate drives the countdown & "Add to calendar". ISO format w/ timezone:
       "YYYY-MM-DDTHH:MM:SS±HH:MM"
     17 July 2026, 8:00 PM, Egypt summer time (UTC+3). */
  eventDate: "2026-07-17T20:00:00+03:00",
  dateLong:  "Friday, 17th of July 2026",
  time:      "8:00 PM",
  dateLongAr: "الجمعة، ١٧ يوليو ٢٠٢٦",
  timeAr:     "٨:٠٠ مساءً",
  durationHours: 4,            // used for the calendar event length

  /* ---- Venue ---- */
  venue:   "Al-Aziz Al-Hakim Mosque",
  address: "Al Abageyah, El Mokattam, Cairo, Egypt",
  venueAr:   "مسجد العزيز الحكيم",
  addressAr: "الأباجية، المقطم، القاهرة",
  // Google Maps location link (tap = opens directions):
  mapUrl:  "https://maps.app.goo.gl/KiraxrUkas2D9LPx5?g_st=ic",

  /* ---- Dress code (ladies: summer colour palette) ---- */
  dress:     "Elegant & modest — summer colours",
  dressAr:   "أناقة واحتشام — ألوان صيفية",
  dressNote: "Ladies, we'd love a palette of soft summer hues (see below).",

  // Swatches shown to guests. Add/remove freely — { name, hex }.
  // Pantone garden palette: Celebration / Golden Cypress / Sangria Sunset /
  // Lemon Drop / Golden Poppy / Nantucket Breeze.
  ladiesPalette: [
    { name: "Celebration",      nameAr: "عنّابي",   hex: "#820043" },
    { name: "Golden Cypress",   nameAr: "زيتوني",   hex: "#7D7F2E" },
    { name: "Sangria Sunset",   nameAr: "وردي",     hex: "#EC6FA1" },
    { name: "Lemon Drop",       nameAr: "ليموني",   hex: "#F9E27D" },
    { name: "Golden Poppy",     nameAr: "برتقالي",  hex: "#F2903D" },
    { name: "Nantucket Breeze", nameAr: "سماوي",    hex: "#B7D1EA" }
  ],

  /* ---- Hashtag (optional, set "" to hide) ---- */
  hashtag: "#OmarAndRaghad",

  /* ---- Photo gallery ----
     Add image URLs (online links work great — Unsplash, Google Photos direct
     links, or push your own files to /assets and use "assets/1.jpg").
     Leave the array empty [] to hide the gallery entirely. */
  gallery: [
    // "assets/photo1.jpg",
    // "https://images.unsplash.com/photo-xxxx",
  ],

  /* ---- Background music (optional) ----
     Put an mp3 at assets/music.mp3 and set url to "assets/music.mp3",
     or paste a direct .mp3 URL. Leave "" to hide the music button. */
  musicUrl: ""
};
