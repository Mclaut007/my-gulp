// npm install imask - установка плагина

import IMask from "imask";

function inputPhoneIMask() {
  // input с телефоном
  const phoneInput = document.querySelector(".phone-input");

  // Кнопка отправки формы
  const phoneSubmit = document.querySelector(".phone-submit");

  // Создаем маску в инпуте
  const mask = new IMask(phoneInput, {
    mask: "+{7}(000)000-00-00",
    lazy: false, // Чтобы "placeholder" не исчезал при введении номера
  });

  // Если номер телефона введен не полностью, кнопка отправки формы не сработает. Она по умолчанию имеет pointer-events: none. Класс _active делает pointer-event: auto; Добавляем класс _active, когда номер введен полностью.

  phoneInput.addEventListener("input", phoneInputHandler);

  function phoneInputHandler() {
    if (mask.masked.isComplete) {
      phoneSubmit.classList.add("_active");
    } else {
      phoneSubmit.classList.remove("_active");
    }
  }

  // При отправке формы записываем в value номер без скобок и дефисов

  form.addEventListener("submit", () => {
    input.value = mask.unmaskedValue;
  });

  // ========== Вариант без перезагрузки страницы ========= //
  // Тогда строчки кода с прослушкой выше удаляем.

  // При клике по кнопке отправляем введенный номер куда-нибудь (на почту, например)

  // phoneSubmit.addEventListener("click", btnHandler);

  // async function btnHandler(e) {
  //   e.preventDefault();
  //   return await fetch("send_msg.php", {
  //     method: "POST",
  //     body: mask.unmaskedValue,
  //   });
  // }

  // В качестве скрипта send_msg.php вы можете использовать любой скрипт для отправки данных на почту
}

export default inputPhoneIMask;
