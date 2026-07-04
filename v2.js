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

  /* film: sound toggle + pause when offscreen */
  (function () {
    var film = $("#film"), btn = $("#soundBtn"), icon = $("#soundIcon");
    if (!film) return;
    film.play && film.play().catch(function () {});
    document.addEventListener("touchstart", function once() {
      if (film.paused) film.play().catch(function () {});
      document.removeEventListener("touchstart", once);
    }, { once: true, passive: true });

    if (btn) {
      btn.addEventListener("click", function () {
        film.muted = !film.muted;
        if (icon) icon.textContent = film.muted ? "🔇" : "🔊";
        if (!film.muted && film.paused) film.play().catch(function () {});
      });
    }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { film.play().catch(function () {}); }
        else film.pause();
      });
    }, { threshold: 0.1 }).observe(film);
  })();
})();
