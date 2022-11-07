import {
  patchEditUser,
  getUserData,
  getCoWork,
  getDepartamentsId,
  getAllDeps,
  getAllCompanys
} from "./requests.js";
import { modalBg } from "./modal.js";

const logout = () => {
  const logoutBtn = document.querySelector("#index-redirect");

  logoutBtn.addEventListener("click", () => {
    localStorage.clear();

    window.location.replace("../../index.html");
  });
};
logout();

const token = JSON.parse(localStorage.getItem("token")) || "";
if(!token){
  window.location.replace("../../index.html");
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const renderUserData = async () => {
  const userDataReq = await getUserData();

  const userData = document.querySelector(".user-data");

  const h2 = document.createElement("h2");
  h2.innerText = userDataReq.username;

  const userFoot = document.createElement("div");
  userFoot.classList = "user-foot flex space-between align-center";

  const email = document.createElement("p");
  email.innerText = userDataReq.email;

  const userExp = document.createElement("p");
  if (userDataReq.professional_level !== null) {
    userExp.innerText = userDataReq.professional_level.capitalize();
  } else {
    userExp.classList = "hide";
  }

  const kindOfWork = document.createElement("p");
  if (userDataReq.kind_of_work !== null) {
    kindOfWork.innerText = userDataReq.kind_of_work.capitalize();
  } else {
    kindOfWork.classList = "hide";
  }

  const edit = document.createElement("img");
  edit.src = "../img/pencil-bule.svg";
  edit.id = "edit";

  edit.addEventListener("click", () => {
    modalBg(editUserForm());
  });

  userFoot.append(email, userExp, kindOfWork, edit);
  userData.append(h2, userFoot);
};

renderUserData();

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

async function renderUserCoWork() {
  const userData = await getUserData();
  const coWorks = await getCoWork()
  const allCompanies = await getAllCompanys()
  const allDeps = await getAllDeps();
  
  const employeeData = document.querySelector(".employee-data");
  if (userData.department_uuid !== null) {
  const findDepName = await allDeps.departments.find(
    (element) => element.uuid === userData.department_uuid
  );

  const allCompaniesFind = allCompanies.find(element => element.uuid === findDepName.company_uuid)
  
  employeeData.innerHTML = ''
  
    const h2 = document.createElement("h2");
    h2.classList = "flex justify-center align-center";
    h2.innerText = `${allCompaniesFind.name} - ${findDepName.name}`

    const ul = document.createElement("ul")
    ul.classList = "flex wrap justify-center"

    coWorks[0].users.forEach((element) => {
      const li = document.createElement("li")
      li.classList = "card-user-data"

      const h3 = document.createElement("h3")
      h3.innerText = element.username

      const p = document.createElement("p")
      p.innerText = findDepName.name

      li.append(h3, p)
      ul.appendChild(li)
    })

    
    employeeData.append(h2,ul)

  }else{
    const p = document.createElement("p")
    p.innerText = "Você ainda não foi contratado"
    employeeData.classList = "employee-data-empty"
    employeeData.appendChild(p)
  }
}

renderUserCoWork();
