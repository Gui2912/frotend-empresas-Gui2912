import { modalBg } from "./modal.js";

const logout = () => {
  const logoutBtn = document.querySelector("#index-redirect");

  logoutBtn.addEventListener("click", () => {
    const token = JSON.parse(localStorage.getItem("token")) || "";
    localStorage.clear();

    window.location.replace("../../index.html");
  });
};
logout();

const editUserData = () => {
  const edit = document.querySelector("#edit")
  edit.addEventListener("click", () => {
    modalBg(editUserForm())
  })
}

editUserData()

function editUserForm(){
  const title = document.createElement("h2")
  title.innerText = "Editar Perfil"

  const form = document.createElement("form")
  form.classList = "form-modal flex column"

  const name = document.createElement("input")
  name.placeholder = "Seu nome"

  const email = document.createElement("input")
  email.placeholder = "Seu e-mail"
  email.type = "email"

  const password = document.createElement("input")
  password.placeholder = "Sua senha"
  password.type = "password"

  const button = document.createElement("button")
  button.type = "submit"
  button.innerText = "Editar Perfil"

  form.append(title, name, email, password, button)
  return form
}

