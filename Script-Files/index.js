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
    catagerise(target,res);

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