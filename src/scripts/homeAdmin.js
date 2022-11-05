import { getAllDepartaments, getAllEmployees, getAllCompanys, postCreateDepartament } from "./requests.js";
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
  
  const allCompanys = await getAllCompanys()
  console.log(allCompanys);
  const select = document.querySelector("#select");
  console.log(allDep);

  allCompanys.forEach((element) => {
    const option = document.createElement("option");
    option.innerText = element.name;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const departamentFilter = allDep.filter((element) => element.companies.name === select.value)
    if(select.value === "Selecionar empresa"){
      cardRender(allDep)
    }else{
    cardRender(departamentFilter)
    }
  })

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

  const pencil = document.createElement("img");
  pencil.src = "../img/Pencil.svg";

  const trash = document.createElement("img");
  trash.src = "../img/Trash-icon.svg";

  figureContainer.append(eye, pencil, trash);
  card.append(
    departamentName,
    departamentDescription,
    companyName,
    figureContainer
  );

  return card;
}

const usersRender = async () => {
  const allUsers = await getAllEmployees();
  console.log(allUsers);
  cardUserRender(allUsers)
};

function cardUserRender(array) {
  const userContainer = document.querySelector(".user-container");
  userContainer.innerHTML = ''

  array.forEach((element) => {
    let cardRender = cardUserMaker(element);
    userContainer.appendChild(cardRender);
  });
}

function cardUserMaker(element) {
  const card = document.createElement("li");
  card.classList = "user-card departament-description";

  const userName = document.createElement("h4");
  userName.innerText = element.username;

  const userExp = document.createElement("p");
  userExp.innerText = element.professional_level;

  const userCompany = document.createElement("span");
  if (element.department_uuid === null) {
    userCompany.innerText = "Não empregado";
  }else{
    userCompany.innerText = element.department_uuid
  }

  const figureContainer = document.createElement("figure")
  figureContainer.classList = "flex justify-center"

  const pencil = document.createElement("img")
  pencil.src = "../img/Pencil.svg"

  const trash = document.createElement("img")
  trash.src = "../img/Trash-icon.svg"

  figureContainer.append(pencil, trash)
  card.append(userName, userExp, userCompany, figureContainer)

  return card
}

const createDepartament = async () => {
  const createDepForm = await createDepartamentForm()
  const buttonCreateDepartament = document.querySelector("#create-departament")
  buttonCreateDepartament.addEventListener("click", (e) =>{
    e.preventDefault()
    modalBg(createDepForm)
  })
}

async function createDepartamentForm(){
  const allCompanys = await getAllCompanys()

  const title = document.createElement("h2")
  title.innerText = "Criar departamento"

  const form = document.createElement("form")
  form.classList = "form-modal flex column"

  const departamentName = document.createElement("input")
  departamentName.placeholder = "Nome do departamento"

  const departamentDescription = document.createElement("input")
  departamentDescription.placeholder = "Descrição"

  const select = document.createElement("select")
  select.id = "modal-form-select"

  allCompanys.forEach((element) => {
    const option = document.createElement("option")
    option.innerText = element.name
    option.value = element.uuid
    select.appendChild(option)
  })

  let body = {}

  const submitBtn = document.createElement("button")
  submitBtn.innerText = "Criar o departamento"
  submitBtn.type = "submit"
  submitBtn.addEventListener("click", async() => {
    body = {
      name:departamentName.value,
      description:departamentDescription.value,
      company_uuid: select.value
    }

    await postCreateDepartament(body)
    
  })

  form.append(title, departamentName, departamentDescription, select, submitBtn)
  return form
}

createDepartament()

departamentRender();
usersRender();




