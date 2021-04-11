validationFormulaire()


async function validationFormulaire() {
  envoieCommande()
}

function recupFormulaire() {
  var nom = document.querySelector("#nom").value
  var prenom = document.querySelector("#prenom").value
  var adresse = document.querySelector("#adresse").value
  var ville = document.querySelector("#ville").value
  var email = document.querySelector("#email").value
  var formulaire = {
    nom: nom,
    prenom: prenom,
    adresse: adresse,
    ville: ville,
    email: email
  }
  return  formulaire
}

function validationTexte() {
  var regexTexte = /([a-zA-Z]){2,30}/g
  if (!recupFormulaire().nom.match(regexTexte) || recupFormulaire().nom.length === 0) {
    document.querySelector('.validnom').innerHTML = 'Merci de remplir correctement cette case'
    document.querySelector('#nom').classList.add("btn-error")
  } else {
    document.querySelector('.validnom').innerHTML = ''
    document.querySelector('#nom').classList.remove("btn-error")
  }
  if (!recupFormulaire().prenom.match(regexTexte) || recupFormulaire().prenom.length === 0) {
    document.querySelector('.validprenom').innerHTML = 'Merci de remplir correctement cette case'
    document.querySelector('#prenom').classList.add("btn-error")
  } else {
    document.querySelector('.validprenom').innerHTML = ''
    document.querySelector('#prenom').classList.remove("btn-error")
  }
  if (!recupFormulaire().adresse.match(regexTexte) || recupFormulaire().adresse.length === 0) {
    document.querySelector('.validadresse').innerHTML = 'Merci de remplir correctement cette case'
    document.querySelector('#adresse').classList.add("btn-error")
  } else {
    document.querySelector('.validadresse').innerHTML = ''
    document.querySelector('#adresse').classList.remove("btn-error")
  }
  if (!recupFormulaire().ville.match(regexTexte) || recupFormulaire().ville.length === 0) {
    document.querySelector('.validville').innerHTML = 'Merci de remplir correctement cette case'
    document.querySelector('#ville').classList.add("btn-error")
  } else {
    document.querySelector('.validville').innerHTML = ''
    document.querySelector('#ville').classList.remove("btn-error")
  }
   var regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,30})/i
   if (!recupFormulaire().email.match(regexEmail) || recupFormulaire().email.length === 0) {
     document.querySelector('.validemail').innerHTML = 'Merci de remplir correctement cette case'
     document.querySelector('#email').classList.add("btn-error")
   } else {
     document.querySelector('.validemail').innerHTML = ''
     document.querySelector('#email').classList.remove("btn-error")
   }
}

function envoieCommande() {
  document.querySelector(".bouton-commande").addEventListener("click", function() {
      validationTexte()
      event.preventDefault();
  }, false)
}
