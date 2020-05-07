var total = 0;
const regex = /^[a-z0-9]{24}$/;
const id = document.getElementById("id");
const dateTime = document.getElementById("dateTime");
const objDate = new Date();
const dataContact = ["Nom","Prénom","Adresse postale","Ville","Adresse électronique"];
const orderContent = document.getElementById("order-content");
const contactContent = document.getElementById("contact-content");
const responseObj = JSON.parse(sessionStorage.getItem("result-post"));


display();
localStorage.clear();

function display() {
    for (let index = 0; index < responseObj.products.length; index++) {
        var tr = document.createElement("tr");
        orderContent.appendChild(tr).innerHTML = "<td>"+responseObj.products[index]._id+"</td><td><img src='"+responseObj.products[index].imageUrl+"'/></td><td>"+responseObj.products[index].name+"</td><td>"+responseObj.products[index].price+"€</td>";
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
    orderContent.appendChild(trt).innerHTML = "<td colspan='2'><td>Montant total à payer : </td><td>"+total+"€ TTC</td>";
    id.innerHTML = responseObj.orderId;
    dateTime.innerHTML = objDate.getDate()+"/"+(objDate.getMonth()+1)+"/"+objDate.getFullYear()+" à "+objDate.getHours()+":"+objDate.getMinutes();
}


 






   