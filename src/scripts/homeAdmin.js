import {
  getAllDepartaments,
  getAllEmployees,
  getAllCompanys,
  postCreateDepartament,
  deleteDepartament,
  deleteUser,
  adminEditUser,
  getDepartamentsId,
  getOutOfWork,
  patchHire,
  patchEditDepartament,
  patchDismiss,
} from "./requests.js";

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

const departamentRender = async () => {
  const allDep = await getAllDepartaments();

  const allCompanys = await getAllCompanys();
  console.log(allCompanys);
  const select = document.querySelector("#select");
  console.log(allDep);

  allCompanys.forEach((element) => {
    const option = document.createElement("option");
    option.innerText = element.name;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const departamentFilter = allDep.filter(
      (element) => element.companies.name === select.value
    );
    if (select.value === "Selecionar empresa") {
      cardRender(allDep);
    } else {
      cardRender(departamentFilter);
    }
  });

  cardRender(allDep);
};

function cardRender(array) {
  const departamentContainer = document.querySelector(".departament-container");
  departamentContainer.innerHTML = "";
  array.forEach((element) => {
    let cardRender = cardMaker(element);
    departamentContainer.appendChild(cardRender);
  });
}

function cardMaker(element) {
  const card = document.createElement("li");
  card.classList = "departament-description";

  const departamentName = document.createElement("h4");
  departamentName.innerText = element.name;

  const departamentDescription = document.createElement("p");
  departamentDescription.innerText = element.description;

  const companyName = document.createElement("span");
  companyName.innerText = element.companies.name;

  const figureContainer = document.createElement("figure");
  figureContainer.classList = "flex justify-center";

  const eye = document.createElement("img");
  eye.src = "../img/Eye.svg";
  eye.addEventListener("click", async () => {
    modalBg(await hireUserModal(element.companies.uuid));
  });

  const pencil = document.createElement("img");
  pencil.src = "../img/Pencil.svg";
  pencil.addEventListener("click", () => {

    modalBg(editDepartamentModal(element.uuid, element.description));
  });

  const trash = document.createElement("img");
  trash.src = "../img/Trash-icon.svg";
  trash.addEventListener("click", async () => {
    modalBg(await deleteDepartamentModal(element.name, element.uuid));
  });

  figureContainer.append(eye, pencil, trash);
  card.append(
    departamentName,
    departamentDescription,
    companyName,
    figureContainer
  );

  return card;
}

async function hireUserModal(id) {
  let allUsers = await getAllEmployees();
  let departamentsId = await getDepartamentsId(id);
  let usersOutOfWork = await getOutOfWork();

  const form = document.createElement("form");
  form.classList = "hire-user-form";

  const title = document.createElement("h2");
  title.innerText = departamentsId[0].name;

  const div1 = document.createElement("div");
  div1.classList = "flex space-between align-center";

  const departamentDescription = document.createElement("h3");
  departamentDescription.innerText = departamentsId[0].description;

  const select = document.createElement("select");

  usersOutOfWork.forEach((element) => {
    const option = document.createElement("option");
    option.innerText = element.username;
    option.value = element.uuid;
    select.appendChild(option);
  });

  div1.append(departamentDescription, select);

  const div2 = document.createElement("div");
  div2.classList = "flex space-between hire-button";

  const companyName = document.createElement("p");
  companyName.innerText = departamentsId[0].companies.name;

  const employeeList = document.createElement("ul");
  employeeList.classList = "flex employee-list align-center justify-center";

  let body = {};

  const allUsersFilter = allUsers.filter(
    (element) =>
      !element.is_admin && element.department_uuid === departamentsId[0].uuid
  );

  const hire = document.createElement("button");
  hire.type = "button";
  hire.innerText = "Contratar";
  hire.addEventListener("click", async (e) => {
    e.preventDefault();

    body = {
      user_uuid: select.value,
      department_uuid: departamentsId[0].uuid,
    };

    await patchHire(body);

    teste(allUsersFilter);
  });

  div2.append(companyName, hire);

  teste(allUsersFilter);

  function teste(elt) {
    employeeList.innerHTML = "";
    const filter2 = elt.filter((element) => element.department_uuid !== null);
    filter2.map((element) => {
      const card = document.createElement("li");

      const cardTitle = document.createElement("h3");
      cardTitle.innerText = element.username;

      const userExp = document.createElement("p");
      userExp.innerText = element.professional_level;

      const companieName = document.createElement("span");
      companieName.innerText = departamentsId[0].companies.name;

      const buttonAlign = document.createElement("div");
      buttonAlign.classList = "flex justify-center align-center";

      const dismiss = document.createElement("button");
      dismiss.innerText = "Desligar";
      dismiss.type = "submit";
      dismiss.addEventListener("click", async (e) => {
        e.preventDefault();

        element.department_uuid = null;
        await patchDismiss(element.uuid);

        teste(allUsersFilter);
      });

      buttonAlign.appendChild(dismiss);
      card.append(cardTitle, userExp, companieName, buttonAlign);
      employeeList.appendChild(card);
    });
  }

  form.append(title, div1, div2, employeeList);

  return form;
}

