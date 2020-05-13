/*                                      |-----------------------------------------------------|
                                        |    Fichier JAVASCRIPT pour la page "Mon panier"     |
                                        |-----------------------------------------------------|
************************************************************************************************************************************************************************************/

const nbElement = document.createElement("p");
const card = document.getElementById('nbElement');
const form = document.getElementById("myForm");
const submit = document.getElementById("submit");                    // Variables globales
const headerCart = document.getElementById("headCart");
const contentCart = document.getElementById("contentCart");
const sectionCart = document.getElementById("card-content");
const formContent = document.getElementById("form-content");

var controle = [                                  // Tableau multidimentionnel stockant les informations des contrôles du formulaire
    [document.getElementById("familyname"),/^[a-zA-Zéèàêûçàôë]{2}[a-zA-Z-\séèàêûçàôë]{0,23}$/i,true,
    "Nom - Le nom est invalide ! Il doit comporter entre 2 et 25 caractères. La ponctuation, les chiffres et caractères spéciaux sont exclus."],
    [document.getElementById("firstname"),/^[a-zA-Zéèàêûçàôë]{2}[a-zA-Z-\séèàêûçàôë]{0,23}$/i,true,
    "Prénom - Le prénom est invalide ! Il doit comporter entre 2 et 25 caractères. La ponctuation, les chiffres et caractères spéciaux sont exclus."],
    [document.getElementById("adress"),/^[a-zA-Z0-9éèàêûçàôë]{1}[\s\w-'éèàêûçàîôë]{9,99}$/i,true,
    "Adresse postale - Cette adresse est invalide ! Il doit comporter entre 10 et 100 caractères. Les caractères spéciaux et la ponctuation sont exclus."],
    [document.getElementById("city"),/^[a-zA-Zéèàêûçàôë]{2}[a-zA-Z-'\séèàêûçàôë]{0,38}$/i,true,
    "Ville - Cette ville est invalide ! Il doit comporter entre 2 et 40 caractères. La ponctuation, les chiffres et caractères spéciaux sont exclus."],
    [document.getElementById("mail"),/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,true,
    "Adresse électronique - Cette adresse ne semble pas valide !"],
];

/*________________________________________________________________________________________________________________________________________________________________________________
                                                                    Code de base 
                                                                                                                                                                            */
window.onload = function () {           // Exécution de ce code au chargement de la page

    card.appendChild(nbElement);
    
    for (let i = 0; i < controle.length; i++) {
        controle[i][2] = markDataLoad(controle[i][0],controle[i][1],controle[i][3])   // Vérifie pour chaque contrôle les données pré-enregistrées au chargement de la page
        controle[i][0].addEventListener("input", function(event) {                    // Ajout listener sur chaque champ et test les valeurs dès qu'elles sont modifiées
            controle[i][2] = markData(controle[i][0],controle[i][1],event,controle[i][3]);  // Pour chaque évènement:
            disableButtonSubmit(getNbProduct(),getNbcheckInput());                          // Activation du bouton si les champs sont corrects et le nombre de 
        });                                                                                 // produits dans le panier > 0
    }

    disableButtonSubmit(getNbProduct(),getNbcheckInput());

    nbElement.innerHTML = displayNbProductBuy(getNbProduct());   // Affiche la description du panier
    display(responsiveTableDisplay());                           // Affiche le tableau de contenu du panier en fonction de la résolution de l'écran
    displayNbProductInCart(som,getNbProduct());                  // Affiche le nombre de produit sur les icones du panier

    responsiveTable.addEventListener("change", function(event) {  // Ajout d'un listener sur la détection du changement de résolution
        display(responsiveTableDisplay());                          // Actualisation de l'affichage du tableau
    });

    form.addEventListener("submit", function(event) {       // Ajout d'un élément sur le bouton submit
        event.preventDefault();
        let json = '{"contact":'+JSON.stringify(getContactObj())+',"products":['+getProductTab()+']}'; // Formatage des infos à envoyer en JSON au serveur
        formContent.innerHTML = ""; // On efface la page pour afficher le gif de chargement en attente de la réponse du serveur
        sectionCart.innerHTML = "<div id='msgLoading'><p>Traitement de votre commande en cours...</p>"
                                +"<img src='../images/loading.gif' alt='image de chargement' id='loading'/></div>";
        let msgloading = document.getElementById("msgLoading"); 
        sendRequest("POST","http://localhost:3000/api/cameras/order",json)   // Appel de la fonction sendRquest avec promise
            .then(data => {                                          // Si la promesse est résolue alors on enregistre les données dans une variable de session
                sessionStorage.setItem("result-post",data);
                window.location.href = "/templates/validation.html";  // puis on redirige vers la page de validation
            })
            .catch(error => {                   // Si la promesse a été rejetée alors on affiche l'erreur
                msgLoading.innerHTML =  error;
            }); 
    });
    responsiveTable.addEventListener("change", function(event) {   // Ajout d'un listener sur le media query
        display(responsiveTableDisplay());      // On réaffiche le contenu de la page en fonction de la résolution
    });
}
/*___________________________________________________________________________________________________________________________________________________________________________________
                                                        Fonctions spécifiques à la page
                                                                                                                                                                                    */
/***************************************************Fonction d'affichage du contenu en fonction de la résolution********************************************************************************* */
function display(flag) {
    var total = 0;
    contentCart.innerHTML = "";
    headCart.innerHTML = "";
    for (let index = 0; index < localStorage.length; index++) {
        if(regex.test(localStorage.key(index))) {
            var obj = JSON.parse(localStorage.getItem(localStorage.key(index)));
            if(flag) {   // Si la résolution est inférieure à 800px alors on affiche ce tableau
                contentCart.innerHTML += "<tr class='ref'><td colspan='2'>"+obj[0]._id+" <i class='fa fa-trash' title='Supprimer cette référence du panier'></i></td></tr>"
                +"<tr><td>Désignation</td><td>"+obj[0].name+"</td></tr>"
                +"<tr><td>Prix à l'unité</td><td>"+obj[0].price+"€</td></tr>"
                +"<tr><td>Quantité</td><td>"+obj[1]+"</td></tr>"  
                +"<tr><td>Prix total</td><td>"+parseInt(+obj[0].price*obj[1])+"</td></tr>";         // Calcul et conversion en int prix*quantité    
            } else {        // Si la résolution est supérieure à 800px alors on affiche ce tableau
                headCart.innerHTML = "<tr><th>Référence</th><th>Désignation</th><th>Prix</th><th>Quantité</th><th>Total</th></tr>";
                contentCart.innerHTML += "<tr><td>"+obj[0]._id+" <i class='fa fa-trash' title='Supprimer cette référence du panier'></i></td><td>"+obj[0].name+"</td><td>"+obj[0].price+"€</td><td>"+obj[1]+"</td><td>"+parseInt(+obj[0].price*obj[1])+"€</td></tr>";
            }
            total +=parseInt(+obj[0].price*obj[1]); // Calcul du total prix*quantité
        }
    }
    var trt = document.createElement("tr");
    trt.classList.add("total");
    if(flag) {   // Si la résolution est inférieure à 800px alors on affiche ce contenu
        contentCart.appendChild(trt).innerHTML = "<td colspan='5'>Montant total à payer :  "+total+"€ TTC</td>";
    } else {    // Si la résolution est supérieure à 800px alors on affiche ce contenu
        contentCart.appendChild(trt).innerHTML = "<td colspan='2' class='displayTotal'>Montant total de la commande : "+total+"€ TTC</td>";
    }
    var eltRemove = document.getElementsByClassName("fa-trash");
    for (var i = 0; i < eltRemove.length; i++) {   // Ajout d'un listener sur les icones poubelle pour supprimerun produit
        eltRemove[i].addEventListener('click', function(event) {
            removeProduct(event.target.parentElement.innerHTML.substring(0,24)); 
        });         // Suite au clic, appel de la fonction suppression de produit avec l'ID du produit en argument
    }
}
/***********************************Fonction d'édition du texte décrivant le nombre de produits au panier********************************************************************** */
const displayNbProductBuy = somme => {
    if(somme == 0) {
        return "Votre panier est vide pour le moment."
    } else if (somme == 1) {
        return "Il n'y a qu'un seul produit dans le panier actuellement."
    } else {
        return somme+" produits sont actuellement dans votre panier."
    }
}
/***********************************************Validation des informations suite à un changement de valeur************************************************************************* */
const markData = (elt,regex,event,label) => {  // Valide la saisie suite à un évènement sur le contrôle
    if(regex.test(event.target.value)) {                    // Test le regex de validité de la saisie
        elt.style.border = "1px solid rgb(196, 186, 196)";  // Affiche le message success dans la balise précédente
        elt.previousElementSibling.innerHTML = label.split("-")[0]+"<i class='fa fa-check-circle'></i>";
        return true;
    } else {
        elt.style.border = "1px solid red";      // Affiche le message d'erreur dans la balise précédente
        elt.previousElementSibling.innerHTML = label.split("-")[0]+"<span class='error'><i class='fa fa-times-circle'></i>"+label.split("-")[1]+"</span>";
        if(elt.value=="") {
            elt.previousElementSibling.innerHTML = label.split("-")[0]+"<span class='error'><i class='fa fa-times-circle'></i> Le champ ne peut pas être vide !</span>";
        }   
        return false;
    }
}
/*********************************************Validation des informations pré-enregistrer au chargement de la page******************************************************************** */
const markDataLoad = (elt,regex,label) => {        // Valide la saisie au chargement de la page
    if(regex.test(elt.value)) {                                     // Test le regex de validité de la saisie
        elt.style.border = "1px solid rgb(196, 186, 196)";          // Affiche le message success dans la balise précédente
        elt.previousElementSibling.innerHTML = label.split("-")[0]+"<i class='fa fa-check-circle'></i>";
        return true;
    } else {
        if(elt.value!="") {                         // Affiche le message d'erreur dans la balise précédente
            elt.style.border = "1px solid red";
            elt.previousElementSibling.innerHTML = label.split("-")[0]+"<span class='error'><i class='fa fa-times-circle'></i>"+label.split("-")[1]+"</span>";
        }
        return false;
    }   
}
/****************************************Fonction de contrôle du flag de validation de saisie de chaque champ********************************************************************** */
const getNbcheckInput = () => {
    let compteur = 0;
    for (let index = 0; index < controle.length; index++) {
        if(controle[index][2]) {
            compteur++              
        }  
    }            // Retourne le nombre de champs validés
    return compteur;        
}
/****************************************Fonction de contrôle du bouton submit **************************************************************************************************** */
disableButtonSubmit = (nbProduct,nbInputCheck) => {
    if(nbInputCheck==5 && nbProduct>0) {                // Si tous les champs sont OK et au moins 1 produit dans le panier alors on active le bouton
        submit.removeAttribute("disabled");  
    } else {                                            // sinon on le désactive
        submit.setAttribute("disabled",true);
    }
}

/*******************************************Fonction de suppression du produit du localStorage à partir de son ID *********************************************************** */
removeProduct = id => {
    for (let index = 0; index < localStorage.length; index++) {   // Parcours du localStorage à la recherche de l'ID à supprimer
        if(id==localStorage.key(index)) {
            localStorage.removeItem(localStorage.key(index));       // Supression
        }
    }
    let nbProduct = getNbProduct();
    contentCart.innerHTML = "";
    nbElement.innerHTML = displayNbProductBuy(nbProduct); // Actualisation du descriptif du panier
    displayNbProductInCart(som,nbProduct);                                 // Actualisation du nombre de produit des icones du panier
    display(responsiveTableDisplay());      // Actualisation du tableau responsive de contenu du panier
    disableButtonSubmit(nbProduct,getNbcheckInput());
}
/*******************************************Fonction de préparation du tableau de produit à envoyer au serveur ***********************************************************/
function getProductTab() {
    var tabProduct = [];
    for (let index = 0; index < localStorage.length; index++) {
        if(regex.test(localStorage.key(index))) { // Si un id est détecté dans le localStorage alors on l'ajoute au tableau contenant les produits
            tabProduct.push('"'+JSON.parse(localStorage.getItem(localStorage.key(index)))[0]._id+'"');
        }   
    }
    return tabProduct;     // Retourne le tableau en JSON, prêt pour envoie vers le serveur
}
/******************************************Fonction de préparation de l'objet JSON à envoyer au serveur************************************************************************/
function getContactObj() {
    contact = {};
    for (let index = 0; index < controle.length; index++) {
        var name = controle[index][0].name;   // Récupération des valeurs du formulaire
        var value = controle[index][0].value;
        if(name!="" && (name=="lastName" || name=="city")) {
            contact[name] = value.toUpperCase();        // Le nom et la ville sont formatés en majuscule puis assigné à l'objet
        } else if (name!="" && name=="firstName") {
            var tab = controle[index][0].value.split(" "); // 1ere lettre en majuscule les autres en minuscule et ceux pour chaque mot
            var valueFirstName = "";
            for (let index = 0; index < tab.length; index++) {
                valueFirstName += tab[index].substring(0,1).toUpperCase()+tab[index].substring(1).toLowerCase()+" ";
            }
            contact[name] = valueFirstName;  // Assignation de la nouvelle valeur dans l'objet
        } else {
            contact[name] = value;          // Pour les autres champs, pas de changement de valeur
        }
    }
    return contact;     // Retourne l'objet, prêt à être envoyé au serveur
}








    