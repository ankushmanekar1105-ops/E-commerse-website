const prod = document.querySelector(".lod-products");
const catagirise = document.querySelector(".catagerise");
const catagirihed = document.querySelector("#categorieshed");
const res = document.querySelector(".categri-res");
const catecont = document.querySelector(".categerise-container");
const back = document.querySelector("#back-button");
const cartitem = document.querySelector("#cart-count");
const explore = document.querySelectorAll(".view-btn");

const URL = "https://dummyjson.com/products";

let isclick = false;

document.addEventListener("DOMContentLoaded", homepage);
catecont.addEventListener("click", (e) => {
    
    const target = e.target.id;
    if (target === "") return;
    catagirihed.textContent = `Category: ${target}`
    back.textContent = "Back";
    back.style.display = "block";
    isclick = true;

    catecont.style.display = "none";
    res.style.display = "grid";
    res.innerHTML = "";
    catagerise(target);

})

back.addEventListener("click", () => {
    catecont.style.display = "grid";
    res.style.display = "none";

    back.style.display = "none";
    catagirihed.textContent = "Categories";

    isclick = false;
});

async function homepage() {
    const respose = await fetch(URL);
    const item = await respose.json();

    apppandwork(item, 10, prod);

}

async function catagerise(catigeor) {
    const categeriresponse = await fetch(`https://dummyjson.com/products/category/${catigeor}`);
    const cateitem = await categeriresponse.json();

    apppandwork(cateitem, 5, res);
    catecont.style.display = "none";

}

function apppandwork(item, num, appcon) {
    let count = 0;
    for (const element of item.products) {
        const prodimg = element.thumbnail;
        const prodtitle = element.title;
        const productdisc = element.description;
        const productprice = element.price;
        const waranty = element.warrantyInformation;


        const card = document.createElement("div");
        const prodpdiv = document.createElement("div");
        const producttitle = document.createElement("h3");
        const description = document.createElement("p");
        const prodwaranty = document.createElement("p");
        const prodthum = document.createElement("img");
        const rating = document.createElement("p");

        const buy = document.createElement("button");

        GamepadButton, textContent = "Buy Now";

        const add = document.createElement("button");
        add.innerHTML = "🛒";

        card.className = "productcard";
        prodpdiv.className = "cart"

        prodthum.src = prodimg;
        producttitle.innerHTML = prodtitle;
        description.innerHTML = productdisc;
        prodpdiv.innerHTML = `$${productprice}`;
        prodwaranty.innerHTML = `waranty: ${waranty}`;
        rating.innerHTML = "☆".repeat(element.rating);

        prodpdiv.append(rating, add);
        card.append(prodthum, producttitle, description, prodpdiv, prodwaranty);
        appcon.appendChild(card);
        addtocart(add)
        count++
        if (count >= num) break;
    }
}

let counter = 0;

function addtocart(item) {
    item.addEventListener("click", () => {
        counter++;
        cartitem.textContent = ""
        cartitem.textContent = `  ${counter}`;
        cartitem.style.display = "inline"
    })
}

for (const item of explore) {
    item.addEventListener("click", (e) => {
        const target = e.target.className;
    if (target === "") return;
    catagirihed.textContent = `Category: ${target}`
    back.textContent = "Back";
    back.style.display = "block";
    isclick = true;

    catecont.style.display = "none";
    res.style.display = "grid";
    res.innerHTML = "";
    catagerise(target);

    })
}