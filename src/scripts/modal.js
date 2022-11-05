export const modalBg = (content) => {
  const body = document.querySelector("body")

  const modalBackGround = document.createElement("section")
  modalBackGround.classList = "modal-bg"

  const modal = document.createElement("div")
  modal.classList = "modal flex justify-center column"

  const figure = document.createElement("figure")
  figure.classList = "flex flex-end close-button"

  const closeModal = document.createElement("img")
  closeModal.src = "../img/X-icon.svg"
  closeModal.addEventListener("click", () => modalBackGround.remove())
  figure.appendChild(closeModal)
  
  modal.append(figure, content)

  modalBackGround.appendChild(modal)
  body.insertAdjacentElement("afterbegin", modalBackGround)
}
