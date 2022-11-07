const toast = (type, title, message) => {
  const body = document.querySelector("body");

  const toastContainer = document.createElement("div");
  toastContainer.classList = "toast-container";

  
  

  const h3 = document.createElement("h3");

  const toastText = document.createElement("p");

  if(type === "sucess"){
    toastContainer.style = "background-color: green"
  }else{
    toastContainer.style = "background-color: red"
  }

  h3.innerText = title;
  toastText.innerText = message;

  
  toastContainer.append(h3, toastText);
  setTimeout(() => {
    toastContainer.classList = "hied"
  }, 3000)
  
  body.appendChild(toastContainer);
};

export { toast };