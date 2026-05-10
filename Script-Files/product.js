const productpage = document.querySelector(".lod-products");
const url = "https://dummyjson.com/products";

const ctg = document.querySelector(".category-list");
const catelist = document.querySelector(".categories");
const ctgfilter = document.querySelector("#category-template");
const apply = document.querySelector("#submit");
const filterpro = document.querySelector(".filter-products");

const priceinput = document.querySelector("#price-range");
const ctgprice = document.querySelector("#price-value");

const showmore = document.querySelector("#more-or-less");
let ctgtemp;

document.addEventListener("DOMContentLoaded", homepage);

async function homepage() {
    const respose = await fetch(url);
    const item = await respose.json();
    console.log(priceinput);

    apply.addEventListener("click", () => filter(item));
    document.addEventListener("DOMContentLoaded", lodecategory(4));
    apppandwork(item, 10, productpage);
}

async function lodecategory(n) {
    const res = await fetch(`${url}/categories`);
    const data = await res.json();
    ctg.textContent = "";
    let count = 0;
    for (const item of data) {
        console.log(item);

        ctgtemp = ctgfilter.content.cloneNode(true);
        ctgtemp.querySelector("#template-input").value = item.name;
        ctgtemp.querySelector("#cate-name").textContent = item.name;

        ctg.appendChild(ctgtemp);

        count++;
        if (count >= n) break;

    }
}

let iscliced = 1;
showmore.addEventListener("click", () => {
    if (iscliced) {
        lodecategory(15);
        showmore.textContent = "show less ⮝";
        iscliced = 0;
    }
    else {
        console.log("run");
        showmore.textContent = "show more ⮟";
        lodecategory(4);
        iscliced = 1;
    }

})

priceinput.addEventListener('change', () => {
    ctgprice.textContent = `${priceinput.value} $`;
})

async function filter(item) {
    const ctgredios = document.querySelector('input[name="category"]:checked');
    const ratredios = document.querySelector('input[name="rating"]:checked');
    ctgtemp = ctgfilter.content.cloneNode(true);
    const ctgvalue = ctgredios ? ctgredios.value : null;
    const ratingvalue = ratredios ? Number(ratredios.value) : null;
    console.log("ctg:", ctgvalue);
    console.log("rating:", ratingvalue);
    const ctgres = await fetch(`https://dummyjson.com/products/category/${ctgvalue}`);
    const ctgmatch = await ctgres.json();
    console.log("category item:", Array.from(ctgmatch));
    const filtered = ctgmatch.products.filter(prod => {
        const ratingmth = !ratingvalue || (prod.rating >= ratingvalue && prod.rating < ratingvalue + 1);
        const pricematch = prod.price <= priceinput.value;

        return ratingmth && pricematch;
    })
    console.log(filtered);

    renderProducts(filtered);

    let ctgitem = [];
    ctgitem.push(item);
}

function renderProducts(products) {

    productpage.innerHTML = "";

    if (products.length === 0) {

        productpage.innerHTML = `
            <h2>No Products Found</h2>
        `;

        return;
    }

    products.forEach(prod => {

        const card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${prod.thumbnail}" alt="${prod.title}">

            <h3>${prod.title}</h3>

            <p class="price">$${prod.price}</p>

            <p class="rating">
                ${"⭐".repeat(Math.floor(prod.rating))}
                (${prod.rating})
            </p>

            <p class="category">
                ${prod.category}
            </p>
        `;

        productpage.appendChild(card);

    });

}