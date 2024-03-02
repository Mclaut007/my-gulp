// Появление фиксированного хедера при скролле вверх и исчезновение его при скролле вниз

function showHideFixedHeader() {
  let lastScroll = 0;
  const defaultOffset = 150; // Сюда ставим высоту хедера или больший размер

  const header = document.querySelector(".header");

  const scrollPosition = () =>
    window.scrollY || document.documentElement.scrollTop;

  const containHide = () => header.classList.contains("_hide");

  window.addEventListener("scroll", () => {
    if (
      scrollPosition() > lastScroll &&
      !containHide() &&
      scrollPosition() > defaultOffset
    ) {
      // scroll down
      header.classList.add("_hide");
    } else if (scrollPosition() < lastScroll && containHide()) {
      // scroll up
      header.classList.remove("_hide");
    }

    lastScroll = scrollPosition();
  });
}

export default showHideFixedHeader;
