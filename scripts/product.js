var id = this.sessionStorage.getItem("idProduct");
var objProduct = {};
var quantity = 1;
regex = /^[a-z0-9]{24}$/;
const contentPicture = document.getElementById("picture");
const contentDesc = document.getElementById("desc");
const addCart = document.getElementById("addCart");
const som = document.getElementsByClassName("cart");
const msgLoading = document.getElementById("msgLoading");
const contentProduct = document.getElementById("product");
const modalBody = document.getElementById("modalBody");
const modalDisplay = document.getElementById("modalDisplay");

window.onload = function () { 
    displaySommeInCart(som);
    contentProduct.nextElementSibling.style.display = "none";   
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            switch (this.status) {
                case 200:
                    msgLoading.style.display = "none";
                    contentProduct.nextElementSibling.style.display = "flex";
                    var product = JSON.parse(this.responseText);
                    contentPicture.innerHTML = "<img src='"+product.imageUrl+"' alt='Image du produit' />";
                    contentDesc.innerHTML = "<h3 class='name'>"+product.name+"</h3>"+
                            "<p>Référence produit: "+product._id+" "+
                            "<h4>Description</h4>"+
                            "<p>"+product.description+"</p>"+
                            "<h4>Lentilles de la caméra</h4>"  +
                            "<label for='lentille'>Veuillez sélectionner le type de lentilles</label>"+
                            "<select name='lentille' id='lenses'></select>"+
                            "<h4>Prix TTC</h4>"+
                            "<table class='table table-striped' id='table-price'>"+
                            "<thead><tr><th>Quantité</th><th>Prix</th></tr></thead>"+
                            "<tbody><tr><td>A l'unité</td><td>"+product.price+"€</td></tr>"+
                            "<tr><td><input type='number' id='quantity' name='quantity' min='1' max='10' value='1'/></td>"+
                            "<td><span>"+product.price+"€</span></td></tr></tbody></table";              
                    const element = document.getElementById("lenses");
                    for(var i=0 in product.lenses) {
                        element.innerHTML += "<option value='val"+i+"'>"+product.lenses[i]+"</option>";
                    }
                    const ttc = document.getElementById("quantity");
                    ttc.addEventListener("click", function(event) {
                        document.querySelector("td>span").innerHTML = ttc.value*product.price+"€";
                        quantity = ttc.value;
                    });
                    objProduct = product;
                    break;
                case 0:
                    msgLoading.innerHTML =  "<p><i class='fa fa-times-circle'></i>Oups! Le serveur ne semble pas répondre. Merci de réessayer ultérieurement.</p>";          
                    break;
                case 404:
                    msgLoading.innerHTML =  "<p><i class='fa fa-times-circle'></i>Erreur HTTP 404: La ressource que vous demandez n'existe pas.</p>";       
                    break;
                case 500:
                    msgLoading.innerHTML =  "<p><i class='fa fa-times-circle'></i>Erreur HTTP 500: La requête envoyée au serveur n'a pas aboutie en raison d'un problème rencontré dans un des fichiers du site.</p>";       
                    break;
                default:
                    msgLoading.innerHTML =  "<p><i class='fa fa-times-circle'></i>Un incident technique est survenue lors de l'affichage de la page. Merci de ré-essayer ultérieurement.</p>";       
                    break;
            }
        } else {
            msgLoading.innerHTML =  "<img src='../images/loading.gif' alt='image de chargement' id='loading'/>";          
        } 
    };
    request.open("GET", "http://localhost:3000/api/cameras/"+id);
    request.send();   
}
modalDisplay.addEventListener("click", function(event) {
    modalBody.innerHTML = "";
    displayModalConfirmation(objProduct,quantity);
});
addCart.addEventListener("click", function(event) {
    addProductInCart(objProduct,quantity);
    displaySommeInCart(som);
});

function displayModalConfirmation(objProduct,qty) {
    var p = document.createElement("p");
    var exp = "";
    if(qty == 1) {
        exp = "Vous êtes sur le point d'ajouter au panier la caméra "+objProduct.name+" d'un montant de "+objProduct.price+"€. Confirmez-vous cet achat?";
    } else {
        exp = "Vous êtes sur le point d'ajouter "+qty+" caméras à votre panier d'un montant total de "+objProduct.price*qty+"€ (dont "+objProduct.price+"€ l'unité). Confirmez- vous l'achat de ces "+qty+" caméras?";
    }
    p.innerHTML = exp;
    modalBody.appendChild(p);
    addCart.setAttribute("data-dismiss","modal");
}

function addProductInCart(obj,qty) {
    var index = 0;
    while ((!regex.test(localStorage.key(index))&&index<localStorage.length)||localStorage.length==0) {
        var val = [obj,qty]; 
        localStorage.setItem(obj._id,JSON.stringify(val));
        index++;
        return 0;
    }
    for (let index = 0; index < localStorage.length; index++) {
        var key = localStorage.key(index); 
        if(obj._id==key) {  
            var val = [obj,parseInt(JSON.parse(localStorage.getItem(obj._id))[1])+parseInt(qty)];
            localStorage.setItem(obj._id,JSON.stringify(val));
            index =  localStorage.length;
            return 0;
        }
    }
    var val = [obj,qty]; 
    localStorage.setItem(obj._id,JSON.stringify(val));
    return 0;
}

function sommeInCart() {
    var somme = 0;
    for (let index = 0; index < localStorage.length; index++) {
        if(regex.test(localStorage.key(index))) {
            somme += parseInt(JSON.parse(localStorage.getItem(localStorage.key(index)))[1],10);
        } 
    }
    return somme;
}

function displaySommeInCart(elt) {
    var somme = sommeInCart(regex); 
    for (let index = 0; index < elt.length; index++) {
        if(somme>9) {
            elt[index].style.right = "30px";
        } else {
            elt[index].style.right = "23px";
        } 
        elt[index].innerHTML = somme; 
    }
}

   
  










            


