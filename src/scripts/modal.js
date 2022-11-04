export const modalBg = (content) => {
  const body = document.querySelector("body")

  const modalBackGround = document.createElement("section")
  modalBackGround.classList = "modal-bg"

  const modal = document.createElement("div")
  modal.appendChild(content)

  modalBackGround.appendChild(modal)
  body.insertAdjacentElement("afterbegin", modalBackGround)
}