// Appel de la fonction produit
produit()
//Création de la fonction produit
async function produit() {
  const cameras = await recupCameras()
  Camera(cameras)
}

function recupIdCam() {
  // On récupère les paramatres de l'url
  var recupUrl = window.location.search
  // On récupère l'id de la page
  var recupId = new URLSearchParams(recupUrl)
  var idCam = recupId.get("id")
  return idCam
}

function Camera(cameras) {
    // On récupere l'objet de l'api qui correspond à l'id de l'url
    var produitSelect = cameras.find(cameras => cameras._id === recupIdCam())
    console.log(produitSelect)
    //Création du template Produit
    var templateProduit = document.getElementById("Produit")
    // Crée un clone du template "carteListeCameras"
    var cloneProduit = document.importNode(templateProduit.content, true)
    // On sélectionne l'élément qui correspond et on ajoute le texte qu'il correspond
    cloneProduit.querySelector(".img").src = produitSelect.imageUrl
    cloneProduit.querySelector(".img").alt = 'Image Caméra ' + produitSelect.name
    cloneProduit.querySelector(".desc").textContent = produitSelect.description
    cloneProduit.querySelector(".titre").textContent = produitSelect.name
    cloneProduit.querySelector(".prix").textContent = produitSelect.price / 100 + ' €';
    // Liste des choix des différentes lentilles
    var camerasLentilles = produitSelect.lenses
    for (var i = 0; i < camerasLentilles.length; i++) {
      var listeLentilles = camerasLentilles[i]
      cloneProduit.querySelector("#lentilles").innerHTML += '<option value="'+listeLentilles+'">'+listeLentilles+'</option>';
    }
    // On sélectionne l'élément card et on y ajoute le template avec les données du clone
    document.querySelector(".carteProduit").appendChild(cloneProduit)
    }
