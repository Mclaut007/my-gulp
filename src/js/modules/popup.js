// Popup-окно. Открытие и закрытие окна
// Закрываем окно тремя способами: при нажатии на кнопку (крестик, например), при клике по пустой области, при нажатии Escape.

function showHidePopup() {
  const showPopupButton = document.querySelector("popup__button");
  const popupClose = document.querySelector(".popup__close");
  const popup = document.querySelector("#popup");

  showPopupButton.addEventListener("click", openPopup);
  popupClose.addEventListener("click", closePopup);
  popup.addEventListener("click", closePopup2);
  document.addEventListener("keydown", closePopup3);

  function openPopup() {
    popup.classList.add("_open-popup");
  }

  function closePopup() {
    popup.classList.remove("_open-popup");
  }

  function closePopup2(event) {
    if (!event.target.closest(".popup__content")) {
      popup.classList.remove("_open-popup");
    }
  }

  function closePopup3(event) {
    if (event.code == "Escape") {
      popup.classList.remove("_open-popup");
    }
  }
}

export default showHidePopup;
