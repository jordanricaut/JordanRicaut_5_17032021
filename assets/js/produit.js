// Appel de la fonction produit
produit()
//Création de la fonction produit
async function produit() {
  const cameras = await recupCameras()
  camera(cameras)
  recupDonnees()
  ajoutPanier()
}

function recupIdCam() {
  // On récupère les paramatres de l'url
  var recupUrl = window.location.search
  // On récupère l'id de la page
  var recupId = new URLSearchParams(recupUrl)
  var idCam = recupId.get("id")
  return idCam
}

function camera(cameras) {
    // On récupere l'objet de l'api qui correspond à l'id de l'url
    var produitSelect = cameras.find(cameras => cameras._id === recupIdCam())
    //Création du template Produit
    var templateProduit = document.getElementById("Produit")
    // Crée un clone du template "carteListeCameras"
    var cloneProduit = document.importNode(templateProduit.content, true)
    // On sélectionne l'élément qui correspond et on ajoute le texte qu'il correspond
    cloneProduit.querySelector(".img").src = produitSelect.imageUrl
    cloneProduit.querySelector(".img").alt = 'Image Caméra ' + produitSelect.name
    cloneProduit.querySelector(".desc").textContent = produitSelect.description
    cloneProduit.querySelector(".titre").textContent = produitSelect.name
    cloneProduit.querySelector(".prix").textContent += produitSelect.price / 100 +' €';
    // Liste des choix des différentes lentilles
    var camerasLentilles = produitSelect.lenses
    for (var i = 0; i < camerasLentilles.length; i++) {
      var listeLentilles = camerasLentilles[i]
      cloneProduit.querySelector("#lentilles").innerHTML += '<option value="'+listeLentilles+'">'+listeLentilles+'</option>';
    }
    // On sélectionne l'élément card et on y ajoute le template avec les données du clone
    document.querySelector(".carteProduit").appendChild(cloneProduit)
}

function recupDonnees() {
    // On récupère les éléments que l'on a besoin
    var nomCam = document.querySelector(".titre").textContent
    var prix = document.querySelector(".prix").textContent
    var choixLentilles = document.querySelector("#lentilles").value
    var quantite = document.querySelector("#quantite").value
    var id = recupIdCam()
    // On les met dans un objet
    var elementChoix = {
      nom: nomCam,
      prix: prix,
      quantite: quantite,
      lentilles: choixLentilles,
      id: id
    }
    return  elementChoix
}


function ajoutPanier() {
  var produitDansLeLocalStorage = JSON.parse(localStorage.getItem("Produit"))
  document.querySelector(".btn").addEventListener("click", function() {
    if (confirm("Voulez vous ajouter ce produit au panier ?")) {
      /* Si la variable produitDansLeLocalStorage alors il envoie les nouvelles données dans le tableau
       puis l'envoie dans le local storage et est redirigé vers la page panier */
      if (produitDansLeLocalStorage) {
        produitDansLeLocalStorage.push(recupDonnees())
        localStorage.setItem('Produit', JSON.stringify(produitDansLeLocalStorage))
        window.location.href = 'panier.html'
      } else {
        /* Sinon la variable produitDansLeLocalStorage est crée avec un tableau vide, les données lui sont envoyé
        puis l'envoie dans le locale storage et est redirigé vers la page panier */
        produitDansLeLocalStorage = []
        produitDansLeLocalStorage.push(recupDonnees())
        localStorage.setItem('Produit', JSON.stringify(produitDansLeLocalStorage))
        window.location.href = 'panier.html'
      }

    }
  })
}
