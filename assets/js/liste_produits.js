listeProduits()

// Permet l'affichage des caméras de l'API
async function listeProduits() {
  const cameras =  await recupCameras()
  for (var i = 0; i < cameras.length; i++) {
    var camera = cameras[i]
    affichageCamera(camera)
  }
}

function affichageCamera(cameras) {
  // On récupère le template avec l'id Carte
  var templateCam = document.getElementById("carteListeCameras")
  // Crée un clone du template "carteListeCameras"
  var cloneCam = document.importNode(templateCam.content, true)
  // On sélectionne l'élément qui correspond et on ajoute le texte qu'il correspond
  cloneCam.querySelector(".card-img-top").src = cameras.imageUrl;
  cloneCam.querySelector(".card-img-top").alt = 'Image Caméra ' + cameras.name;
  cloneCam.querySelector(".titre").textContent = cameras.name
  cloneCam.querySelector(".card-subtitle").textContent = cameras.description;
  cloneCam.querySelector(".card-text").textContent = cameras.price / 100 + ' €';
  cloneCam.querySelector(".btn").href += cameras._id;
  // On sélectionne l'élément card et on y ajoute le template avec les données du clone
  document.querySelector(".carteCameras").appendChild(cloneCam)
  }
