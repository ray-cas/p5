//Récupération des infos stocké dans le local storage
let basket = JSON.parse(localStorage.getItem("product"));

//Affichage des éléments du panier

function basketShow() {
    

//Si panier vide
if (basket === null || basket.length == 0) {
    document.querySelector("#cartAndFormContainer > h1").textContent += " est vide";
}
// si element dans panier
else {
    for (i = 0; i < basket.length; i++) {
        document.querySelector("#cart__items").innerHTML += `
    <article class="cart__item" data-id="${basket[i].productID}">
        <div class="cart__item__img">
            <img src="${basket[i].image}" alt="${basket[i].imageAlt}" />
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${basket[i].name}</h2>
                <p>${basket[i].price}</p>
                <p>Couleur: ${basket[i].choixOpt}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input index="${[i]}" onchange="getNewQty(this)" id="cartQty" type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${basket[i].qty}" />
                </div>
                <div class="cart__item__content__settings__delete">
                    <p index="${[i]}" onclick="supprArticle(this)" class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>
    `;
    }
}}
basketShow();






// Supression de la ligne  au clic du bouton suppr ou qty a zero
function supprArticle(e) {
    let index = e.getAttribute("index");
    basket.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(basket));
    location.reload();
}

// Mise à jour des quantités et total prix si modification des valeures dans l'input
function getNewQty(e) {
    let index = e.getAttribute("index");
    let newQty = e.value;
    basket[index].qty = newQty;

    if (newQty == 0) {
        supprArticle(e)
    } else {
        document.querySelector("#totalQuantity").innerHTML = totalQty();
        document.querySelector("#totalPrice").innerHTML = totalPrice();
        localStorage.setItem("product", JSON.stringify(basket));
    }
}
// Calcul du total prix
function totalPrice() {
    let varTotalPrice = 0;
    for (let i = 0; i < basket.length; i++) {
        let quantity = parseInt(basket[i].qty);
        let prix = parseInt(basket[i].price);
        varTotalPrice += prix * quantity;
    }
    return varTotalPrice;
}

// affichage du total prix
document.querySelector("#totalPrice").innerHTML = totalPrice();

// Calcul du total quantité(s)
function totalQty() {
    let totalQty = 0;
    for (let i = 0; i < basket.length; i++) {
        let quantity = parseInt(basket[i].qty);
        totalQty += quantity;
    }
    return totalQty;
}

// affichage du total quantités
document.querySelector("#totalQuantity").innerHTML = totalQty();

// Selection de la div contenant tout le formulaire
let form = document.querySelector(".cart__order__form");

//Selection des éléments du formulaire
let firstName = form.firstName;
let lastName = form.lastName;
let address = form.address;
let city = form.city;
let email = form.email;
let boutonCommander = form.submit;

//Declaration des RegExp
let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
let nameRegExp = /^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/;
let addressRegExp = /^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]+$/;

//Verif Prenom
firstName.addEventListener("input", function () {
    verificationFirstName(firstName);
});

function verificationFirstName() {
    let testFirstName = nameRegExp.test(firstName.value);
    if (testFirstName == false) {
        firstName.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou caractères spéciaux`;
        return false;
    } else {
        firstName.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Verif Nom de famille
lastName.addEventListener("input", function () {
    verificationLastName(lastName);
});

function verificationLastName() {
    let testlastName = nameRegExp.test(lastName.value);
    if (testlastName == false) {
        lastName.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou caractères spéciaux`;
        return false;
    } else {
        lastName.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Verif adresse
address.addEventListener("input", function () {
    verificationAddress(address);
});

function verificationAddress() {
    let testAddress = addressRegExp.test(address.value);
    if (testAddress == false) {
        address.nextElementSibling.innerHTML = `Veuillez saisir une adresse valide <br> Exemple: <i>10 rue de Paris</i>`;
        return false;
    } else {
        address.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Verif Ville
city.addEventListener("input", function () {
    verificationCity(city);
});

function verificationCity() {
    let testCity = nameRegExp.test(city.value);
    if (testCity == false) {
        city.nextElementSibling.innerHTML = `Veuillez saisir une nom de ville valide <br> Ne doit pas contenir de chiffre`;
        return false;
    } else {
        city.nextElementSibling.innerHTML = "";
        return true;
    }
}



//Verif Email
email.addEventListener("change", function () {
    verificationEmail(email);
});

function verificationEmail() {
    let testEmail = emailRegExp.test(email.value);
    if (testEmail == false) {
        email.nextElementSibling.innerHTML = "Veuillez saisir une adresse email valide";
        return false;
    } else {
        email.nextElementSibling.innerHTML = "";
        return true;
    }
}

// Envoie du formulaire au clique du bouton commander
boutonCommander.addEventListener("click", function (event) {
    event.preventDefault();
    //Si tous les éléments du formulaire sont  OK
    if (verificationFirstName(firstName) && verificationLastName(lastName)  && verificationAddress(address) && verificationCity(city) && verificationEmail(email)) {
        //Recup ID des produits du panier (seul élément a devoir être envoyé vers serveur)
        function recupIdProduct() {
            let idProduct = [];
            for (let i = 0; i < basket.length; i++) {
                id = basket[i].productID;
                idProduct.push(id);
            }
            return idProduct;
        }
        //déclaration d'une variable contenant les ID
        let productID = recupIdProduct();

        //création de l'objet commande (contenant les infos du client + id des produits commandé)
        let commande = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: productID,
        };

        console.log(commande);
    }
});
