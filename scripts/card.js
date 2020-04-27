const nbElement = document.createElement("p");

var card = document.getElementById('nbElement');
card.appendChild(nbElement);


if(window.localStorage.length == 0) {
    nbElement.innerHTML = "Votre panier est vide pour le moment."
} else if (window.localStorage.length == 1) {
    nbElement.innerHTML = "Il n'y a qu'un seul produit dans le panier actuellement."
} else {
    nbElement.innerHTML = window.localStorage.length+" produits sont actuellement dans votre panier."
}

var controle = [
    [document.getElementById("familyname"),/^[a-zA-Z-\s'éèàêûçàôë]{2,25}$/i,false,"Nom"],
    [document.getElementById("firstname"),/^[a-zA-Z-\s'éèàêûçàôë]{2,25}$/i,false,"Prénom"],
    [document.getElementById("adress"),/^[\s\w'éèàêûçàîôë]{2,50}$/i,false,"Adresse postale"],
    [document.getElementById("city"),/^[a-zA-Z-\s'éèàêûçàôë]{2,25}$/i,false,"Ville"],
    [document.getElementById("mail"),/^[a-zA-Z-\s'éèàêûçàôë]{2,25}$/i,false,"Adresse électronique"],
    [document.getElementById("submit"),/^[a-zA-Z-\s'éèàêûçàôë]{2,25}$/i,false,""]
];


for (let i = 0; i < controle.length-1; i++) {
    controle[i][0].addEventListener("input", function(event) { 
        markData(controle[i][0],controle[i][1],event,controle[i][3]);
    });   
}
function markData(elt,regex,event,text) {
    var errorDisplay = false;
    if(regex.test(event.target.value)) {
        elt.style.border = "2px solid blue"; 
        elt.previousElementSibling.innerHTML = text;
        return true;
    } else {
        elt.style.border = "2px solid red";
        if(!errorDisplay) {
            elt.previousElementSibling.innerHTML = text+"<span class=''><i class='fa fa-times-circle'>Saisie invalide</span>";
            errorDisplay++;
        }   
        return false;
    }
}



