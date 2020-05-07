const nbElement = document.createElement("p");
const regex = /^[a-z0-9]{24}$/;
var resp = true;
const card = document.getElementById('nbElement');
const som = document.getElementsByClassName("cart");
const form = document.getElementById("myForm");
const submit = document.getElementById("submit");
const headerCart = document.getElementById("contentCart");
const contentCart = document.getElementById("contentCart");
var responsiveTable = window.matchMedia('(max-width: 800px)');

var controle = [
    [document.getElementById("familyname"),/^[^\s]+[a-zA-Z-\s'éèàêûçàôë]{1,25}$/i,true,
    "Nom - Le nom est invalide ! Il doit comporter entre 2 et 25 caractères. Les chiffres et caractères spéciaux sont exclus."],
    [document.getElementById("firstname"),/^[^\s]+[a-zA-Z-\s'éèàêûçàôë]{1,25}$/i,true,
    "Prénom - Le prénom est invalide ! Il doit comporter entre 2 et 25 caractères. Les chiffres et caractères spéciaux sont exclus."],
    [document.getElementById("adress"),/^[^\s]+[\s\w-'éèàêûçàîôë]{1,100}$/i,true,
    "Adresse postale - Cette adresse est invalide ! Il doit comporter entre 2 et 100 caractères. Les caractères spéciaux sont exclus."],
    [document.getElementById("city"),/^[^\s]+[a-zA-Z-'\séèàêûçàôë]{1,40}$/i,true,
    "Ville - Cette ville est invalide ! Il doit comporter entre 2 et 40 caractères. Les chiffres et caractères spéciaux sont exclus."],
    [document.getElementById("mail"),/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,true,
    "Adresse électronique - Cette adress ne semble pas valide !"],
];


submit.setAttribute("disabled",true);
for (let i = 0; i < controle.length; i++) {
    controle[i][2] = markDataLoad(controle[i][0],controle[i][1],controle[i][3])
    controle[i][0].addEventListener("input", function(event) { 
        controle[i][2] = markData(controle[i][0],controle[i][1],event,controle[i][3]);
        if(disabledButton()==5&&sommeInCart()>0) {
            submit.removeAttribute("disabled");
        } else {
            submit.setAttribute("disabled",true);
        }
    }); 
}
if(disabledButton()==5) {
    submit.removeAttribute("disabled");
}
card.appendChild(nbElement);
form.addEventListener("submit", function(event) {
    event.preventDefault();
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/cameras/order");
    request.setRequestHeader("Content-Type", "application/json");
    var json = '{"contact":'+JSON.stringify(getContactObj())+',"products":['+getProductTab()+']}';
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && (this.status == 201||this.status == 200)) {
            sessionStorage.setItem("result-post",this.responseText);
            window.location.href = "/templates/validation.html";
        }  
    };
    request.send(json);    
});
responsiveTable.addEventListener("change", function(event) {
    display(responsiveTableDisplay());
});
display(responsiveTableDisplay());
displaySommeInCart(som); 
displayNbProductCart(sommeInCart(som));


function responsiveTableDisplay() {
    if(responsiveTable.matches) {
        resp = false;
    } else {
        resp = true;
    }
    return resp 
}

function display(flag) {
    var total = 0;
    contentCart.innerHTML = "";
    headCart.innerHTML = "";
    for (let index = 0; index < localStorage.length; index++) {
        if(regex.test(localStorage.key(index))) {
            var obj = JSON.parse(localStorage.getItem(localStorage.key(index)));
            if(flag) {
                headCart.innerHTML = "<tr class='rref'><th>Référence</th><th>Désignation</th><th>Prix</th><th>Quantité</th><th>Total</th></tr>";
                contentCart.innerHTML += "<tr><td>"+obj[0]._id+" <i class='fa fa-trash' title='Supprimer cette référence du panier'></i></td><td>"+obj[0].name+"</td><td>"+obj[0].price+"</td><td>"+obj[1]+"</td><td>"+parseInt(+obj[0].price*obj[1])+"€</td></tr>";
            } else {
                contentCart.innerHTML += "<tr class='ref'><td colspan='2'>Référence "+obj[0]._id+" <i class='fa fa-trash' title='Supprimer cette référence du panier'></i></td></tr>"
                +"<tr><td>Désignation</td><td>"+obj[0].name+"</td></tr>"
                +"<tr><td>Prix à l'unité</td><td>"+obj[0].price+"</td></tr>"
                +"<tr><td>Quantité</td><td>"+obj[1]+"</td></tr>"  
                +"<tr><td>Prix total</td><td>"+parseInt(+obj[0].price*obj[1])+"</td></tr>";       
            }
            total +=parseInt(+obj[0].price*obj[1]); 
        }
    }
    var trt = document.createElement("tr");
    trt.classList.add("total");
    if(resp) {
        contentCart.appendChild(trt).innerHTML = "<td colspan='5'>Montant total à payer :  "+total+"€ TTC</td>";
    } else {
        contentCart.appendChild(trt).innerHTML = "<td colspan='2' class='displayTotal'>Montant total de la commande : "+total+"€ TTC</td>";
    }
    var eltRemove = document.getElementsByClassName("fa-trash");
    for (var i = 0; i < eltRemove.length; i++) {
        eltRemove[i].addEventListener('click', function(event) {
            removeProduct(event.target.parentElement.innerHTML.substring(0,24));
        });
    }
}

function displayNbProductCart(somme) {
    if(somme == 0) {
        nbElement.innerHTML = "Votre panier est vide pour le moment."
    } else if (somme == 1) {
        nbElement.innerHTML = "Il n'y a qu'un seul produit dans le panier actuellement."
    } else {
        nbElement.innerHTML = somme+" produits sont actuellement dans votre panier."
    }
}
function markData(elt,regex,event,label) {
    var errorDisplay = false;
    if(regex.test(event.target.value)) { 
        elt.style.border = "1px solid rgb(196, 186, 196)";
        elt.previousElementSibling.innerHTML = label.split("-")[0]+"<i class='fa fa-check-circle'></i>";
        return true;
    } else {
        elt.style.border = "1px solid red";
        if(!errorDisplay) {
            elt.previousElementSibling.innerHTML = label.split("-")[0]+"<span class='error'><i class='fa fa-times-circle'></i>"+label.split("-")[1]+"</span>";
            errorDisplay++;
        }
        if(elt.value=="") {
            elt.previousElementSibling.innerHTML = label.split("-")[0]+"<span class='error'><i class='fa fa-times-circle'></i> Le champ ne peut pas être vide !</span>";
        }   
        return false;
    }
}
function markDataLoad(elt,regex,label) {
    if(regex.test(elt.value)) {
        elt.style.border = "1px solid rgb(196, 186, 196)";
        elt.previousElementSibling.innerHTML = label.split("-")[0]+"<i class='fa fa-check-circle'></i>";
        return true;
    } else {
        if(elt.value!="") {
            elt.style.border = "1px solid red";
            elt.previousElementSibling.innerHTML = label.split("-")[0]+"<span class='error'><i class='fa fa-times-circle'></i>"+label.split("-")[1]+"</span>";
        }
        return false;
    }   
}
function disabledButton() {
    var compteur = 0;
    for (let index = 0; index < controle.length; index++) {
        if(controle[index][2]) {
            compteur++
        }  
    }
    return compteur;
}

function removeProduct(id) {
    for (let index = 0; index < localStorage.length; index++) { 
        if(id==localStorage.key(index)) {
            localStorage.removeItem(localStorage.key(index));
        }
    }
    contentCart.innerHTML = "";
    displayNbProductCart(sommeInCart(som));
    displaySommeInCart(som);
    display();
}

function getProductTab() {
    var tabProduct = [];
    for (let index = 0; index < localStorage.length; index++) {
        if(regex.test(localStorage.key(index))) {
            tabProduct.push('"'+JSON.parse(localStorage.getItem(localStorage.key(index)))[0]._id+'"');
        }   
    }
    return tabProduct;
}

function getContactObj() {
    contact = {};
    for (let index = 0; index < controle.length; index++) {
        var name = controle[index][0].name;
        var value = controle[index][0].value;
        if(name!=""&&(name=="lastName"||name=="city")) {
            contact[name] = value.toUpperCase();
        } else if (name!=""&&name=="firstName") {
            var tab = controle[index][0].value.split(" ");
            var valueFirstName = "";
            for (let index = 0; index < tab.length; index++) {
                valueFirstName += tab[index].substring(0,1).toUpperCase()+tab[index].substring(1).toLowerCase()+" ";
            }
            contact[name] = valueFirstName;
        } else {
            contact[name] = value;
        }
    }
    return contact;
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






    