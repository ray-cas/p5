//Récupération des infos stocké dans le local storage
let basket = JSON.parse(localStorage.getItem("product"));

//Affichage des éléments du panier

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
}





// Supression de la ligne  au clic du bouton suppr
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
        basket.splice(index, 1);
        localStorage.setItem("product", JSON.stringify(basket));
        location.reload();
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











