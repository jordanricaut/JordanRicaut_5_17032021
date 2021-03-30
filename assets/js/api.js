// Récupération des données
function recupCameras() {
  return fetch('http://localhost:3000/api/cameras')
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
