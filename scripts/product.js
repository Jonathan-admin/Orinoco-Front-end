var id = this.sessionStorage.getItem("idProduct");
var objProduct = {};

window.onload = function () { 

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        const contentPicture = document.getElementById("picture");
        const contentDesc = document.getElementById("desc");

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var product = JSON.parse(this.responseText);
            contentPicture.innerHTML = "<img src='"+product.imageUrl+"' alt='Image du produit' />";
            contentDesc.innerHTML = "<h3>"+product.name+"</h3>"+
                                    "<p>Identifiant: "+product._id+" "+
                                    "<h4>Description</h4>"+
                                    "<p>"+product.description+"</p>"+
                                    "<h4>Lentilles de la caméra</h4>"  +
                                    "<label for='lentille'>Veuillez sélectionner une référence</label>"+
                                    "<select name='lentille' id='lenses'></select>"+
                                    "<h4>Prix TTC</h4>"+
                                    "<p>"+product.price+" €</p>";
            var element = document.getElementById("lenses");
            for(var i=0 in product.lenses) {
                element.innerHTML += "<option value='val"+i+"'>"+product.lenses[i]+"</option>";
            }
            objProduct = product;
        }     
    };
    request.open("GET", "http://localhost:3000/api/cameras/"+id);
    request.send();   
}

var cart = document.getElementById("addCart");
cart.addEventListener("click", function(event) {
    addCart(objProduct,id);
    //supprCart();
});

function supprCart() {
    localStorage.clear();
}

function addCart(obj,id) {
    localStorage.setItem("cart",obj);
  
}

