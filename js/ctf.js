/* =================================================================
   VERDURE CTF – vérificateur automatique des défis
   NE PAS MODIFIER CE FICHIER.
   Il observe votre page, vérifie chaque défi et affiche un flag
   quand le défi est réussi. Il doit être chargé en dernier,
   sur toutes les pages.
   ================================================================= */
(function () {
  "use strict";

  var SEL = atob(["dnJkLWN0", "Zi0yMDI2LWs3cQ=="].join(""));
  var DEFIS = [
    { id: "J01", titre: "Afficher le nombre de plantes", pts: 100 },
    { id: "J02", titre: "Catalogue créé depuis le tableau", pts: 100 },
    { id: "J03", titre: "Bouton thème sombre", pts: 100 },
    { id: "J04", titre: "Chaque carte mène à sa fiche", pts: 100 },
    { id: "J05", titre: "Fiche remplie selon l’URL", pts: 200 },
    { id: "J06", titre: "Ajouter au panier", pts: 200 },
    { id: "J07", titre: "Total du panier", pts: 200 },
    { id: "J08", titre: "Recherche en direct", pts: 200 },
    { id: "J09", titre: "Filtre par difficulté", pts: 300 },
    { id: "J10", titre: "Vider le panier", pts: 300 },
    { id: "J11", titre: "Formulaire : message d’erreur", pts: 300 },
    { id: "J12", titre: "Formulaire : confirmation", pts: 300 },
    { id: "J13", titre: "Retirer un article du panier", pts: 500 }
  ];

  var groupe = String(window.CTF_GROUPE || "").trim().toLowerCase();
  var groupeOk = groupe !== "" && groupe !== "a-renseigner";

  /* ---------- outils ---------- */
  function hash(s) {
    var bytes = new TextEncoder().encode(s), x = 0x811c9dc5;
    for (var i = 0; i < bytes.length; i++) { x ^= bytes[i]; x = Math.imul(x, 0x01000193) >>> 0; }
    return ("0000000" + x.toString(16)).slice(-8);
  }
  function flag(id) { return "VERDURE{" + id + "-" + hash(groupe + "|" + id + "|" + SEL) + "}"; }
  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function txt(el) { return el ? (el.textContent || "").trim() : ""; }
  function norm(s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }
  function num(t) {
    var m = String(t).replace(/\s/g, "").replace(",", ".").match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
  }
  function approx(a, b) { return Math.abs(a - b) < 0.011; }
  function visible(el) {
    if (!el) return false;
    var st = getComputedStyle(el);
    return st.visibility !== "hidden" && st.display !== "none" && el.getClientRects().length > 0;
  }
  function memeListe(a, b) {
    if (a.length !== b.length) return false;
    var x = a.slice().sort(), y = b.slice().sort();
    return x.every(function (v, i) { return v === y[i]; });
  }

  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (page.indexOf(".") === -1) page = "index.html";

  // Copie des données au démarrage (les modifier ne change rien ici)
  var data = null;
  try { data = JSON.parse(JSON.stringify(plantes)); } catch (e) { data = null; }

  var sombre0 = document.body.classList.contains("sombre");
  var aClique = false, maxLignes = 0, envoi = null;
  document.addEventListener("click", function () { aClique = true; }, true);
  document.addEventListener("submit", function () {
    envoi = {
      nom: (qs("#contact-nom") || {}).value || "",
      email: (qs("#contact-email") || {}).value || "",
      message: (qs("#contact-message") || {}).value || ""
    };
  }, true);

  function parId(id) { return data.find(function (p) { return p.id === id; }); }
  function attendusCatalogue() {
    var r = qs("#recherche"), f = qs("#filtre-difficulte");
    var v = r ? r.value.trim().toLowerCase() : "";
    var d = f ? f.value : "";
    return data.filter(function (p) {
      var okR = v === "" || p.nom.toLowerCase().indexOf(v) !== -1;
      var okF = ["facile", "intermediaire", "expert"].indexOf(d) === -1 || p.difficulte === d;
      return okR && okF;
    }).map(function (p) { return p.id; });
  }
  // Seuls les éléments les plus extérieurs comptent : un bouton à l’intérieur
  // d’une carte peut porter le même attribut sans fausser le décompte.
  function exterieurs(attr) {
    return qsa("[" + attr + "]").filter(function (el) {
      return !(el.parentElement && el.parentElement.closest("[" + attr + "]"));
    });
  }
  function cartesVisibles() {
    return exterieurs("data-plante-id").filter(visible).map(function (c) { return Number(c.getAttribute("data-plante-id")); });
  }
  function lignes() {
    return exterieurs("data-ligne-id").filter(visible).map(function (l) { return Number(l.getAttribute("data-ligne-id")); });
  }
  function lignesValides(l) { return l.every(function (id) { return !!parId(id); }); }
  function total(l) { return Math.round(l.reduce(function (s, id) { return s + parId(id).prix; }, 0) * 100) / 100; }
  function panierCoherent(l) {
    return lignesValides(l) &&
      num(txt(qs("#compteur-panier"))) === l.length &&
      approx(num(txt(qs("#panier-total"))), total(l));
  }
  function champsRemplis(e) {
    return e && e.nom.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email.trim()) && e.message.trim() !== "";
  }

  /* ---------- les défis ---------- */
  var tests = {
    J01: function () {
      return page === "index.html" && num(txt(qs("#nb-plantes"))) === data.length;
    },
    J02: function () {
      if (page !== "index.html") return false;
      var ids = new Set(qsa("[data-plante-id]").map(function (c) { return Number(c.getAttribute("data-plante-id")); }));
      return data.every(function (p) { return ids.has(p.id); });
    },
    J03: function () {
      return !sombre0 && aClique && document.body.classList.contains("sombre");
    },
    J04: function () {
      if (page !== "index.html") return false;
      var hrefs = qsa("[data-plante-id] a[href], a[href][data-plante-id]").map(function (a) { return a.getAttribute("href"); });
      return data.every(function (p) {
        var re = new RegExp("plante\\.html\\?id=" + p.id + "(?!\\d)");
        return hrefs.some(function (h) { return re.test(h); });
      });
    },
    J05: function () {
      if (page !== "plante.html") return false;
      var p = parId(Number(new URLSearchParams(location.search).get("id")));
      return !!p && norm(txt(qs("#plante-nom"))) === norm(p.nom) && approx(num(txt(qs("#plante-prix"))), p.prix);
    },
    J06: function () {
      if (page !== "index.html") return false;
      var l = lignes();
      return l.length >= 1 && lignesValides(l) && num(txt(qs("#compteur-panier"))) === l.length;
    },
    J07: function () {
      if (page !== "index.html") return false;
      var l = lignes();
      return l.length >= 2 && panierCoherent(l);
    },
    J08: function () {
      if (page !== "index.html" || !qs("#recherche") || qs("#recherche").value.trim().length < 2) return false;
      var att = attendusCatalogue();
      return att.length >= 1 && att.length < data.length && memeListe(cartesVisibles(), att);
    },
    J09: function () {
      var f = qs("#filtre-difficulte");
      if (page !== "index.html" || !f || ["facile", "intermediaire", "expert"].indexOf(f.value) === -1) return false;
      var att = attendusCatalogue();
      return att.length >= 1 && att.length < data.length && memeListe(cartesVisibles(), att);
    },
    J10: function () {
      if (page !== "index.html" || maxLignes < 1) return false;
      return lignes().length === 0 && num(txt(qs("#compteur-panier"))) === 0 && num(txt(qs("#panier-total"))) === 0;
    },
    J11: function () {
      if (page !== "contact.html" || !envoi || champsRemplis(envoi)) return false;
      var e = qs("#contact-erreur");
      return visible(e) && txt(e).length >= 5 && !visible(qs("#contact-confirmation"));
    },
    J12: function () {
      if (page !== "contact.html" || !champsRemplis(envoi)) return false;
      var c = qs("#contact-confirmation");
      return visible(c) && norm(txt(c)).indexOf(norm(envoi.nom)) !== -1;
    },
    J13: function () {
      if (page !== "index.html" || maxLignes < 2) return false;
      var l = lignes();
      return l.length >= 1 && l.length < maxLignes && panierCoherent(l);
    }
  };

  /* ---------- mémoire des flags ---------- */
  function lireFlags() {
    try {
      var m = JSON.parse(localStorage.getItem("ctf-flags"));
      return m && m.groupe === groupe ? m.flags : {};
    } catch (e) { return {}; }
  }
  var trouves = lireFlags();
  function enregistrer() {
    try { localStorage.setItem("ctf-flags", JSON.stringify({ groupe: groupe, flags: trouves })); } catch (e) { /* rien */ }
  }

  /* ---------- panneau d’affichage (isolé du CSS de la page) ---------- */
  var racine, ouvert = false, dernier = null;
  function creerPanneau() {
    var hote = document.createElement("div");
    hote.setAttribute("data-ctf", "");
    hote.style.cssText = "position:fixed;left:16px;bottom:16px;z-index:2147483647";
    racine = hote.attachShadow({ mode: "open" });
    document.body.appendChild(hote);
    rendre();
  }
  function rendre() {
    var n = Object.keys(trouves).length;
    var pts = DEFIS.reduce(function (s, d) { return s + (trouves[d.id] ? d.pts : 0); }, 0);
    var css = "<style>*{box-sizing:border-box;margin:0;font-family:ui-monospace,Menlo,Consolas,monospace}" +
      ".b{background:#141B26;color:#F5F3EE;border:2px solid #F0C33C;border-radius:10px;padding:8px 12px;font-size:13px;cursor:pointer;max-width:520px;box-shadow:0 6px 18px rgba(0,0,0,.35)}" +
      ".t{color:#F0C33C;font-weight:700}.l{margin-top:8px;max-height:46vh;overflow:auto}" +
      ".r{display:flex;gap:8px;padding:3px 0;border-top:1px solid #2C3A4D}.ok{color:#9BD49B}.ko{color:#7D8798}" +
      ".f{user-select:all;color:#F0C33C}.n{animation:p 1s 3}@keyframes p{50%{background:#F0C33C;color:#141B26}}</style>";
    var html;
    if (!data) {
      html = '<div class="b"><span class="t">CTF Verdure</span> · données introuvables : vérifiez que js/plantes.js est bien chargé</div>';
    } else if (!groupeOk) {
      html = '<div class="b"><span class="t">CTF Verdure</span> · renseignez votre nom de groupe dans js/ctf-config.js</div>';
    } else {
      html = '<div class="b' + (dernier ? " n" : "") + '"><span class="t">CTF Verdure</span> · ' + groupe +
        " · " + n + "/" + DEFIS.length + " · " + pts + " pts " + (ouvert ? "▾" : "▸");
      if (ouvert) {
        html += '<div class="l">' + DEFIS.map(function (d) {
          return '<div class="r"><span class="' + (trouves[d.id] ? "ok" : "ko") + '">' + d.id + "</span><span>" +
            (trouves[d.id] ? '<span class="f">' + trouves[d.id] + "</span>" : '<span class="ko">' + d.titre + " · " + d.pts + " pts</span>") +
            "</span></div>";
        }).join("") + "</div>";
      }
      html += "</div>";
    }
    racine.innerHTML = css + html;
    racine.querySelector(".b").onclick = function (e) {
      if (e.target.classList.contains("f")) return;
      ouvert = !ouvert; dernier = null; rendre();
    };
  }

  /* ---------- boucle de vérification ---------- */
  function verifier() {
    if (!groupeOk || !data) return;
    maxLignes = Math.max(maxLignes, lignes().length);
    var nouveau = false;
    DEFIS.forEach(function (d) {
      if (trouves[d.id]) return;
      var ok = false;
      try { ok = tests[d.id](); } catch (e) { ok = false; }
      if (ok) {
        trouves[d.id] = flag(d.id);
        nouveau = true; dernier = d.id;
        console.log("%c🚩 " + d.id + " réussi : " + trouves[d.id], "color:#F0C33C;font-weight:bold");
      }
    });
    if (nouveau) { enregistrer(); rendre(); }
  }

  creerPanneau();
  setInterval(verifier, 500);
  ["input", "change", "click", "submit"].forEach(function (t) {
    document.addEventListener(t, function () { setTimeout(verifier, 120); }, true);
  });
  verifier();
})();
