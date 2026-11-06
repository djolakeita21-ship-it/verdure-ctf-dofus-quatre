/* =================================================
   VERDURE – contact.js
   Page contact.html : vérifier le formulaire avant l'envoi.
   Défis : J11, J12
   ================================================= */
/*J-12 :formulaire de confirmation.*/
const formulaire = document.querySelector("#contact");

const confirmation = document.querySelector("#contact-confirmation");

   const nom = document.querySelector("#contact-nom");
   const email = document.querySelector("#contact-email");
   const message = document.querySelector("#contact-message");

   formulaire.addEventListener("submit", function (event) {
   event.preventDefault(); 
   
   if (nom.value === "" || email.value === "" || message.value === "") {
      alert("Veuillez remplir tous les champs du formulaire.");
   }
     
 confirmation.textContent = "Merci, " + nom.value + " (" + email.value + "). Votre message a été envoyé.";
      confirmation.hidden = false;
   })
