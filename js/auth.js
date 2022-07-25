import { setToken } from "./api/config.mjs";
import { signIn } from "./api/rest/login.mjs";
import { signUp } from "./api/rest/signup.mjs";


const signUpLink = document.querySelector(".sign-up__link");
const signInLink = document.querySelector(".sign-in__link");

signUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.remove("auth-body--sign-up");
  document.body.classList.add("auth-body--sign-in");
});

signInLink.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("auth-body--sign-up");
  document.body.classList.remove("auth-body--sign-in");
});

const elSignUpModal = document.querySelector(".sign-up");
const elSignUpName = document.querySelector(".sign-up__user-name");
const elSignUpPassword = document.querySelector(".sign-up__user-password");

elSignUpModal.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (elSignUpName.value.trim() && elSignUpPassword.value.trim()) {
    const userData = {
      userName: elSignUpName.value,
      userPassword: elSignUpPassword.value,
    };

    try {
      const headers = { "Content-type": "application/json" }
      const body = JSON.stringify(userData)
      const res = await signUp(headers, body);

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        location.pathname = "index.html";
      }
    } catch (error) {
      throw new Error('error.message');
    }
  }
});

const elSignInModal = document.querySelector(".sign-in");
const elSignInName = document.querySelector(".sign-in__user-name");
const elSignInPassword = document.querySelector(".sign-in__user-password");

elSignInModal.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (elSignInName.value.trim() && elSignInPassword.value.trim()) {
    const userData = {
      login: elSignInName.value,
      password: elSignInPassword.value,
    };

    try {
      const headers = { "Content-type": "application/json" }
      const body = JSON.stringify(userData)
      const res = await signIn(headers, body);

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        location.pathname = "index.html";
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
});
