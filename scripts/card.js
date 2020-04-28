const nbElement = document.createElement("p");
regex = /^[a-z0-9]{24}$/;
var card = document.getElementById('nbElement');
card.appendChild(nbElement);

sommeCart();
function displayNbProductCart(somme) {
    if(somme == 0) {
        nbElement.innerHTML = "Votre panier est vide pour le moment."
    } else if (somme == 1) {
        nbElement.innerHTML = "Il n'y a qu'un seul produit dans le panier actuellement."
    } else {
        nbElement.innerHTML = somme+" produits sont actuellement dans votre panier."
    }
}


var controle = [
    [document.getElementById("familyname"),/^[a-zA-Z-\s'éèàêûçàôë]{2,25}$/i,true,
    "Nom - Le nom est invalide ! Il doit comporter entre 2 et 25 caractères. Les chiffres et caractères spéciaux sont exclus."],
    [document.getElementById("firstname"),/^[a-zA-Z-\s'éèàêûçàôë]{2,25}$/i,true,
    "Prénom - Le prénom est invalide ! Il doit comporter entre 2 et 25 caractères. Les chiffres et caractères spéciaux sont exclus."],
    [document.getElementById("adress"),/^[\s\w-'éèàêûçàîôë]{2,100}$/i,true,
    "Adresse postale - Cette adresse est invalide ! Il doit comporter entre 2 et 100 caractères. Les caractères spéciaux sont exclus."],
    [document.getElementById("city"),/^[a-zA-Z-\s'éèàêûçàôë]{2,40}$/i,true,
    "Ville - Cette ville est invalide ! Il doit comporter entre 2 et 40 caractères. Les chiffres et caractères spéciaux sont exclus."],
    [document.getElementById("mail"),/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,true,
    "Adresse électronique - Cette adress ne semble pas valide !"],
];
const submit = document.getElementById("submit");

submit.setAttribute("disabled",true);
for (let i = 0; i < controle.length; i++) {
    controle[i][2] = markDataLoad(controle[i][0],controle[i][1],controle[i][3])
    controle[i][0].addEventListener("input", function(event) { 
        controle[i][2] = markData(controle[i][0],controle[i][1],event,controle[i][3]);
        if(disabledButton()==5) {
            submit.removeAttribute("disabled");
        } else {
            submit.setAttribute("disabled",true);
        }
    }); 
}

if(disabledButton()==5) {
    submit.removeAttribute("disabled");
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

const contentList = document.getElementById("content-list");
displayNbProductCart(sommeCart());
display();

function display() {
    var total = 0;
    const contentList = document.getElementById("content-list");
    for (let index = 0; index < localStorage.length; index++) {
        if(regex.test(localStorage.key(index))) {
            var obj = JSON.parse(localStorage.getItem(localStorage.key(index)));
            var tr = document.createElement("tr");
            contentList.appendChild(tr).innerHTML = "<td>"+obj[0]._id+"<i class='fa fa-trash'></i></td><td>"+obj[0].name+"</td><td>"+obj[0].price+"</td><td>"+obj[1]+"</td><td>"+parseInt(+obj[0].price*obj[1])+"€</td>";
        }  
        total +=parseInt(+obj[0].price*obj[1]); 
    }
    var trt = document.createElement("tr");
    contentList.appendChild(trt).innerHTML = "<td colspan='3'><td>Montant total à payer : </td><td>"+total+"€ TTC</td>";
    var eltRemove = document.getElementsByClassName("fa-trash");
    for (var i = 0; i < eltRemove.length; i++) {
        eltRemove[i].addEventListener('click', function(event) {
            removeProduct(event.target.parentElement.innerHTML.substring(0,24));
        });
    }
}


function removeProduct(id) {alert("poi");
    for (let index = 0; index < localStorage.length; index++) {
        if(id==localStorage.key(index)) {
            localStorage.removeItem(localStorage.key(index));
        }  
    }
    contentList.innerHTML = "";
    displayNbProductCart(sommeCart());
    display();
}

function sommeCart() {
    var somme = 0;
    for (let index = 0; index < localStorage.length; index++) {
        if(regex.test(localStorage.key(index))) {
            somme += parseInt(JSON.parse(localStorage.getItem(localStorage.key(index)))[1],10);
        } 
    }
    return somme;
}
    