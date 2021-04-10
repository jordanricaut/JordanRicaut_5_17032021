// Récupération des données
function recupCameras() {
  return fetch('http://localhost:3000/api/cameras')
  //return fetch('https://ab-p5-api.herokuapp.com/api/cameras')
    .then(function(response) {
      return response.json()
    })
    .then(function(cameras) {
      return cameras
    })
    .catch(function(e) {
      alert(e)
    })
}
