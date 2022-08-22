//Récupération de l'id depuis l'url
let params = new URL(document.location).searchParams;
let idProduct = params.get("id");

//Fetch des données par rapport à l'id récupéré dans l'url du produit


// Affichage du produit

fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        let choixColor = document.querySelector("#colors");
        document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        document.getElementById("title").textContent = data.name;
        document.getElementById("price").textContent = data.price;
        document.getElementById("description").textContent = data.description;
        data.colors.forEach((option) => {
            choixColor.innerHTML += `<option value="${option}">${option}</option>`;
        });
    })
    .catch(function (err) {
        console.log("Oh no", err)

    });



//Ajouter produit au panier lors du clique
document.getElementById("addToCart").addEventListener("click", function (e) {
    if (document.querySelector("#colors").value == "") {
        alert("Veuillez sélectionnez une couleur");
        e.preventDefault();
    } else {
        // Select des elements à mettre dans le panier
        let image = document.querySelector("body > main > div > section > article > div.item__img > img").src;
        let imageAlt = document.querySelector("body > main > div > section > article > div.item__img > img").alt;
        let name = document.getElementById("title").textContent;
        let price = document.getElementById("price").textContent + "€";
        let choixOpt = document.querySelector("#colors").value;
        let productID = idProduct;
        //transformation du type of qty
        let qty = Number(document.querySelector("#quantity").value);

        //pour tester la boucle et l'arreter
        let indexLoop = 0;

        // ajout des elt du panier dans un tableau
        let basketElement = { image, imageAlt, name, price, choixOpt, qty, productID };

        //Déclaration au format js de la clé produit stocké dans le local storage
        let localstorageBasket = JSON.parse(localStorage.getItem("product"));

        //Si le localstorage est vide, on créer tableau, on push le panier dedans et on stock dans localStorage
        if (!localstorageBasket) {
            localstorageBasket = [];
            localstorageBasket.push(basketElement);
            localStorage.setItem("product", JSON.stringify(localstorageBasket));
        }
        //Avant de stock dans local storage, on verifie si nom et option sont =, si = alors on incremente qty
        else {
            for (let i = 0; i < localstorageBasket.length; i++) {
                if (localstorageBasket[i].name === name && localstorageBasket[i].choixOpt === choixOpt) {
                    localstorageBasket[i].qty += qty;
                    indexLoop = 1;
                }
            }
            //Si pas égale, on stop la indexLoop et on push le panier dans local storage
            if (indexLoop == 0) {
                localstorageBasket.push(basketElement);
            }

            localStorage.setItem("product", JSON.stringify(localstorageBasket));
        }

        if (qty > 1) {
            alert(`Vous avez ajouté ${qty} articles au panier`);
        } else if (qty == 1) {
            alert(`Vous avez ajouté ${qty} article au panier`);
        }
        window.location.href = "index.html";

    }
});
