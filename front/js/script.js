//Recupération des données de l'API


//Sélection élément HTML ou afficher produits


//Affichage des produits sur la page d'acceuil

fetch("http://localhost:3000/api/products")
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        (products = data);
        products.forEach((product) => {
            document.querySelector("#items").innerHTML += `
                    <a href="./product.html?id=${product._id}">
                    <article>
                        <img src="${product.imageUrl}" alt="${product.altTxt}" />
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description}</p>  
                    </article>
                    </a>`;
        });
    })
    .catch(function (err) {
        console.log("Oh no", err)

    });


