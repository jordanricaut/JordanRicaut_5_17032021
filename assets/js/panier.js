panier()

async function panier() {
  var produitDansLeLocalStorage = JSON.parse(localStorage.getItem("Produit"))
  if (localStorage.getItem("Produit") === null || produitDansLeLocalStorage.length === 0) {
    localStorage.clear()
    var panier = document.querySelector(".panier").innerHTML = "<h3>Votre panier est vide</h3>"
  } else {
    affichageElementStorage()
    viderPanier()
    supprimerArticle()
    prixTotal()
  }
}


// Permet l'affichage du panier sous forme de tableau HTML
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
      '<td><button type="button" class="btn p-0 text-danger bouton-supprimer-article" name="button" data-id='+i+'><i class="fas fa-times"></i></button></td>'+
    '</tr>'
  }
}

// Permet de supprimer un article en fonction de la valeur de l'attribut data-id
function supprimerArticle() {
  let bouton_supprimer_article = document.querySelectorAll(".bouton-supprimer-article")
  for (var i = 0; i < bouton_supprimer_article.length; i++) {
    let produitDansLeLocalStorage = JSON.parse(localStorage.getItem("Produit"))
    let id_selectioner_supprimer = produitDansLeLocalStorage[i].id
    var id = document.querySelector(".btn").dataset.id
    console.log(id_selectioner_supprimer)
      bouton_supprimer_article[i].addEventListener("click", function() {
        produitDansLeLocalStorage.splice(id, 1)
        localStorage.setItem('Produit', JSON.stringify(produitDansLeLocalStorage))
        window.location.reload(true)
      })
  }
}

// Permet de supprimer la totalité du panier en supprimant les clé "Produit" et "Prix"
function viderPanier() {
  document.querySelector(".bouton-supprimer").addEventListener("click", function() {
    if (confirm("Vous êtes sure de vouloir supprimer les articles ?")) {
      localStorage.removeItem("Produit")
      localStorage.removeItem("Prix")
      window.location.reload(true)
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
    qui tient compte de la localite, ici pour avoir une meilleure lecture des milliers.*/
    var prixTotalString = prixTotalProduit.toLocaleString()
    // On transforme le résultat en nombre
    var prixFloat = parseFloat(prixTotalProduit)
    // On ajoute les données de la variable dans le tableau
    prixTotalFin.push(prixFloat)
}
  var reducer = (acc, cur) => acc + cur;

  // Affiche le prix total
  document.querySelector(".ligne_total").innerHTML =
  'Prix Total : '+prixTotalFin.reduce(reducer).toLocaleString()+' €'

// Envoie le prix total dans le local storage
  var prixLocalStorage = localStorage.setItem("Prix", prixTotalFin.reduce(reducer))
}
