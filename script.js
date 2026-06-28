/* =========================================================================
   Katb Ketab Invitation — interactions
   ========================================================================= */
(function () {
  "use strict";
  var CFG = window.INVITATION || {};
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- 1. Inject text from config ---------- */
  $$("[data-config]").forEach(function (el) {
    var key = el.getAttribute("data-config");
    if (CFG[key] != null && CFG[key] !== "") el.textContent = CFG[key];
  });
  document.title = (CFG.groom || "") + " & " + (CFG.bride || "") + " — Katb Ketab";

  /* ---------- 2. Ladies' colour palette ---------- */
  (function renderPalette() {
    var grid = $("#paletteGrid");
    var list = CFG.ladiesPalette || [];
    if (!grid) return;
    if (!list.length) { var sec = $("#palette"); if (sec) sec.style.display = "none"; return; }
    grid.innerHTML = list.map(function (c) {
      return '<div class="swatch">' +
               '<div class="swatch__chip" style="background:' + c.hex + '"></div>' +
               '<span class="swatch__name">' + c.name + '</span>' +
               '<span class="swatch__hex">' + c.hex + '</span>' +
             '</div>';
    }).join("");
  })();

  /* ---------- 3. Photo gallery ---------- */
  (function renderGallery() {
    var grid = $("#galleryGrid");
    var imgs = CFG.gallery || [];
    if (!grid) return;
    if (!imgs.length) {
      grid.innerHTML = '<div class="gallery__empty">Your photos will appear here — add image links in <strong>config.js</strong>.</div>';
      return;
    }
    grid.innerHTML = imgs.map(function (src, i) {
      return '<figure class="gallery__item"><img loading="lazy" src="' + src +
             '" alt="Our moment ' + (i + 1) + '" /></figure>';
    }).join("");
  })();

  /* ---------- 4. Map / directions link ---------- */
  (function setupMap() {
    var url = CFG.mapUrl && CFG.mapUrl.trim()
      ? CFG.mapUrl
      : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CFG.address || CFG.venue || "");
    $$("#mapBtn").forEach(function (a) { a.href = url; a.target = "_blank"; a.rel = "noopener"; });
  })();

  /* ---------- 5. Countdown ---------- */
  (function countdown() {
    var target = CFG.eventDate ? new Date(CFG.eventDate).getTime() : NaN;
    var els = { d: $("#cd-days"), h: $("#cd-hours"), m: $("#cd-mins"), s: $("#cd-secs") };
    var grid = $("#countdownGrid"), msg = $("#countdownMsg");
    if (isNaN(target) || !els.d) return;
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        if (grid) grid.style.display = "none";
        if (msg) msg.hidden = false;
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      els.d.textContent = Math.floor(s / 86400);
      els.h.textContent = pad(Math.floor((s % 86400) / 3600));
      els.m.textContent = pad(Math.floor((s % 3600) / 60));
      els.s.textContent = pad(s % 60);
    }
    tick();
    var timer = setInterval(tick, 1000);
  })();

  /* ---------- 6. Add to calendar (Google + downloadable .ics) ---------- */
  (function calendar() {
    var btn = $("#calBtn");
    if (!btn || !CFG.eventDate) return;
    var start = new Date(CFG.eventDate);
    var end = new Date(start.getTime() + (CFG.durationHours || 3) * 3600 * 1000);
    function fmt(d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
    var title = "Katb Ketab — " + (CFG.groom || "") + " & " + (CFG.bride || "");
    var loc = ((CFG.venue || "") + ", " + (CFG.address || "")).replace(/^, |, $/g, "");
    var details = "With joy, we invite you to our Katb Ketab.";

    var gcal = "https://www.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(title) +
      "&dates=" + fmt(start) + "/" + fmt(end) +
      "&location=" + encodeURIComponent(loc) +
      "&details=" + encodeURIComponent(details);

    var ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//KatbKetab//EN", "BEGIN:VEVENT",
      "UID:" + fmt(start) + "@katbketab", "DTSTART:" + fmt(start), "DTEND:" + fmt(end),
      "SUMMARY:" + title, "LOCATION:" + loc, "DESCRIPTION:" + details, "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");

    // On desktop use Google Calendar; offer the .ics for Apple/Outlook via long-press/right-click context.
    btn.href = gcal;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      var blob = new Blob([ics], { type: "text/calendar" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "katb-ketab.ics";
      a.click();
    });
  })();

  /* ---------- 7. Scroll reveal + progress ---------- */
  (function scrollFx() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    $$(".reveal").forEach(function (el) { io.observe(el); });

    var bar = $("#progress");
    function onScroll() {
      var h = document.documentElement;
      var p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar) bar.style.width = (p * 100) + "%";
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* ---------- 8. Falling petals ---------- */
  (function petals() {
    var layer = $("#petals");
    if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var N = window.innerWidth < 600 ? 10 : 18;
    for (var i = 0; i < N; i++) {
      var p = document.createElement("span");
      p.className = "petal";
      var size = 8 + Math.floor((i * 37) % 12);
      p.style.left = ((i * 53) % 100) + "%";
      p.style.width = p.style.height = size + "px";
      p.style.animationDuration = (9 + (i % 7)) + "s";
      p.style.animationDelay = "-" + (i * 1.3) + "s";
      p.style.opacity = "0";
      layer.appendChild(p);
    }
  })();

  /* ---------- 9. Background music ---------- */
  (function music() {
    var btn = $("#musicBtn"), audio = $("#bgAudio");
    if (!CFG.musicUrl || !btn || !audio) return;
    audio.src = CFG.musicUrl;
    btn.hidden = false;
    var playing = false;
    function toggle() {
      if (playing) { audio.pause(); btn.classList.remove("playing"); }
      else { audio.play().catch(function () {}); btn.classList.add("playing"); }
      playing = !playing;
    }
    btn.addEventListener("click", toggle);
    // Try to start when the invitation is opened (after a user gesture).
    window.__startMusic = function () { if (!playing) toggle(); };
  })();

  /* ---------- 10. Opening overlay ---------- */
  (function opening() {
    var overlay = $("#opening"), btn = $("#openBtn");
    document.body.style.overflow = "hidden";
    if (!overlay || !btn) { document.body.style.overflow = ""; return; }
    btn.addEventListener("click", function () {
      overlay.classList.add("opening--hidden");
      document.body.style.overflow = "";
      if (window.__startMusic) window.__startMusic();
      setTimeout(function () { overlay.style.display = "none"; }, 1000);
    });
  })();
})();
