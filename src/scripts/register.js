import { postRegister } from "./requests.js";

const redirectPages = () => {
  const login = document.querySelector(".login");
  login.addEventListener("click", () => {
    window.location.replace("./login.html");
  });

  const backHome = document.getElementsByClassName("back-home");
  const backHomeIndex = [...backHome];
  backHomeIndex.forEach((element) => {
    element.addEventListener("click", () => {
      window.location.replace("../../index.html");
    });
  });
};

redirectPages();

async function eventRegister() {
  const form = document.querySelector(".register-form");

  const elements = [...form];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {};

    elements.forEach((element) => {
      if (
        element.tagName === "INPUT" ||
        element.tagName === "SELECT"
        
        && element.value != ""
      ) {
        body[element.name] = element.value;
      }
    });

    await postRegister(body)
    
  });
}

eventRegister();

