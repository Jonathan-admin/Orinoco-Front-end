const regex = /^[a-z0-9]{24}$/;
const som = document.getElementsByClassName("cart");

window.onload = function () { 
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        var tableContent = "";
        const contentList = document.getElementById("content-list");
        if (this.readyState == XMLHttpRequest.DONE) {
            switch (this.status) {
                case 200:
                    var products = JSON.parse(this.responseText);
                    var tableContent = "";
                    for (var i = 0; i < products.length; i++) { 
                        tableContent+= '<tr class="items" id="'+products[i]._id+'"><td><img src="'+products[i].imageUrl+'" alt="Photo produit caméra"'+i+'/></td>';
                        tableContent+= "<td>"+products[i].name+"</td>";
                        tableContent+= "<td>"+products[i].price+"€</td></tr></a>";
                    }
                    contentList.innerHTML =  tableContent; 
                    const items = document.querySelectorAll("#content-list tr");
                    for (let index = 0; index < items.length; index++) {
                        items[index].addEventListener("click", function(event) {
                            sessionStorage.setItem("idProduct",items[index].attributes[1].value);
                            window.location.href = "/templates/product.html";  
                        });
                    }
                    break;
                case 0:       
                    contentList.innerHTML =  "<tr class='msg'><td colspan='3'><i class='fa fa-times-circle'></i>Oups! Le serveur ne semble pas répondre. Merci de réessayer ultérieurement.</td></tr>";          
                    break;
                case 404:
                    contentList.innerHTML =  "<tr class='msg'><td colspan='3'><i class='fa fa-times-circle'></i>Erreur HTTP 404: La ressource que vous demandez n'existe pas.</td></tr>";       
                    break;
                case 500:
                    contentList.innerHTML =  "<tr class='msg'><td colspan='3'><i class='fa fa-times-circle'></i>Erreur HTTP 500: La requête envoyée au serveur n'a pas aboutie en raison d'un problème rencontré durant l'exécution des scripts.</td></tr>";       
                    break;
                default:
                    contentList.innerHTML =  "<tr class='msg'><td colspan='3'><i class='fa fa-times-circle'></i>Un incident technique est survenue lors de l'affichage de la page. Merci de ré-essayer ultérieurement.</td></tr>";       
                    break;
            }
        } else {
            contentList.innerHTML =  "<tr class='msg'><td colspan='3'><img src='images/loading.gif' alt='image de chargement' id='loading'/></td></tr>";          
        } 
    };
    request.open("GET", "http://localhost:3000/api/cameras/");
    request.send();
    displaySommeInCart(som);
}

function sommeInCart(reg) {
    var somme = 0;
    for (let index = 0; index < localStorage.length; index++) {
        if(reg.test(localStorage.key(index))) {
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

