const input = document.querySelector("#search");
const product = document.querySelector("#products");
const main = document.querySelector(".main-div");
const footer = document.querySelector(".footer");
product.style.color = "white";

// const toggle = document.querySelector(".checkbox");

// toggle.addEventListener("click", () => {
//     document.body.style.backgroundColor = toggle.checked ? "black" : "rgb(208, 227, 243)";
//     document.body.style.color = toggle.checked ? "white" : "black";
// })

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