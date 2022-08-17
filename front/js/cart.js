//Récupération des infos stocké dans le local storage
let basket = JSON.parse(localStorage.getItem("produit"));

//Affichage des éléments du panier
function showBasket() {
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
                    <p index="${[i]}" onclick="supprimerArticle(this)" class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>
    `;
        }
    }
}
showBasket();

console.log(basket);