function editDepartamentModal(id, element) {
  const form = document.createElement("form");
  form.classList = "form-modal form-edit-user flex column";

  const title = document.createElement("h2");
  title.innerText = "Editar departamento";

  const textArea = document.createElement("textarea");
  textArea.placeholder = element;
  textArea.rows = "5";

  let body = {};

  const button = document.createElement("button");
  button.innerText = "Salvar alterações";
  button.type = "submit";
  button.addEventListener("click", async () => {
    body = {
      description: textArea.value,
    };

    await patchEditDepartament(id, body);
  });

  form.append(title, textArea, button);
  return form;
}

function deleteDepartamentModal(name, id) {
  const departmentDelete = document.createElement("form");
  departmentDelete.classList =
    "delete-departament flex column align-center justify-center";

  const title = document.createElement("h2");
  title.innerText =
    "Realmente deseja deletar o departamento " +
    name +
    " e demitir seus funcionários?";

  const button = document.createElement("button");
  button.type = "submit";
  button.innerText = "Confirmar";
  button.addEventListener("click", async () => {
    await deleteDepartament(id);
  });

  departmentDelete.append(title, button);

  return departmentDelete;
}

const usersRender = async () => {
  const allUsers = await getAllEmployees();
  console.log(allUsers);
  const users = allUsers.filter((element) => !element.is_admin);
  cardUserRender(users);
};

function cardUserRender(array) {
  const userContainer = document.querySelector(".user-container");
  userContainer.innerHTML = "";

  array.forEach(async (element) => {
    let cardRender = await cardUserMaker(element);
    userContainer.appendChild(cardRender);
  });
}

async function cardUserMaker(element) {
  const departmentId = await getAllDepartaments();
  const card = document.createElement("li");
  card.classList = "user-card departament-description";

  const userName = document.createElement("h4");
  userName.innerText = element.username;

  const userExp = document.createElement("p");
  userExp.innerText = element.professional_level;

  const userCompany = document.createElement("span");
  if (element.department_uuid === null) {
    userCompany.innerText = "Não empregado";
  } else {
    userCompany.id = element.department_uuid;
    let depFind = departmentId.find(
      (element) => element.uuid === userCompany.id
    );
    userCompany.innerText = depFind.companies.name;
  }

  const figureContainer = document.createElement("figure");
  figureContainer.classList = "flex justify-center";

  const pencil = document.createElement("img");
  pencil.src = "../img/Pencil.svg";
  pencil.addEventListener("click", async () => {
    modalBg(await editUserModal(element.uuid));
  });

  const trash = document.createElement("img");
  trash.src = "../img/Trash-icon.svg";
  trash.addEventListener("click", async () => {
    modalBg(await deleteUserModal(element.username, element.uuid));
  });

  figureContainer.append(pencil, trash);
  card.append(userName, userExp, userCompany, figureContainer);

  return card;
}

