// ESTADO DA APLICAÇÃO
let currentProducts = menuOptions; 

// ELEMENTOS DO DOM
const display = document.querySelector("#button-foreach");
const discount = document.querySelector("#button-map");
const totalValue = document.querySelector("#button-reduce");
const filterVegans = document.querySelector("#button-filter");
const list = document.querySelector("ul")


// FUNÇÕES DE RENDERIZAÇÃO
function renderProducts(products) {
    currentProducts = products;
    
    if (products.length === 0) {
        list.innerHTML = `
            <li class="empty-state">
                Nenhum produto encontrado
            </li>
        `
        return
    }

    let myLi = "";

    products.forEach((product) => {
        myLi += `
        <li>
            <img src="${product.src}" alt="${product.name}">
            <p>${product.name}</p>
            <p class="item-price">${product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
        </li>
        `
    });

    list.innerHTML = myLi;
}

// FUNÇÕES DE TRANSFORMAÇÃO

function updateProducts(transformFunction) {
    const newProducts = transformFunction(currentProducts);
    renderProducts(newProducts)
}

function discountMap() {
    const discounted = currentProducts.map(product => {
        const original = menuOptions.find(item => item.name === product.name);
        return {
            ...product,
            price: original.price * 0.9
        };
    });
    renderProducts(discounted);
}


function filterVegan() {
    updateProducts(products =>
        products.filter(product => product.vegan)
    );
}

function sumAll() {
    const total = currentProducts.reduce((acc, item) => acc + item.price, 0)

    list.innerHTML = `
        <li class="total-card">
            <p>Valor total do cardápio:</p>
            <p class="item-price">${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
        </li>
    `
}

// EVENTOS

display.addEventListener("click", () => renderProducts(menuOptions));
discount.addEventListener("click", discountMap);
totalValue.addEventListener("click", sumAll);
filterVegans.addEventListener("click", filterVegan);

// RENDERIZAÇÃO INICIAL

renderProducts(menuOptions);
