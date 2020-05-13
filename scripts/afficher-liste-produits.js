/*                     |---------------------------------------------------------------------------------|
                       |    Fichier JAVASCRIPT pour la page "Liste des produits disponibles à la vente"  |
                       |---------------------------------------------------------------------------------|
************************************************************************************************************************************************************************************/

const contentList = document.getElementById("content-list");         // Variable globale

contentList.innerHTML =  "<tr class='msg'><td colspan='3'><img src='images/loading.gif' alt='image de chargement' id='loading'/></td></tr>"; 
// Moulinette en attendant la réponse de la requête

window.onload = function () {  // Code à exécuter au chargement de la page

    sendRequest("GET", "http://localhost:3000/api/cameras/","")  // Appel de la fonction avec promise

        .then(data => {                            // Traitement des données suite à la promesse résolue
            var products = JSON.parse(data);       // Conversion de la réponse JSON en objet JS
            var tableContent = "";
            for (var i = 0; i < products.length; i++) {     // Parcours de l'objet et affichage des propriétés
                tableContent+= '<tr class="items" id="'+products[i]._id+'"><td><img src="'+products[i].imageUrl+'" alt="Photo produit caméra"'+i+'/></td>';
                tableContent+= "<td>"+products[i].name+"</td>";
                tableContent+= "<td>"+products[i].price+"€</td></tr></a>";
            }
            contentList.innerHTML =  tableContent; 
            const items = document.querySelectorAll("#content-list tr");        // Ajout des évènements clic sur chaque ligne de la liste produit
            for (let index = 0; index < items.length; index++) {
                items[index].addEventListener("click", function(event) {
                    sessionStorage.setItem("idProduct",items[index].attributes[1].value); // Enregiste le id du produit sélectionné après le clic dans une variable de session
                    window.location.href = "/templates/product.html";                      // Puis charge la page fiche produit
                });
            }
        })

        .catch(error => {                        // Traitement des données suite à la promesse non résolue
            contentList.innerHTML =  error;
        });
        
    displayNbProductInCart(som,getNbProduct());    // Affiche le nombre de produit sur les icones du panier
}



