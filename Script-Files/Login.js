const URL = "https://dummyjson.com/users"
const log = document.querySelector("#nev-login");
const login = document.querySelector(".LogIn");
const sing = document.querySelector("#nev-singUp");
const temp = document.querySelector(".singup-template");
const apptemp = document.getElementById("appand-temp");

sing.addEventListener("click", () => {
    login.style.display = "none";

    const clone = temp.content.cloneNode(true);
    apptemp.innerHTML = "";
    apptemp.appendChild(clone);
    apptemp.style.display = "block";
})

log.addEventListener("click", () => {
    login.style.display = "block";
    apptemp.style.display = "none";
})

const logbutt = document.querySelector("#login");

const result = document.querySelector("#result");



const logEmail = document.querySelector("#email-add input");
const logPass = document.querySelector("#password input");

const loginvalidation = async (e) => {
    e.preventDefault();
    const logeint = logEmail.value.trim();
    const logpint = logPass.value.trim();

    if (!logeint || !logpint) {
        result.textContent = "Please fill all fields";
        return;
    }

    let found = false;
    try {
        const response = await fetch(URL);
        const data = await response.json();
        const user = data.users.find(
            u => u.email === logeint && u.password === logpint
        );

        if (user) {
            result.textContent = "Login Successful ✅";
        } else {
            result.textContent = "User not found ❌";
        }

    } catch (e) {
        result.textContent = "Server error ⚠️";
    }

}
logbutt.addEventListener("click", loginvalidation);


const singbutt = document.querySelector("#singUp");

const singcompletion = (e) => {
    e.preventDefault();
    const newPass = document.querySelector("#New-Password")?.value.trim();
    const comPass = document.querySelector("#check-Password")?.value.trim();
    const singEmail = document.querySelector("#email")?.value.trim();

    if (!singEmail || !newPass || !comPass) {
        result.textContent = "Fill all fields";
        return;
    }

    if (singEmail.length <= 8) {
        result.textContent = "Email too short";
        return;
    }

    if (newPass !== comPass) {
        result.textContent = "Passwords do not match";
        return;
    }

    result.textContent = "Signup completed ✅";
}

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "singUp") {
        singcompletion(e);
    }
});

const toggle = document.querySelector(".toggle-btn");
const secnav = document.querySelector(".lesst750")

toggle.addEventListener("click", (e) => {
    const secnavtemp = document.querySelector(".nav-template");
    if (secnav.childElementCount === 0) {
        const navclone = secnavtemp.content.cloneNode(true);
        secnav.appendChild(navclone);
    } else {
        secnav.innerHTML = "";
    }
})