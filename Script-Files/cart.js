const cartContainer = document.querySelector(".cart-container");
const zero = document.querySelector(".empty-cart-message");
const totalprice = document.querySelector("#total-price");
const totalitem = document.querySelector("#total-items");
const heading = document.querySelector(".cart-heading");

function getcart() {

    return JSON.parse(localStorage.getItem("mycart")) || [];
}

function setcart(cart) {
    localStorage.setItem("mycart", JSON.stringify(cart));
}

function rendercart(params) {
    let cart = getcart();

    if (cart.length === 0) {
        zero.innerHTML = "<p>Your cart is empty</p>";
        totalprice.textContent = "0";
        return;
    }

    let total = 0;

    cartContainer.innerHTML = cart.map(item => {

        total += (item.price) * (item.Quantity);

        return `
            <div class = "cart-item" >
                <div class = "cart-info" >
                    <img src = "${item.thumbnail}">

                    <div class = "item-info">
                        <h3>${item.title}</h3>
                        <p>${item.price}</p>
                    </div>
                </div>

                <div class = "item-quantity">
                    <button class="inc-dec" onclick= "changeQut(${item.id}, -1)">-</button>
                    <span class="quantity">${item.Quantity}</span>
                    <button class="inc-dec" onclick= "changeQut(${item.id}, 1)">+</button>
                    <button class="remove-but" onclick= "removeItem(${item.id})">Remove</button>
                </div>
            </div>
        `;
    })
    totalprice.textContent = total.toFixed(2);
    totalitem.textContent = cart.length

}

function changeQut(id, delta) {
    let cart = getcart();
    cart = cart.map(item => {
        if (item.id === id) {
            item.Quantity += delta;
            if (item.Quantity < 1) item.Quantity = 1;
        }
        return item ;
    })

    setcart(cart);
    rendercart();
}

function removeItem(id) {
    let cart = getcart()
    cart = cart.filter(item => item.id !== id);
    setcart(cart);
    rendercart();
}

rendercart();