

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