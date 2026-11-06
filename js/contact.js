/* =================================================
   VERDURE – contact.js
   Page contact.html : vérifier le formulaire avant l'envoi.
   Défis : J11, J12
   ================================================= */

const contact = document.querySelector("#contact")

contact.addEventListener("submit", (event) =>{
   event.preventDefault();
})