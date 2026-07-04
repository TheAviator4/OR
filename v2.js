/* Katb Ketab — Film version */
(function () {
  "use strict";
  var CFG = window.INVITATION || {};
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  /* config injection */
  $$("[data-config]").forEach(function (el) {
    var key = el.getAttribute("data-config");
    if (CFG[key] != null && CFG[key] !== "") el.textContent = CFG[key];
  });
  document.title = (CFG.groom || "") + " & " + (CFG.bride || "") + " — Katb Ketab";

  /* palette */
  (function () {
    var grid = $("#paletteGrid"), list = CFG.ladiesPalette || [];
    if (!grid || !list.length) return;
    grid.innerHTML = list.map(function (c) {
      return '<div class="swatch"><i style="background:' + c.hex + '"></i><b>' + c.name + "</b></div>";
    }).join("");
  })();

  /* map + calendar */
  (function () {
    var url = CFG.mapUrl && CFG.mapUrl.trim()
      ? CFG.mapUrl
      : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CFG.address || CFG.venue || "");
    var map = $("#mapBtn");
    if (map) { map.href = url; map.target = "_blank"; map.rel = "noopener"; }

    var cal = $("#calBtn");
    if (cal && CFG.eventDate) {
      var start = new Date(CFG.eventDate);
      var end = new Date(start.getTime() + (CFG.durationHours || 3) * 3600 * 1000);
      var fmt = function (d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); };
      cal.href = "https://www.google.com/calendar/render?action=TEMPLATE" +
        "&text=" + encodeURIComponent("Katb Ketab — " + (CFG.groom || "") + " & " + (CFG.bride || "")) +
        "&dates=" + fmt(start) + "/" + fmt(end) +
        "&location=" + encodeURIComponent(((CFG.venue || "") + ", " + (CFG.address || "")).replace(/^, |, $/g, "")) +
        "&details=" + encodeURIComponent("With joy, we invite you to our Katb Ketab.");
      cal.target = "_blank"; cal.rel = "noopener";
    }
  })();

  /* countdown */
  (function () {
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

  /* reveals */
  (function () {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  })();

  /* film portal: arch first, scroll steps inside (sound joins), then fade */
  (function () {
    var film = $("#film"), btn = $("#soundBtn"), icon = $("#soundIcon"),
        veil = $("#veil"), cue = $("#stageCue"), mask = $("#portalMask");
    if (!film || !mask) return;
    film.play && film.play().catch(function () {});

    /* sound: joins on the guest's first real gesture (their first scroll
       touch on mobile); the button always stays in control */
    var userMuted = false;
    function tryUnmute() {
      film.muted = false;
      film.play().catch(function () {});
      if (icon) icon.textContent = "🔊";
    }
    function gesture(e) {
      if (e.target && e.target.closest && e.target.closest("#soundBtn")) return;
      ["pointerdown", "touchstart", "keydown"].forEach(function (ev) {
        document.removeEventListener(ev, gesture);
      });
      if (!userMuted) tryUnmute();
    }
    ["pointerdown", "touchstart", "keydown"].forEach(function (ev) {
      document.addEventListener(ev, gesture, { passive: true });
    });
    if (btn) {
      btn.addEventListener("click", function () {
        film.muted = !film.muted;
        userMuted = film.muted;
        if (icon) icon.textContent = film.muted ? "🔇" : "🔊";
        if (!film.muted && film.paused) film.play().catch(function () {});
      });
    }

    var reducedM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedM) { if (veil) veil.style.opacity = ".7"; return; }

    /* scroll choreography (continuous rAF; immune to Safari scroll quirks):
       phase 1 (0 -> 1.15vh): the arch scales until the film fills the screen
       phase 2 (1.35vh -> 2.1vh): the cream veil fades the film back */
    var baseW = 0, baseH = 0, S = 1, lastY = -1;
    function smooth(t) { return t * t * (3 - 2 * t); }
    function apply(y) {
      var vh = window.innerHeight || 1;
      var t1 = smooth(Math.min(1, Math.max(0, y / (vh * 1.15))));
      var scale = 1 + t1 * (S - 1);
      mask.style.transform = "scale(" + scale.toFixed(4) + ")";
      var t2 = Math.min(1, Math.max(0, (y - vh * 1.35) / (vh * 0.75)));
      if (veil) veil.style.opacity = (t2 * 0.92).toFixed(3);
      if (cue) cue.style.opacity = Math.max(0, 1 - t1 * 2.4).toFixed(2);
    }
    function measure() {
      mask.style.transform = "none";
      var r = mask.getBoundingClientRect();
      baseW = r.width || 1; baseH = r.height || 1;
      // the mask top is a semicircular arch: keep scaling until the dome
      // circle contains the viewport's top corners (no cream wedges)
      var vw = window.innerWidth, vh = window.innerHeight;
      function covers(s) {
        var R = s * baseW / 2, H = s * baseH;
        var c = H / 2 - R;                    // dome-circle centre above mask centre
        var dx = vw / 2, dy = vh / 2 - c;
        if (dy <= 0) return dx <= s * baseW / 2;
        return dx * dx + dy * dy <= R * R;
      }
      S = Math.max(vw / baseW, vh / baseH);
      var guard = 0;
      while (!covers(S) && guard++ < 40) S *= 1.05;
      S *= 1.04;
      lastY = -1;
    }
    function loop() {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (y !== lastY) { lastY = y; apply(y); }
      requestAnimationFrame(loop);
    }
    var rT;
    window.addEventListener("resize", function () { clearTimeout(rT); rT = setTimeout(measure, 150); });
    measure();
    requestAnimationFrame(loop);
  })();
})();
