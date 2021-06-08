var commande = JSON.parse(localStorage.getItem("Commande"))

var prix = JSON.parse(localStorage.getItem("Prix"))
var prixString = prix.toLocaleString()
console.log(prixString)

document.querySelector(".container").innerHTML =
  '<div class="col-12 col-lg-6">'+
      '<h3> Merci pour votre commande !</h3>'+
      '<a href="index.html" class="col-sm-1 col-md-3  btn btn-orange">< Accueil</a>'+
    '</div>'+
    '<div class="col-12 col-lg-6 mt-3">'+
      '<h4>N° de commande : <span class="text-orange">'+commande.orderId+'</span></h4>'+
      '<h5>Montant de votre commande: '+prixString+' €</h5>'+
    '</div>'+
  '</div>'
