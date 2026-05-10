const main = document.querySelector(".main-div");
const footer = document.querySelector(".footer");
const cate = document.querySelector(".categories");

async function lodenev() {
    try {
        const res = await fetch("Components/nav.html")
        const data = await res.text();

        document.querySelector(".addnav").innerHTML = data;

        const togglenav = document.querySelector(".toggle-btn");
        const secnav = document.querySelector(".lesst750");
        const input = document.querySelector("#search");
        const product = document.querySelector(".lod-products");

        if (togglenav) {
            togglenav.addEventListener("click", (e) => {
                const secnavtemp = document.querySelector(".nav-template");
                if (secnav.childElementCount === 0) {
                    const navclone = secnavtemp.content.cloneNode(true);
                    secnav.appendChild(navclone);

                }
                else {
                    secnav.innerHTML = "";
                }
            })
            window.addEventListener("resize", hendelnev);

            function hendelnev(e) {
                if (window.innerWidth >= 775) {
                    secnav.style.display = "none";
                }
                else {
                    secnav.style.display = "block"
                }
            }
        }

    } catch (error) {
        console.log("data not fount!");
    }
}

async function addfooter() {
    try {
        const res = await fetch("Components/Footer.html");
        const data = await res.text();
        document.querySelector(".footer").innerHTML = data;
        const toggle = document.querySelector(".checkbox");

        toggle.addEventListener("click", () => {
            document.body.style.backgroundColor = toggle.checked ? "black" : "rgb(228, 228, 228)";
            // catagirise.style.backgroundColor = toggle.checked ? "#0F172A" : "rgb(252, 254, 255)";
        })
        const scrollup = document.querySelector(".top-scroll");
        scrollup.addEventListener("click", (e) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
    } catch (error) {
        console.log("data not found!");

    }
}

lodenev();
addfooter();

function apppandwork(item, num, appcon) {
    let count = 0;
    for (const element of item.products) {
        if (element === "") return;
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
        buy.innerHTML = "Buy Now";

        const add = document.createElement("button");
        add.innerHTML = "🛒";

        card.className = "productcard";
        prodpdiv.className = "cart";

        prodthum.src = prodimg;
        producttitle.innerHTML = prodtitle;
        description.innerHTML = productdisc;
        prodpdiv.innerHTML = `$${productprice}`;
        prodwaranty.innerHTML = `waranty: ${waranty}`;
        rating.innerHTML = `${"☆".repeat(Math.floor(element.rating))} (${element.rating})`;
        
        add.addEventListener("click", () => addtocart(element));

        prodpdiv.append(rating, add);
        card.append(prodthum, producttitle, description, prodpdiv, buy, prodwaranty);
        appcon.appendChild(card);
        // addtocart(add);
        // console.log(element);
       
        count++
        if (count >= num) break;
    }
}

async function catagerise(catigeor, append) {
    const categeriresponse = await fetch(`https://dummyjson.com/products/category/${catigeor}`);
    const cateitem = await categeriresponse.json();
    append.textContent = "";

    apppandwork(cateitem, 5, append);
    // catecont.style.display = "none";

}

let counter = 0;

function addtocart(item) {

    let cart = JSON.parse(localStorage.getItem("mycart")) || [];
    console.log(cart);
    // localStorage.clear();

    const exist = cart.find(e => e.id === item.id);

    if (exist) {
        exist.Quantity++;
    } else {
        cart.push({ ...item, Quantity: 1 });
    }

    localStorage.setItem("mycart", JSON.stringify(cart));
    console.log(cart);
    
}