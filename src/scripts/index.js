import { getAllCompanys, getAllCompanysSectors } from "./requests.js";

const redirectPages = () => {
  const login = document.querySelector("#login");
  login.addEventListener("click", () => {
    window.location.replace("src/Pages/login.html");
  });

  const register = document.querySelector(".login");
  register.addEventListener("click", () => {
    window.location.replace("src/Pages/register.html");
  });
};
redirectPages();

const companysRender = async () => {
  const allCompanys = await getAllCompanys();
  const allSectors = await getAllCompanysSectors();

  let select = document.querySelector("select");

  allSectors.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.description;
    option.innerText = element.description;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const companyFilter = allCompanys.filter(element =>  element.sectors.description === select.value)
    // console.log(select.value);
    if (select.value === "") {
      renderCard(allCompanys)
    }else{
      renderCard(companyFilter)
    } 
  })
  
  renderCard(allCompanys);

};

function renderCard(array) {
  const ul = document.querySelector(".company-list");
  ul.innerHTML = "";
  array.forEach((element) => {
    let cardRenderization = cardMaker(element);
    ul.appendChild(cardRenderization);
  });
}

function cardMaker(element) {
  const card = document.createElement("li");
  const cardTitle = document.createElement("h3");
  cardTitle.innerText = element.name;

  const openHour = document.createElement("p");
  openHour.innerText = element.opening_hours.slice(1, 2) + " horas";

  const sectorType = document.createElement("span");
  sectorType.innerText = element.sectors.description;

  card.append(cardTitle, openHour, sectorType);

  return card;
}

companysRender();
