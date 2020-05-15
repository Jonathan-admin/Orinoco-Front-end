/*       |-------------------------------------------------------------------------|
         |    VARIABLES ET FONCTIONS JAVASCRIPT REUTILISABLE SUR TOUTES LES PAGES  |
         |-------------------------------------------------------------------------|
--------------------------------------------Variables réutilisables-------------------------------------------------------------------------------------------------*/

const regex = /^[a-z0-9]{24}$/;
const som = document.getElementsByClassName("cart");
const responsiveTable = window.matchMedia('(max-width: 800px)');

/*------------------------------------------Fonctions réutilisables----------------------------------------------------------------------------------------------------*/

/*******************************Fonction Retourne le nombre de produit dans le panier *********************************************************************************************/
const getNbProduct = () => {
    let somme = 0;
    for (let index = 0; index < localStorage.length; index++) {
        if(regex.test(localStorage.key(index))) {
            somme += parseInt(JSON.parse(localStorage.getItem(localStorage.key(index)))[1],10);
        } 
    }
    return somme;   // Retourne le nombre de produits
}
/**********************************************************Fonction position du nombre de produit dans le panier sur l'icone panier************************************************ */
displayNbProductInCart = (elt,somme) => { 
    for (let index = 0; index < elt.length; index++) {
        if(somme > 9) { 
            elt[index].style.right = "30px";
        } else {
            elt[index].style.right = "23px";
        } 
        elt[index].innerHTML = somme; 
    }                                   // Affiche le nombre de produit sur l'icone panier en fonction de sa valeur 
}
/*********************************************Fonction d'adaptation de l'affichage des tableaux en fonction du média query********************************************************************** */
const responsiveTableDisplay = () => {
    if(responsiveTable.matches) {
        return true;   // Retourne false si la condition media query est satisfaite (max-width: 800px), true sinon
    } else {
        return false;  
    }
}
/******************************************Fonction de formatage du prix du produit***************************************************************************************************/
const getPrice = (price,qty) => { 
    return parseFloat((price*qty)/100).toFixed(2).replace(".",",");
}       // Retourne un prix au format XX,XX, le point du nombre flottant est remplacé par une virgule.

/**********************************************Fonction d'envoi de requête GET à l'API backend************************************************************************************ */
let sendRequest = (method,url,data) => { 
    return new Promise((resolve,reject) => {
        let request = new XMLHttpRequest();                 // Fonction avec promise
        request.open(method,url);
        request.onload = () => {          
            switch (request.status) {
                case 200:
                    resolve(request.responseText);          // Promesse résolue si le code HTTP de la requête est 200
                    break;
                case 404:                                   // Pour les autres codes HTTP, la promesse est rejetée même si la requête est à l'état DONE
                    reject("Erreur HTTP 404: La ressource que vous demandez n'existe pas.");        
                    break;
                case 500:
                    reject("Erreur HTTP 500: La requête envoyée au serveur n'a pas aboutie en raison d'un problème rencontré durant l'exécution des scripts.");       
                    break;
                default:
                    if(request.status>200 && request.status<300) {
                        resolve(request.responseText);
                    } else {
                        reject("Un incident technique est survenue lors de l'affichage de la page. Merci de ré-essayer ultérieurement.");       
                        break; 
                    } 
            }
        }
        request.onerror = () => {                           // Promesse rejetée en cas d'erreur ou absence de réponse du serveur
            if(request.status===0) { 
                reject("Oups! Le serveur ne semble pas répondre. Merci de réessayer ultérieurement.");
            } else {
                reject(request.statusText);
            }
        }
        if(method=="POST") {
            request.setRequestHeader("Content-Type", "application/json");
            request.send(data);
        } else {
            request.send();
        }
    });
}