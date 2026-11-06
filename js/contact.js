/* =================================================
   VERDURE – contact.js
   Page contact.html : vérifier le formulaire avant l'envoi.
   Défis : J11, J12
   ================================================= */


const contact = document.querySelector(".contact")
const nom = document.querySelector("#contact-nom");
const email = document.querySelector("#contact-email");
const message = document.querySelector("#contact-message");
const arobase = "@";
const point = ".";

const erreur = document.querySelector("#contact-erreur")
console.log(erreur);

contact.addEventListener("submit", (event) =>{
   event.preventDefault();

if (nom.value.trim() === "" || email.value.trim() === "" || message.value.trim() === "") {
    erreur.textContent = "Veuillez compléter votre formulaire";
    return;
}
if (!email.value.includes(arobase) || !email.value.includes(point)) {
    erreur.textContent = "Adresse email invalide !";
    return;
}

    erreur.textContent = "";
})