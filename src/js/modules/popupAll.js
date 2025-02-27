// Popup-окно. Открытие и закрытие окна
// Закрываем окно тремя способами: при нажатии на кнопку (крестик, например), при клике по пустой области, при нажатии Escape.

function findAndActivatePopups() {
  // Находим все "кнопки" открытия попапов на странице. Такими кнопками могут быть любые элементы. Например, слайд слайдера. На каждой кнопке у нас будет data-атрибут data-popup-btn-open. Значением атрибута будет являться id, связанного попапа. Например, data-popup-btn-open = "video-gallery-popup-1". То есть значение дата-атрибута кнопки открытия попапа будет совпадать с id попапа, который будет открываться этой кнопкой.
  const popupBtnOpenAll = document.querySelectorAll("[data-popup-btn-open]");

  // Находим body, чтобы добавлять ему класс _lock. Он уберет скролл, когда будет появляться попап. Чтобы нельзя было скроллить страницу под попапом.
  const body = document.querySelector("body");

  // При появлении попапа будем добавлять body padding-right, который будет компенсировать пропажу скроллбара. Иначе будет дергание контента на странице.
  function addScrollbarGutter() {
    const scrollWidth =
      window.innerWidth - document.documentElement.clientWidth;
    body.style.paddingRight = scrollWidth + "px";
  }

  // Функция, которая убирает padding-right при скрытии попапа
  function removeScrollbarGutter() {
    body.style.paddingRight = "";
  }

  // Слушаем клики на всех кнопках, открывающих попапы.
  popupBtnOpenAll.forEach((item) =>
    item.addEventListener("click", showHidePopup)
  );

  function showHidePopup() {
    const popupId = this.dataset.popupBtnOpen;
    const popup = document.querySelector(`#${popupId}`);

    // Если попап с id равным значению дата-атрибута кнопки открытия попапа не найдено, завершаем функцию.
    if (!popup) return;

    popup.classList.add("_open");
    addScrollbarGutter();
    body.classList.add("_lock");

    // Код ниже добавляется для попапов с видео с YouTube. Чтобы при открытии попапа с видео видео сразу запускалось. При закрытии попапа видео будет останавливаться. Но для этого будет аналогичный код дальше. Применяется для элемента iframe.

    // if (this.classList.contains("video-gallery__swiper-slide")) {
    //   const video = popup.querySelector(".video-gallery__popup-video");
    //   video.contentWindow.postMessage(
    //     '{"event":"command","func":"playVideo","args":""}',
    //     "*"
    //   );
    // }

    // Чтобы задумка с запуском-остановкой видео работала нужно в html-коде в src для видео добавить ?enablejsapi=1
    // Пример ниже:

    // <iframe
    //   class="video-gallery__popup-video"
    //   width="640"
    //   height="360"
    //   src="https://www.youtube.com/embed/cPYTxu0vTOk?enablejsapi=1"
    //   title="Курс Nuxt 3. Урок 1. Знакомство с фреймворком"
    //   frameborder="0"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //   referrerpolicy="strict-origin-when-cross-origin"
    //   allowfullscreen
    // ></iframe>;

    // === Закрываем popup-окно трем способами === //

    // Закрываем popup-окно кликом по пустой области (и по крестику)
    popup.addEventListener("click", closePopup);

    function closePopup(event) {
      if (
        !event.target.closest("[class$='__popup-content']") ||
        event.target.closest("[class$='__popup-close-btn']")
      ) {
        popup.classList.remove("_open");
        body.classList.remove("_lock");
        removeScrollbarGutter();

        // === Код ниже добавлятся для попапов с видео. Останавливает проигрывание видео при закрытии попапа.

        // if (popup.querySelector(".video-gallery__popup-video")) {
        //   const video = popup.querySelector(".video-gallery__popup-video");
        //   video.contentWindow.postMessage(
        //     '{"event":"command","func":"pauseVideo","args":""}',
        //     "*"
        //   );
        // }
        popup.removeEventListener("click", closePopup);
        popup.removeEventListener("keydown", closePopup2);
        // После закрытия попапа все обработчики событий для закрытия попапа удаляем. Ведь они нужны только при открытом попапа. Да и при каждом открытии попапа будут создаваться одинаковые обработчики, которые делают одно и то же.
      }
    }

    // Закрываем popup-окно клавишей Escape
    window.addEventListener("keydown", closePopup2);

    function closePopup2(event) {
      if (event.code == "Escape") {
        popup.classList.remove("_open");
        body.classList.remove("_lock");
        removeScrollbarGutter();

        // === Код ниже - для попапов с видео === //

        // if (popup.querySelector(".video-gallery__popup-video")) {
        //   const video = popup.querySelector(".video-gallery__popup-video");
        //   video.contentWindow.postMessage(
        //     '{"event":"command","func":"pauseVideo","args":""}',
        //     "*"
        //   );
        // }

        popup.removeEventListener("click", closePopup);
        popup.removeEventListener("keydown", closePopup2);
      }
    }
  }
}

export default findAndActivatePopups;
