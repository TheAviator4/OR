/* =========================================================================
   ✦  EDIT YOUR INVITATION HERE  ✦
   This is the ONLY file you need to change. Replace the values in quotes.
   After editing, save and refresh the page (or re-push to update the live link).
   ========================================================================= */

window.INVITATION = {

  /* ---- The couple ---- */
  groom: "Omar",
  bride: "Raghad",

  /* ---- Date & time ----
     eventDate drives the countdown & "Add to calendar". ISO format w/ timezone:
       "YYYY-MM-DDTHH:MM:SS±HH:MM"
     17 July 2026, 8:00 PM, Egypt summer time (UTC+3). */
  eventDate: "2026-07-17T20:00:00+03:00",
  dateLong:  "Friday, 17th of July 2026",
  time:      "8:00 PM",
  durationHours: 4,            // used for the calendar event length

  /* ---- Venue ---- */
  venue:   "Al-Aziz Al-Hakim Mosque",
  address: "Al-Hakim Mosque, Al-Muizz Street, Cairo, Egypt",
  // Google Maps location link (tap = opens directions):
  mapUrl:  "https://www.google.com/maps/search/?api=1&query=Al-Hakim+Mosque+Al-Muizz+Cairo",

  /* ---- Dress code (ladies: summer colour palette) ---- */
  dress:     "Elegant & modest — summer colours",
  dressNote: "Ladies, we'd love a palette of soft summer hues (see below).",

  // Swatches shown to guests. Add/remove freely — { name, hex }.
  ladiesPalette: [
    { name: "Coral",     hex: "#FF8C7A" },
    { name: "Peach",     hex: "#FFC8A2" },
    { name: "Blush",     hex: "#F7C6CE" },
    { name: "Lemon",     hex: "#F6E27A" },
    { name: "Mint",      hex: "#A8D8C0" },
    { name: "Sky",       hex: "#A9D3E8" },
    { name: "Lavender",  hex: "#C7B8E6" },
    { name: "Sage",      hex: "#BFC9A0" }
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
