
window.onload = function () { 
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        var tableContent = "";
        const contentList = document.getElementById("content-list");
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var products = JSON.parse(this.responseText);
            var tableContent = "";
            for (var i = 0; i < products.length; i++) { 
                tableContent+= '<tr class="items" id="'+products[i]._id+'"><td><img src="'+products[i].imageUrl+'" alt="Photo produit caméra"'+i+'/></td>';
                tableContent+= "<td>"+products[i].name+"</td>";
                tableContent+= "<td>"+products[i].price+"</td></tr></a>";
            }
            contentList.innerHTML =  tableContent; 
        }  
        else {
            contentList.innerHTML =  "<tr class='error'><td colspan='3'><i class='fa fa-times-circle'></i>Une erreur est survenur lors de la lecture des informations produit</td></tr>";          
        }
        
    };
    request.open("GET", "http://localhost:3000/api/cameras/");
    request.send();   
}

    $(document).ready(function() {
        $(document).on('click','#content-list tr',function(event) {
            sessionStorage.setItem("idProduct",this.attributes[1].value);
            window.location.href = "/templates/product.html";
        });  
    });

