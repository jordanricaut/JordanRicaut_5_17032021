panier()

async function panier() {
  recupElementStorage()
  affichageElementStorage()
  supprimerArticle()
  prixTotal()
}

function recupElementStorage() {
  var produitDansLeLocalStorage = JSON.parse(localStorage.getItem("Produit"))
  //console.log(produitDansLeLocalStorage)
  var nom = produitDansLeLocalStorage.nom
  var prix = produitDansLeLocalStorage.prix
  var quantite = produitDansLeLocalStorage.quantite
  var lentilles = produitDansLeLocalStorage.lentilles
  var elementChoix = {
    nom: nom,
    prix: prix,
    quantite: quantite,
    lentilles: lentilles
  }
  for (var i = 0; i < produitDansLeLocalStorage.length; i++) {
    produitDansLeLocalStorage[i]
  }
  return  elementChoix

}

function affichageElementStorage() {
  var produitDansLeLocalStorage = JSON.parse(localStorage.getItem("Produit"))
  for (var i = 0; i < produitDansLeLocalStorage.length; i++) {
    var quantite = produitDansLeLocalStorage[i].quantite

    var prixMonnaie = produitDansLeLocalStorage[i].prix
    var prixSansMonnaie = prixMonnaie.replace(/\D/g,'');
    var prixTotalProduit = (prixSansMonnaie * quantite).toLocaleString()

    var panier = document.querySelector(".element_panier").innerHTML +=
    '<tr>'+
      '<td class="camerachoisis">'+produitDansLeLocalStorage[i].nom+'</td>'+
      '<td class="lentilleschoisis">'+produitDansLeLocalStorage[i].lentilles+'</td>'+
      '<td class="quantitechoisis">'+produitDansLeLocalStorage[i].quantite+'</td>'+
      '<td class="prixchoisis">'+prixTotalProduit+' €</td>'+
      '<td><button type="button" class="btn p-0 text-danger" name="button"><i class="fas fa-times"></i></button></td>'+
    '</tr>'
   }
}

function supprimerArticle() {
  document.querySelector(".btn").addEventListener("click", function() {
    if (confirm("Vous êtes sure de vouloir supprimer l'articles ?")) {
      var produitDansLeLocalStorage = JSON.parse(localStorage.getItem("Produit"))
      //console.log(produitDansLeLocalStorage)
      produitDansLeLocalStorage.slice(1)
    }
  })
}

function prixTotal() {
  // Création de la variable pour récupérer les données du local storage
  var produitDansLeLocalStorage = JSON.parse(localStorage.getItem("Produit"))
  // Création du tableau pour le prix total
  var prixTotalFin = []
  // Boucle pour récuperer les quantités et les prix pour effectuer nos prochains calculs
  for (var i = 0; i < produitDansLeLocalStorage.length; i++) {
    // On enregistre les quantités dans la variable quantite
    var quantite = produitDansLeLocalStorage[i].quantite
    // On enregistre les prix des caméras dans la variable prixMonnaie
    var prixMonnaie = produitDansLeLocalStorage[i].prix
    // On remplace le signe € par rien pour pouvoir calculer avec les valeurs
    var prixSansMonnaie = prixMonnaie.replace(/\D/g,'');
    // On calcule le prix de la caméra par le nombre de quantité choisie
    var prixTotalProduit = (prixSansMonnaie * quantite)
    /* On transforme le résultat de la multiplication en une chaîne de caractères
    qui tient compte de la localite, ici pour avoir une meilleure lecture des millièmes.*/
    var prixTotalString = prixTotalProduit.toLocaleString()
    // On transforme le résultat en nombre
    var prixFloat = parseFloat(prixTotalProduit)
    // On ajoute les données de la variable dans le tableau
    prixTotalFin.push(prixFloat)
}
  var reducer = (acc, cur) => acc + cur;

  document.querySelector(".ligne_total").innerHTML =
  'Prix Total : '+prixTotalFin.reduce(reducer).toLocaleString()+' €'

var prixLocalStorage = localStorage.setItem("Prix", prixTotalFin.reduce(reducer))
}
