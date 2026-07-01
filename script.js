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

  // Monogram initials
  (function monogram() {
    var g = $("#mono-g"), b = $("#mono-b");
    if (g && CFG.groom) g.textContent = CFG.groom.trim().charAt(0).toUpperCase();
    if (b && CFG.bride) b.textContent = CFG.bride.trim().charAt(0).toUpperCase();
  })();

  /* ---------- 2. Ladies' colour palette ---------- */
  (function renderPalette() {
    var grid = $("#paletteGrid");
    var list = CFG.ladiesPalette || [];
    if (!grid) return;
    if (!list.length) { var sec = $("#palette"); if (sec) sec.style.display = "none"; return; }
    grid.innerHTML = list.map(function (c, i) {
      return '<div class="swatch" style="--i:' + i + '">' +
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
    var setNum = function (el, val) {
      if (el.textContent === String(val)) return;
      el.textContent = val;
      el.classList.remove("tick");
      void el.offsetWidth; // restart animation
      el.classList.add("tick");
    };
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        if (grid) grid.style.display = "none";
        if (msg) msg.hidden = false;
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      setNum(els.d, Math.floor(s / 86400));
      setNum(els.h, pad(Math.floor((s % 86400) / 3600)));
      setNum(els.m, pad(Math.floor((s % 3600) / 60)));
      setNum(els.s, pad(s % 60));
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
    // Hold reveals until the envelope is opened, so no animation plays unseen
    // behind the overlay; opening() calls __startReveals.
    window.__startReveals = function () {
      document.body.classList.add("opened");
      $$(".reveal").forEach(function (el) { io.observe(el); });
    };
    if (!$("#opening")) window.__startReveals();

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
    var N = window.innerWidth < 600 ? 12 : 20;
    for (var i = 0; i < N; i++) {
      var p = document.createElement("span");
      p.className = "petal " + (i % 3 === 0 ? "petal--leaf" : "petal--blossom");
      p.style.left = ((i * 53) % 100) + "%";
      p.style.animationDuration = (10 + (i % 8)) + "s";
      p.style.animationDelay = "-" + (i * 1.3) + "s";
      var scale = 0.7 + ((i * 17) % 60) / 100;
      p.style.transform = "scale(" + scale.toFixed(2) + ")";
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

  /* ---------- 10. Opening overlay (break the seal) ---------- */
  (function opening() {
    var overlay = $("#opening"), btn = $("#openBtn");
    document.body.style.overflow = "hidden";
    if (!overlay || !btn) { document.body.style.overflow = ""; return; }
    btn.addEventListener("click", function () {
      overlay.classList.add("opening--break");
      if (window.__startMusic) window.__startMusic();
      setTimeout(function () {
        overlay.classList.add("opening--hidden");
        document.body.style.overflow = "";
        if (window.__startReveals) window.__startReveals();
      }, 800);
      setTimeout(function () { overlay.style.display = "none"; }, 1900);
    });
  })();

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 11. Gold sparkles in the hero ---------- */
  (function sparkles() {
    var hero = $("#hero");
    if (!hero || reduced) return;
    var N = window.innerWidth < 600 ? 9 : 16;
    for (var i = 0; i < N; i++) {
      var s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = "✦";
      s.style.left = (6 + (i * 61) % 88) + "%";
      s.style.top  = (8 + (i * 37) % 80) + "%";
      s.style.animationDelay = ((i * 0.47) % 3.2).toFixed(2) + "s";
      s.style.fontSize = (9 + (i * 13) % 9) + "px";
      hero.appendChild(s);
    }
  })();

  /* ---------- 12. Gentle scroll parallax on botanicals ---------- */
  (function parallax() {
    if (reduced) return;
    var items = $$(".hero .sprig, .sprig--center, .lily--solo");
    if (!items.length) return;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || 0;
      items.forEach(function (el, i) {
        var rate = (i % 2 === 0 ? 0.10 : -0.07);
        el.style.setProperty("--py", (y * rate).toFixed(1) + "px");
      });
    }
    document.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  })();
})();
