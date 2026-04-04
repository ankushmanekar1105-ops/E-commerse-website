const prod = document.querySelector(".lod-products");
const catagirise = document.querySelector(".catagerise");

const URL = "https://dummyjson.com/products";

document.addEventListener("DOMContentLoaded", homepage);

async function homepage() {
    const respose = await fetch(URL);
    const item = await respose.json();
    console.log(item);
    console.log(typeof item);
    let count = 0;

   for (const element of item.products) {
       
        const prodimg = element.thumbnail;
        const prodtitle = element.title;
        const productdisc = element.description;
        const productprice = element.price;
        const waranty = element.warrantyInformation;
        const reating = element.rating;
        console.log(reating);
        

        const card = document.createElement("div");
        const prodpdiv = document.createElement("div");
        const producttitle = document.createElement("h3");
        const description = document.createElement("p");
        const prodwaranty = document.createElement("p");
        const prodthum = document.createElement("img");
        const rating = document.createElement("p");

        const add = document.createElement("button");
        add.innerHTML = "🛒";
        
        card.className = "productcard";
        prodpdiv.className = "cart"

        prodthum.src = prodimg;
        producttitle.innerHTML = prodtitle;
        description.innerHTML = productdisc;
        prodpdiv.innerHTML = productprice;
        prodwaranty.innerHTML = `waranty: ${waranty}`;
        rating.innerHTML = "☆".repeat(element.rating);
        
        prodpdiv.append(rating, add);
        card.append(prodthum, producttitle, description, prodpdiv, prodwaranty);
        prod.appendChild(card);

        count++
        if (count >= 10) break;
    }
    // categorie();

}

// async function categorie() {
//     const categories = ["beauty","furniture","groceries","home-decoration","laptops","mens-shoes"];
    
    
    
    
//     for(i = 0; i <6 ; i++) {
//         const template = document.querySelector(".categerise-template").content.cloneNode(true);
//         const img = document.querySelector(".cateimg");
//         const categerisetitle = document.querySelector(".catetitle");

//         console.log(template);
//         categerisetitle.innerHTML = categories[i];

//     }
// }