function deleteUserModal(nome, id) {
  const departmentDelete = document.createElement("form");
  departmentDelete.classList =
    "delete-departament flex column align-center justify-center";

  const title = document.createElement("h2");
  title.innerText = `Realmente deseja remover o usuário ${nome}?`;

  const button = document.createElement("button");
  button.type = "submit";
  button.innerText = "Deletar";
  button.addEventListener("click", async () => {
    await deleteUser(id);
  });

  departmentDelete.append(title, button);

  return departmentDelete;
}

function editUserModal(id) {
  const form = document.createElement("form");
  form.classList = "form-modal form-edit-user flex column";

  const h2 = document.createElement("h2");
  h2.innerText = "Editar usuário";

  const kindOfWork = document.createElement("select");

  const option0 = document.createElement("option");
  option0.innerText = "Selecionar modalidade de trabalho";
  option0.selected;
  option0.disabled;

  const option1 = document.createElement("option");
  option1.innerText = "home office";
  option1.value = "home office";

  const option2 = document.createElement("option");
  option2.innerText = "hibrido";
  option2.value = "hibrido";

  const option3 = document.createElement("option");
  option3.innerText = "presencial";
  option3.value = "presencial";

  kindOfWork.append(option0, option1, option2, option3);

  const userExp = document.createElement("select");

  const optionZero = document.createElement("option");
  optionZero.innerText = "Selecionar nível profissional";
  optionZero.selected;
  optionZero.disabled;

  const estagio = document.createElement("option");
  estagio.innerHTML = "estágio";
  estagio.value = "estágio";

  const junior = document.createElement("option");
  junior.innerText = "júnior";
  junior.value = "júnior";

  const pleno = document.createElement("option");
  pleno.innerText = "pleno";
  pleno.value = "pleno";

  const senior = document.createElement("option");
  senior.innerText = "sênior";
  senior.value = "sênior";

  userExp.append(optionZero, estagio, junior, pleno, senior);

  const button = document.createElement("button");
  button.innerText = "Editar";
  button.type = "submit";

  let body = {};

  form.addEventListener("submit", async () => {
    body = {
      kind_of_work: kindOfWork.value,
      professional_level: userExp.value,
    };

    // console.log(body);

    await adminEditUser(id, body);
  });

  form.append(h2, kindOfWork, userExp, button);

  return form;
}

const createDepartament = async () => {
  const createDepForm = await createDepartamentForm();
  const buttonCreateDepartament = document.querySelector("#create-departament");
  buttonCreateDepartament.addEventListener("click", (e) => {
    e.preventDefault();
    modalBg(createDepForm);
  });
};

async function createDepartamentForm() {
  const allCompanys = await getAllCompanys();

  const title = document.createElement("h2");
  title.innerText = "Criar departamento";

  const form = document.createElement("form");
  form.classList = "form-modal flex column";

  const departamentName = document.createElement("input");
  departamentName.placeholder = "Nome do departamento";

  const departamentDescription = document.createElement("input");
  departamentDescription.placeholder = "Descrição";

  const select = document.createElement("select");
  select.id = "modal-form-select";

  allCompanys.forEach((element) => {
    const option = document.createElement("option");
    option.innerText = element.name;
    option.value = element.uuid;
    select.appendChild(option);
  });

  let body = {};

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Criar o departamento";
  submitBtn.type = "submit";
  submitBtn.addEventListener("click", async () => {
    body = {
      name: departamentName.value,
      description: departamentDescription.value,
      company_uuid: select.value,
    };

    await postCreateDepartament(body);
  });

  form.append(
    title,
    departamentName,
    departamentDescription,
    select,
    submitBtn
  );
  return form;
}

createDepartament();

departamentRender();
usersRender();
