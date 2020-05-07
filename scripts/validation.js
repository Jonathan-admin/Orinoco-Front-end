
const regex = /^[a-z0-9]{24}$/;
const id = document.getElementById("id");
const dateTime = document.getElementById("dateTime");
const objDate = new Date();
const dataContact = ["Nom","Prénom","Adresse postale","Ville","Adresse électronique"];
const orderContent = document.getElementById("order-content");
const contactContent = document.getElementById("contact-content");
const responseObj = JSON.parse(sessionStorage.getItem("result-post"));
var responsiveTable = window.matchMedia('(max-width: 800px)');

responsiveTable.addEventListener("change", function(event) {
    display(responsiveTableDisplay());
});
display(responsiveTableDisplay());
localStorage.clear();

function responsiveTableDisplay() {
    if(responsiveTable.matches) {
        resp = false;
    } else {
        resp = true;
    }
    return resp 
}

function display(flag) {
    orderContent.innerHTML = "";
    headCart.innerHTML = "";
    contactContent.innerHTML = "";
    var total = 0;
    for (let index = 0; index < responseObj.products.length; index++) {
        if(flag) {
            orderContent.classList.remove("borderTable");
            headCart.innerHTML = "<tr><th>Référence</th><th>Aperçu</th><th>Designation</th><th>Prix</th></tr>";
            orderContent.innerHTML += "<td>"+responseObj.products[index]._id+"</td><td><img src='"+responseObj.products[index].imageUrl+"'/></td><td>"+responseObj.products[index].name+"</td><td>"+responseObj.products[index].price+"€</td>";
        } else {
            orderContent.classList.add("borderTable");
            orderContent.innerHTML += "<tr class='ref'><td colspan='2'>Référence "+responseObj.products[index]._id+"</td></tr>"
            +"<tr><td>Aperçu</td><td><img src='"+responseObj.products[index].imageUrl+"'/></td></tr>"
            +"<tr><td>Désignation</td><td>"+responseObj.products[index].name+"</td></tr>"
            +"<tr><td>Prix</td><td>"+responseObj.products[index].price+"</td></tr>";
        }
        total += responseObj.products[index].price; 
    }
    var iterator = 0;
    for (const key in responseObj.contact) {
        if (responseObj.contact.hasOwnProperty(key)) {
            var tr = document.createElement("tr");
            contactContent.appendChild(tr).innerHTML = "<td>"+dataContact[iterator]+"</td><td>"+responseObj.contact[key]+"</td>"
            iterator++;
        }
    }
    var trt = document.createElement("tr");
    trt.classList.add("total");
    if(resp) {
        orderContent.appendChild(trt).innerHTML = "<td colspan='4'>Montant total à payer : "+total+"€ TTC</td>"; 
    } else {
        orderContent.appendChild(trt).innerHTML = "<td colspan='2' class='displayTotal'>Montant total à payer : "+total+"€ TTC</td>"; 
    }
    id.innerHTML = responseObj.orderId;
    dateTime.innerHTML = objDate.getDate()+"/"+(objDate.getMonth()+1)+"/"+objDate.getFullYear()+" à "+objDate.getHours()+":"+objDate.getMinutes();
}


 






   
