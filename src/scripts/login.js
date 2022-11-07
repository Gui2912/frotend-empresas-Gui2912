import { postLogin, getVerifyAdm } from "./requests.js";

const redirectionButtons = () => {
  const register = document.getElementsByClassName("register");

  const registerPage = [...register];
  registerPage.forEach((element) => {
    element.addEventListener("click", () => {
      window.location.replace("./register.html");
    });
  });

  const indexRedirect = document.querySelector("#index-redirect");
  indexRedirect.addEventListener("click", () => {
    window.location.replace("../../index.html");
  });
};

redirectionButtons();

async function eventLogin() {
  const form = document.querySelector("#login-form");

  const elements = [...form];
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = {};

    elements.forEach((element) => {
      body[element.name] = element.value;
    });

    await postLogin(body);
  });
}

eventLogin();
