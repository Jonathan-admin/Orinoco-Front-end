/*                                      |------------------------------------------------------------------|
                                        |    Fichier JAVASCRIPT pour la page de validation de commande     |
                                        |------------------------------------------------------------------|
************************************************************************************************************************************************************************************/

const id = document.getElementById("id");
const dateTime = document.getElementById("dateTime");
const objDate = new Date();
const dataContact = ["Nom","Prénom","Adresse postale","Ville","Adresse électronique"];
const orderContent = document.getElementById("order-content");
const contactContent = document.getElementById("contact-content");           // Variables globales
const responseObj = JSON.parse(sessionStorage.getItem("result-post"));

/*________________________________________________________________________________________________________________________________________________________________________________
                                                                    Code de base 
                                                                                                                                                                            */
display(responsiveTableDisplay());           // Affiche le tableau de contenu du panier en fonction de la résolution de l'écran
localStorage.clear();                       // On supprime toutes les variables localStorage
responsiveTable.addEventListener("change", function(event) {        // Ajout d'un listener sur la détection du changement de résolution
    display(responsiveTableDisplay());   // Actualisation de l'affichage du tableau
});
/*___________________________________________________________________________________________________________________________________________________________________________________
                                                        Fonction spécifique à la page
                                                                                                                                                                                    */
/***************************************************Fonction d'affichage du contenu en fonction de la résolution********************************************************************************* */
function display(flag) {
    orderContent.innerHTML = "";
    headCart.innerHTML = "";
    contactContent.innerHTML = "";
    var total = 0;
    for (let index = 0; index < responseObj.products.length; index++) {
        if(flag) {          // Si la résolution est inférieure à 800px alors on affiche ce tableau
            orderContent.classList.add("borderTable");
            orderContent.innerHTML += "<tr class='ref'><td colspan='2'>Référence "+responseObj.products[index]._id+"</td></tr>"
            +"<tr><td>Aperçu</td><td><img src='"+responseObj.products[index].imageUrl+"'/></td></tr>"
            +"<tr><td>Désignation</td><td>"+responseObj.products[index].name+"</td></tr>"
            +"<tr><td>Prix</td><td>"+getPrice(responseObj.products[index].price,1)+"€</td></tr>";
        } else {            // Si la résolution est supérieure à 800px alors on affiche ce tableau
            orderContent.classList.remove("borderTable");
            headCart.innerHTML = "<tr><th>Référence</th><th>Aperçu</th><th>Designation</th><th>Prix</th></tr>";
            orderContent.innerHTML += "<td>"+responseObj.products[index]._id+"</td><td><img src='"+responseObj.products[index].imageUrl+"'/></td><td>"+responseObj.products[index].name+"</td><td>"+getPrice(responseObj.products[index].price,1)+"€</td>";
        }
        total += parseFloat(getPrice(responseObj.products[index].price,1));         // Calcul du total prix*quantité
    }
    var iterator = 0;
    for (const key in responseObj.contact) {
        if (responseObj.contact.hasOwnProperty(key)) {  // On vérifie que l'objet contact possède bien la propriété key
            var tr = document.createElement("tr");
            contactContent.appendChild(tr).innerHTML = "<td>"+dataContact[iterator]+"</td><td>"+responseObj.contact[key]+"</td>"
            iterator++;         // Parcours de l'objet et remplissage du tableau avec les valeurs des propriétés
        }
    }
    var trt = document.createElement("tr");
    trt.classList.add("total");
    if(flag) {      // Si la résolution est inférieure à 800px alors on affiche ce contenu
        orderContent.appendChild(trt).innerHTML = "<td colspan='2'>Montant total à payer : "+total.toFixed(2).replace(".",",")+"€ TTC</td>"; 
    } else {        // Si la résolution est supérieure à 800px alors on affiche ce contenu
        orderContent.appendChild(trt).innerHTML = "<td colspan='4' class='displayTotal'>Montant total à payer : "+total.toFixed(2).replace(".",",")+"€ TTC</td>"; 
    }
    id.innerHTML = responseObj.orderId;
    dateTime.innerHTML = objDate.getDate()+"/"+(objDate.getMonth()+1)+"/"+objDate.getFullYear()+" à "+objDate.getHours()+":"+objDate.getMinutes();
    // Affichage de la date de commande au format JJ/MM/YYYY à hh:mm
    sessionStorage.removeItem("result-post"); // Suppression de la variable temporaire
}          



 






   
