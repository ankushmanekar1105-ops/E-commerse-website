const URL = "https://dummyjson.com/users"
const log = document.querySelector("#nev-login");
const login = document.querySelector(".LogIn");
const sing = document.querySelector("#nev-singUp");
const temp = document.querySelector(".singup-template");
const apptemp = document.getElementById("appand-temp");

const clone = temp.content.cloneNode(true);

sing.addEventListener("click", () => {
    login.style.display = "none";
    apptemp.appendChild(clone);
    apptemp.style.display = "block";
})
log.addEventListener("click", () => {
    login.style.display = "block";
    apptemp.style.display = "none";
})

const logbutt = document.querySelector("#login");

const result = document.querySelector("#result");



const  logEmail= document.querySelector("#email-add input");
const logPass = document.querySelector("#password input");

const loginvalidation = async () => {
    const logeint = logEmail.value;
    const logpint = logPass.value;
    let found = false;
    try {
        const response = await fetch(URL);
        const data = await response.json();
        for(const element of data.users) {
        if (logeint === element.email && logpint === element.password){
           found = true;
           break;
        }
        };
        if (found) {
            result.textContent = "Login Sucssesful";
        }
        else {
            result.textContent = "user not fount";
        }
        
    } catch (e) {
        result.textContent = "error";
    }
    
}
logbutt.addEventListener("click", loginvalidation);


const singbutt = document.querySelector("#singUp");

const singcompletion = (e) => {
    const newPass = document.querySelector("#New-Password").value;
    const comPass = document.querySelector("#check-Password").value;
    const singEmail = document.querySelector("#email").value.length;

    if (newPass === comPass && singEmail > 8){
        result.textContent = ""
        result.textContent = "sing up compmpleted";
    }
}

singbutt.addEventListener("click", singcompletion);
