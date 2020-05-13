/*                                      |-----------------------------------------------------|
                                        |    Fichier JAVASCRIPT pour la page "Fiche produit"  |
                                        |-----------------------------------------------------|
************************************************************************************************************************************************************************************/

var idProduct = this.sessionStorage.getItem("idProduct");
var objProduct = {};
var quantity = 1;
const contentPicture = document.getElementById("picture");
const contentDesc = document.getElementById("desc");
const addCart = document.getElementById("addCart");                     // Variables globales
const msgLoading = document.getElementById("msgLoading");
const contentProduct = document.getElementById("product");
const modalBody = document.getElementById("modalBody");
const modalDisplay = document.getElementById("modalDisplay");
/*________________________________________________________________________________________________________________________________________________________________________________
                                                                    Code de base 
                                                                                                                                                                                    */
msgLoading.innerHTML =  "<img src='../images/loading.gif' alt='image de chargement' id='loading'/>"; 
// Moulinette en attendant la réponse de la requête


window.onload = function () {           // Exécution de ce code au chargement de la page

    displayNbProductInCart(som,getNbProduct());   // Affiche le nombre de produit dans le panier
    contentProduct.nextElementSibling.style.display = "none"; 

    sendRequest("GET","http://localhost:3000/api/cameras/"+idProduct,"")   // Appel de la fonction avec promise

        .then(data => {                                          // Récupération des retournées depuis que la promesse est résolue
            msgLoading.style.display = "none";
            contentProduct.nextElementSibling.style.display = "flex";
            objProduct = JSON.parse(data);                        // Conversion des données reçues en objet JS
            contentPicture.innerHTML = "<img src='"+objProduct.imageUrl+"' alt='Image du produit' />";
            contentDesc.innerHTML = "<h3 class='name'>"+objProduct.name+"</h3>"+
                    "<p>Référence produit: "+objProduct._id+" "+
                    "<h4>Description</h4>"+
                    "<p>"+objProduct.description+"</p>"+                // Affichage de la page produit
                    "<h4>Lentilles de la caméra</h4>"  +
                    "<label for='lentille'>Veuillez sélectionner le type de lentilles</label>"+
                    "<select name='lentille' id='lenses'></select>"+
                    "<h4>Prix TTC</h4>"+
                    "<table class='table table-striped' id='table-price'>"+
                    "<thead><tr><th>Quantité</th><th>Prix</th></tr></thead>"+
                    "<tbody><tr><td>A l'unité</td><td>"+objProduct.price+"€</td></tr>"+
                    "<tr><td><input type='number' id='quantity' name='quantity' min='1' max='10' value='1'/></td>"+
                    "<td><span>"+objProduct.price+"€</span></td></tr></tbody></table";  

            const lensesChoice = document.getElementById("lenses");  // Remplissage en option du select
            for(var i=0 in objProduct.lenses) {
                lensesChoice.innerHTML += "<option value='val"+i+"'>"+objProduct.lenses[i]+"</option>";
            }
                    // Ajout d'un listener sur le input quantité et calcul du montant total suivant la quantité choisie lors d'un clic
            const inputNumberQauntity = document.getElementById("quantity");
            inputNumberQauntity.addEventListener("click", function(event) {
                document.querySelector("td>span").innerHTML = inputNumberQauntity.value*objProduct.price+"€";
                quantity = inputNumberQauntity.value;
            });
        })
                    // Traitement de l'erreur récupérée lorsque la promesse n'a pas abouti
        .catch(error => { 
            msgLoading.innerHTML =  error;
        });
}   
modalDisplay.addEventListener("click", function(event) { // Ajout d'un listener sur le bouton ajout produit pour afficher le modal
    modalBody.innerHTML = "";
    displayModalConfirmation(objProduct,quantity);
});
addCart.addEventListener("click", function(event) {  // Ajout d'un listener sur le bouton ajout produit du modal
    addProductInCart(objProduct,quantity);           // Appel de la fonction ajout produit dans le panier
    displayNbProductInCart(som,getNbProduct());      // Appel de la fonction affichage du nombre de produit dans le panier
});

/*___________________________________________________________________________________________________________________________________________________________________________________
                                                        Fonctions spécifiques à la page
                                                                                                                                                                                    */
/***************************************************Fonction d'affichage du contenu du modal********************************************************************************* */
displayModalConfirmation = (objProduct,qty) => {
    let modalBodyParagraph = document.createElement("p");        // Affichage du modal de confirmation des achats sur le point d'être ajoutés au panier
    if(qty == 1) {
        modalBodyParagraph.innerHTML = "Vous êtes sur le point d'ajouter au panier la caméra "+objProduct.name+" d'un montant de "+objProduct.price+"€. Confirmez-vous cet achat?";
    } else {
        modalBodyParagraph.innerHTML = "Vous êtes sur le point d'ajouter "+qty+" caméras "+objProduct.name+" à votre panier d'un montant total de "+objProduct.price*qty+"€ (dont "+objProduct.price+"€ l'unité). Confirmez- vous l'achat de ces "+qty+" caméras?";
    }
    modalBody.appendChild(modalBodyParagraph);
    addCart.setAttribute("data-dismiss","modal");
}
/****************************************** Fonction d'ajout des produits dans le panier avec les variables localStorage**********************************************************/
addProductInCart = (obj,qty) => {        
    let val = [obj,qty]; 
    for (let index = 0; index < localStorage.length; index++) {     // On parcours le localStorage pour savoir si le produit existe déjà
        var key = localStorage.key(index); 
        if(obj._id==key) {      //Si le produit existe déjà dans le panier alors on incrémente sa quantité
            val = [obj,parseInt(JSON.parse(localStorage.getItem(obj._id))[1])+parseInt(qty)];
            index =  localStorage.length; 
        }
    }
    localStorage.setItem(obj._id,JSON.stringify(val));  // Créer une nouvelle variable localStorage ayant pour key le id du produit
}











            


