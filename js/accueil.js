/* =================================================
   VERDURE – accueil.js
   Page index.html : catalogue, recherche, filtre, panier.
   Défis : J01, J02, J04, J06, J07, J08, J09, J10, J13
   Le tableau des plantes s'appelle « plantes » (voir plantes.js).
   ================================================= */

const catalogue = document.querySelector("#catalogue");

console.log(plantes)
for (let i = 0; i<plantes.length; i++) {
   const liste = document.createElement("article")
   liste.innerHTML = `<h2 data-plante-id=${plantes[i].id}>${plantes[i].nom} <a href=plante.html?id=${plantes[i].id}>Voir la fiche</a></h2>` 
   catalogue.append(liste)
}

const recherche = document.querySelector("#recherche").ariaValueMax.trim();


recherche.addEventListener("input", () => {
  
  var a = document.getElementById("#recherche").ariaValueText;
      
   }
} )