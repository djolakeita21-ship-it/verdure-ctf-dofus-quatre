/* =================================================
   VERDURE – commun.js
   Chargé sur toutes les pages, après plantes.js et AVANT
   le script de la page. Ce qui est écrit ici est utilisable
   dans accueil.js, fiche.js et contact.js.
   ================================================= */

/* ---------- Deux outils fournis, prêts à l'emploi ---------- */

// Formate un prix : euros(24.9) renvoie "24,90 €"
function euros(nombre) {
  return nombre.toFixed(2).replace(".", ",") + " €";
}

// Lit l'id dans l'adresse de la page.
// Sur plante.html?id=3, idDansURL() renvoie le nombre 3.
function idDansURL() {
  return Number(new URLSearchParams(location.search).get("id"));
}

/* ---------- Votre code commun à toutes les pages ---------- */
// Défi J03 : le bouton #bouton-theme est sur toutes les pages.

// theme noir
const theme = document.querySelector("#bouton-theme");
const body = document.querySelector("body")

theme.addEventListener("click", ()=> {
  body.classList.toggle("sombre")
})