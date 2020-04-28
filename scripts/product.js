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
});

function addCart(obj) {
    var index = 0;
    regex = /^[a-z0-9]{24}$/;
    while ((!regex.test(localStorage.key(index))&&index<localStorage.length)||localStorage.length==0) {
        var val = [obj,1]; alert("poste 1");
        localStorage.setItem(obj._id,JSON.stringify(val));
        index++;
        return 0;
    }
    for (let index = 0; index < localStorage.length; index++) {
        var key = localStorage.key(index); 
        if(obj._id==key) {  alert("poste 2");
            var val = [obj,parseInt(JSON.parse(localStorage.getItem(obj._id))[1],10)+1];
            localStorage.setItem(obj._id,JSON.stringify(val));
            index =  localStorage.length;
            return 0;
        }
    }
    var val = [obj,1]; alert("poste 3");
    localStorage.setItem(obj._id,JSON.stringify(val));
    return 0;
}








            


