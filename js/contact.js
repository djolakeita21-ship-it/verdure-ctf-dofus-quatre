/* =================================================
   VERDURE – contact.js
   Page contact.html : vérifier le formulaire avant l'envoi.
   Défis : J11, J12
   ================================================= */
/*J-12 :formulaire de confirmation.*/

const confirmation = document.querySelector("#contact-confirmation");

   event.preventDefault();
formulaire.addEventListener("submit", function (event) {
 
  
  const nom = document.querySelector("#contact-nom").value;

  confirmation.textContent = "Merci, " + nom + ". Votre message a été envoyé.";

  confirmation.hidden = true;
});
