/* =========================================================================
   ✦  EDIT YOUR INVITATION HERE  ✦
   This is the ONLY file you need to change. Replace the values in quotes.
   After editing, save and refresh the page (or re-push to update the live link).

   This is a fresh copy — independent from the invitation in the repo root.
   Edit the placeholders below for the new couple.
   ========================================================================= */

window.INVITATION = {

  /* ---- The couple ---- */
  groom: "Groom",
  bride: "Bride",
  groomAr: "العريس",
  brideAr: "العروس",

  /* ---- Date & time ----
     eventDate drives the countdown & "Add to calendar". ISO format w/ timezone:
       "YYYY-MM-DDTHH:MM:SS±HH:MM"
     Egypt summer time is UTC+3. */
  eventDate: "2026-12-31T20:00:00+03:00",
  dateLong:  "Thursday, 31st of December 2026",
  time:      "8:00 PM",
  dateLongAr: "الخميس، ٣١ ديسمبر ٢٠٢٦",
  timeAr:     "٨:٠٠ مساءً",
  durationHours: 4,            // used for the calendar event length

  /* ---- Venue ---- */
  venue:   "Venue Name",
  address: "Venue address, City",
  venueAr:   "اسم القاعة",
  addressAr: "العنوان، المدينة",
  // Google Maps location link (tap = opens directions):
  mapUrl:  "https://maps.google.com/",

  /* ---- Dress code (ladies: summer colour palette) ---- */
  dress:     "Elegant & modest — summer colours",
  dressAr:   "أناقة واحتشام — ألوان صيفية",
  dressNote: "Ladies, we'd love a palette of soft summer hues (see below).",

  // Swatches shown to guests. Add/remove freely — { name, hex }.
  ladiesPalette: [
    { name: "Celebration",      nameAr: "عنّابي",   hex: "#820043" },
    { name: "Golden Cypress",   nameAr: "زيتوني",   hex: "#7D7F2E" },
    { name: "Sangria Sunset",   nameAr: "وردي",     hex: "#EC6FA1" },
    { name: "Lemon Drop",       nameAr: "ليموني",   hex: "#F9E27D" },
    { name: "Golden Poppy",     nameAr: "برتقالي",  hex: "#F2903D" },
    { name: "Nantucket Breeze", nameAr: "سماوي",    hex: "#B7D1EA" }
  ],

  /* ---- Hashtag (optional, set "" to hide) ---- */
  hashtag: "",

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
