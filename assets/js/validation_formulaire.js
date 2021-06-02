validationFormulaire()

async function validationFormulaire() {
  await recupElementStorage()
  envoieDonnees()
}
function verifFormulaire() {
  var firstName = document.querySelector("#nom").value
  var lastName = document.querySelector("#prenom").value
  var address = document.querySelector("#adresse").value
  var city = document.querySelector("#ville").value
  var email = document.querySelector("#email").value
  // V E R I F I C A T I O N   F O R M U L A I R E
  var formSucces = true
  var regexTexte = /([a-zA-Z]){2,30}/g
  if (firstName.match(regexTexte) === false || firstName.length == 0) {
    document.querySelector('.validnom').innerHTML = 'Merci de remplir correctement cette case'
    document.querySelector('#nom').classList.add("btn-error")
    formSucces = false
  } else {
    document.querySelector('.validnom').innerHTML = ''
    document.querySelector('#nom').classList.remove("btn-error")
  }
  if (lastName.match(regexTexte) === false || lastName.length == 0) {
    document.querySelector('.validprenom').innerHTML = 'Merci de remplir correctement cette case'
    document.querySelector('#prenom').classList.add("btn-error")
    formSucces = false
  } else {
    document.querySelector('.validprenom').innerHTML = ''
    document.querySelector('#prenom').classList.remove("btn-error")
  }
  if (address.match(regexTexte) === false || address.length == 0) {
    document.querySelector('.validadresse').innerHTML = 'Merci de remplir correctement cette case'
    document.querySelector('#adresse').classList.add("btn-error")
    formSucces = false
  } else {
    document.querySelector('.validadresse').innerHTML = ''
    document.querySelector('#adresse').classList.remove("btn-error")
  }
  if (city.match(regexTexte) === false || city.length == 0) {
    document.querySelector('.validville').innerHTML = 'Merci de remplir correctement cette case'
    document.querySelector('#ville').classList.add("btn-error")
    formSucces = false
  } else {
    document.querySelector('.validville').innerHTML = ''
    document.querySelector('#ville').classList.remove("btn-error")
  }
   var regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,30})/i
   if (email.match(regexEmail) === false || email.length == 0) {
     document.querySelector('.validemail').innerHTML = 'Merci de remplir correctement cette case'
     document.querySelector('#email').classList.add("btn-error")
     formSucces = false
   } else {
     document.querySelector('.validemail').innerHTML = ''
     document.querySelector('#email').classList.remove("btn-error")
   }
   return formSucces
}

function envoieDonnees() {
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

   // R E C U P E R A T I O N  D E S  I D
   var cameraPanier = localStorage.getItem("Produit")
   var cam = JSON.parse(cameraPanier)
   //console.log(cam)
   var listeIdPanier = []
   for (let i = 0; i < cam.length; i++) {
     var listeCamPanier = cam[i]
     listeIdPanier.push(listeCamPanier.id)
   }

   // T O U T E S  L E S  D O N N E E S  D A N S  U N  O B J E T
   var products = listeIdPanier
   var contact = formulaireContact
   //var data = JSON.stringify({contact, products})






   var data = '{"contact":{"firstName":"sdfsd","lastName":"sqsd","address":"15 adadad","city":"dadada","email":"winkdad@il.com"},"products":["5be1ef211c9d44000030b062"]}';
   var url = 'http://localhost:3000/api/cameras/order';
   console.log(data)
   // F E T C H  P O S T - E N V O I E  V E R S  A P I

   post = async (url, data) => {
    try {
        let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
        });
        if (response.ok){
            let responseData = response.json();
            return responseData
        } else {
            console.error('Problème du serveur : ' + response.status);
        }
    }
    catch (e){
        console.error(e);
    }
}

post('http://localhost:3000/api/cameras/order', data).then((value) => {
  console.log("The order response: ");
  console.log(JSON.stringify(value));
  localStorage.setItem('Commande', JSON.stringify(value))
});

    document.querySelector(".bouton-commande").addEventListener("click", function() {
  /*    if (!verifFormulaire()) {
        event.preventDefault()
        verifFormulaire()
      } else {
        post('http://localhost:3000/api/cameras/order', data).then((value) => {
          console.log("The order response: ");
          console.log(JSON.stringify(value));
          localStorage.setItem('Commande', JSON.stringify(value))
         });
       }*/
       })
     }
