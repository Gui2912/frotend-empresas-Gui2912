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

  console.log(allCompanys);
  console.log(allSectors);

  let select = document.querySelector("select");

  allSectors.map((element) => {
    const option = document.createElement("option");
    option.value = element.description;
    option.innerText = element.description;
    select.appendChild(option);
  });

  const options = document.querySelectorAll("option")

    allCompanys.map((element) => {
      const ul = document.querySelector(".company-list");
      const card = document.createElement("li");
      const cardTitle = document.createElement("h3");
      cardTitle.innerText = element.name;

      const openHour = document.createElement("p");
      openHour.innerText = element.opening_hours.slice(1, 2) + " horas";

      const sectorType = document.createElement("span");
      sectorType.innerText = element.sectors.description;

      card.append(cardTitle, openHour, sectorType);
      ul.appendChild(card);
    });

};

companysRender();
