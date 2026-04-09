const input = document.querySelector("#search");
const product = document.querySelector("#products");
const main = document.querySelector(".main-div");
const footer = document.querySelector(".footer");



// product.style.Color = "white";


async function lodenev() {
    try {
        const res = await fetch("Components/nav.html")
        const data = await res.text();
 
        document.querySelector(".addnav").innerHTML = data;

        const togglenav = document.querySelector(".toggle-btn");
        const secnav = document.querySelector(".lesst750");

        if(togglenav){
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
        window.addEventListener("resize",hendelnev);

        function hendelnev(e)  {
                if (window.innerWidth >= 750) {
                    secnav.style.display = "none";
                }
                else {
                    secnav.style.display = "block"
                }
        }}

    } catch (error) {
        console.log("datac not fount!");   
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

let timer;
let savedata;

input.addEventListener("input", () => {
    
    clearTimeout(timer);
    timer = setTimeout(search, 300);
})

async function search() {
    main.style.display = "none";
    footer.style.display = "none"
    const intval = input.value.trim();
    if (intval === "") {
        product.textContent = ""
        return;
    }

    result.textContent = "Loading ...";

    try {
        const URL = `https://dummyjson.com/products/search?q=${intval}`;
        const response = await fetch(URL);
        if (!response.ok) {
            product.textContent = "";
            product.textContent = "Product not found";
            return;
        }
        const data = await response.json();
        const item = data.items;

        savedata = item;

        restoredata(savedata);


    } catch (error) {
        product.textContent = "";
        product.textContent = "Server error ⚠️";
    }

}

function restoredata(data) {
    product.innerHTML = "";
    // let count = 0;
    for (const element of data) {
        const thumbnail = element.thumbnail;
        const title = element.title;
        const disc = element.description;
        const card = document.createElement("div");
        const img = document.createElement("img");
        const hed = document.createElement("h2");
        const para =document.createElement("p");
        para.textContent = disc;
        card.className = "card"
        img.src = thumbnail;
        img.alt = title;
        img.style.margin = "15px 0";
        img.style.width = "200px";
        hed.textContent = `Title: ${title}`;
        card.append(img, hed, para);
        product.appendChild(card);

        card.addEventListener("click", async () => {
            const url = `https://dummyjson.com/products/${product}`
            product.textContent = "Loading ...";
            try {
                const secresponse = await fetch(url);
                if (!secresponse.ok) {
                    product.innerHTML = "";
                    product.textContent = "User not found";
                    return;
                }
                const secdata = await secresponse.json();
                const pubrepo = secdata.public_repos;
                const Followers = secdata.followers;
                const Following = secdata.following;
                product.innerHTML = "";
                const back = document.createElement("button");
                const card = document.createElement("div");
                const img = document.createElement("img");
                card.className = "profile"
                img.src = secdata.avatar_url;
                img.alt = username;
                img.style.width = "400px";
                back.textContent = "Back";
                back.style.margin = "20px 0"
                card.style.cursor = "pointer";
                const hed = document.createElement("h3");
                const hed1 = document.createElement("h3");
                const hed2 = document.createElement("h3");
                const hed3 = document.createElement("h3");

                hed.textContent = `username: ${secdata.login}`;
                hed1.textContent = `public_repos: ${pubrepo}`;
                hed2.textContent = `Followers: ${Followers}`;
                hed3.textContent = `Following: ${Following}`;

                card.append(back, img, hed, hed1, hed2, hed3);
                product.appendChild(card);
                back.addEventListener("click", () => {
                    setTimeout(restoredata(savedata), 100);
                });
            } catch (error) {
                product.innerHTML = "";
                product.textContent = "error";
            }

        })

        count++;
        if (count >= 20) break;
    }
}