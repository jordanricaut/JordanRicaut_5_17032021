  // Expressions REGEX
  class Regex {

      // Vérification de l'email
      static emailIsValid(value) {
          const re = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,30})/i;
          return re.test(value.toLowerCase());
      }

      // Vérification d'un texte
      static textIsValid(value) {
          const re = /^[A-Za-z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
          return re.test(value);
      }
      // Vérification d'une adresse
      static addressIsValid(value) {
      const re = /^([0-9]{0,})[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/;
      return re.test(value);
        }
      }


  // Vérifie chaque champ et affiche les messages d'erreur s'il y en a
  function controleFormulaire(lastName, firstName, address, city, email){
      let formChecked = true;
      var firstName = document.querySelector("#nom").value
      var lastName = document.querySelector("#prenom").value
      var address = document.querySelector("#adresse").value
      var city = document.querySelector("#ville").value
      var email = document.querySelector("#email").value

      if(!Regex.textIsValid(lastName)){
        document.querySelector('.validprenom').innerHTML = 'Merci de remplir correctement cette case'
        document.querySelector('#prenom').classList.add("btn-error")
        formChecked = false;
      } else{
        document.querySelector('.validprenom').innerHTML = ''
        document.querySelector('#prenom').classList.remove("btn-error")
      }
      if (!Regex.textIsValid(firstName)){
        document.querySelector('.validnom').innerHTML = 'Merci de remplir correctement cette case'
        document.querySelector('#nom').classList.add("btn-error")
        formChecked = false;
      } else{
        document.querySelector('.validnom').innerHTML = ''
        document.querySelector('#nom').classList.remove("btn-error")
      }
      if(!Regex.addressIsValid(address)){
        document.querySelector('.validadresse').innerHTML = 'Merci de remplir correctement cette case'
        document.querySelector('#adresse').classList.add("btn-error")
        formChecked = false;
      } else{
        document.querySelector('.validadresse').innerHTML = ''
        document.querySelector('#adresse').classList.remove("btn-error")
      }
      if(!Regex.textIsValid(city)){
        document.querySelector('.validville').innerHTML = 'Merci de remplir correctement cette case'
        document.querySelector('#ville').classList.add("btn-error")
        formChecked = false;
      } else{
        document.querySelector('.validville').innerHTML = ''
        document.querySelector('#ville').classList.remove("btn-error")
      }
      if(!Regex.emailIsValid(email)){
        document.querySelector('.validemail').innerHTML = 'Merci de remplir correctement cette case'
        document.querySelector('#email').classList.add("btn-error")
        formChecked = false;
      } else{
        document.querySelector('.validemail').innerHTML = ''
        document.querySelector('#email').classList.remove("btn-error")
      }
      return formChecked
  }

  function envoieDonnees() {
    // Récupération des données du formulaire
    var firstName = document.querySelector("#nom").value
    var lastName = document.querySelector("#prenom").value
    var address = document.querySelector("#adresse").value
    var city = document.querySelector("#ville").value
    var email = document.querySelector("#email").value
    var formulaireContact = {
      'firstName': firstName,
      'lastName': lastName,
      'address': address,
      'city': city,
      'email': email
    }

     // Récupération des ID
     var cameraPanier = localStorage.getItem("Produit")
     var cam = JSON.parse(cameraPanier)
     var listeIdPanier = []
     for (let i = 0; i < cam.length; i++) {
       var listeCamPanier = cam[i]
       listeIdPanier.push(listeCamPanier.id)
     }

     // Fusion des données du formulaire et des ID dans un seul objet
     var products = listeIdPanier
     var contact = formulaireContact
     var data = JSON.stringify({contact, products})
     console.log(data)

     // Mise en place de l'envoie vers l'API
     fetch('http://localhost:3000/api/cameras/order', {
       method: 'POST',
       body: data,
       headers: {
         'Content-Type': 'application/json'
       }
     })
     .then(response => response.json())
     .then(data => {
       console.log(data)
       localStorage.setItem('Commande', JSON.stringify(data))
       console.log(data.orderId)
     })
     .catch(e => {
       console.error(e)
     })
}

var produitDansLeLocalStorage = JSON.parse(localStorage.getItem("Produit"))
if (localStorage.getItem("Produit") === null || produitDansLeLocalStorage.length === 0) {
} else {
  document.querySelector(".bouton-commande").addEventListener("click", () => {
    if (!controleFormulaire()) {
      event.preventDefault()
    } else {
      confirm('Etes vous sur de vouloir finaliser votre commande ?');
      envoieDonnees()
    }
  })
}
