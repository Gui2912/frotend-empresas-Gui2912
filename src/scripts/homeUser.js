import { patchEditUser, getUserData } from "./requests.js";
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

const renderUserData = async (array) => {
  const userDataReq = await getUserData();
  const userData = document.querySelector(".user-data");

  console.log(userDataReq);
  const h2 = document.createElement("h2");
  h2.innerText = userDataReq.username;

  const userFoot = document.createElement("div");
  userFoot.classList = "user-foot flex space-between align-center";

  const email = document.createElement("p");
  email.innerText = userDataReq.email;

  const userExp = document.createElement("p");
  if(userDataReq.professional_level !== null){
    userExp.innerText = userDataReq.professional_level;
  }else{
    userExp.classList = "hide"
  }
  

  const kindOfWork = document.createElement("p");
  if(userDataReq.kind_of_work !== null){
    kindOfWork.innerText = userDataReq.kind_of_work;
  }else{
    kindOfWork.classList = "hide"
  }
  

  const edit = document.createElement("img");
  edit.src = "../img/pencil-bule.svg";
  edit.id = "edit"

  edit.addEventListener("click", () => {
    modalBg(editUserForm());
  });

  userFoot.append(email, userExp, kindOfWork, edit)
  userData.append(h2, userFoot)
};

renderUserData()



function editUserForm() {
  const title = document.createElement("h2");
  title.innerText = "Editar Perfil";

  const form = document.createElement("form");
  form.classList = "form-modal flex column";

  const name = document.createElement("input");
  name.placeholder = "Seu nome";

  const email = document.createElement("input");
  email.placeholder = "Seu e-mail";
  email.type = "email";

  const password = document.createElement("input");
  password.placeholder = "Sua senha";
  password.type = "password";

  const button = document.createElement("button");
  button.type = "submit";
  button.innerText = "Editar Perfil";

  let body = {};

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    body = {
      username: name.value,
      email: email.value,
      password: password.value,
    };

    await patchEditUser(body);
  });

  form.append(title, name, email, password, button);
  return form;
}



{
  /* <h2>USERNAME</h2>
        <div class="user-foot flex space-between align-center">
          <p>Email</p>
          <p>Pleno</p>
          <p>Home Office</p>
          <img src="../img/pencil-bule.svg" id="edit" />
          
        </div> */
}
