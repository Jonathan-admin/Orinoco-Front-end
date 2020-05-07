const regex = /^[a-z0-9]{24}$/;



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
