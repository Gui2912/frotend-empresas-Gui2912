import {modalBg} from "./modal.js"

const logout = () => {
  const logoutBtn = document.querySelector("#index-redirect")

  logoutBtn.addEventListener("click", () => {
    const token = JSON.parse(localStorage.getItem("token")) || ""
    localStorage.clear()
    
    window.location.replace("../../index.html")
    
  })
}
logout()

// const createNew