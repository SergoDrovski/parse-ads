const validation = {
  wrapper: null,

  //Метод контрольной валидации перед отправкой
  validForm(elem, formData) {
    let res = [];
    this.wrapper = elem.querySelectorAll(".form-floating");
    this.wrapper.forEach((el) => {
      let input = el.querySelector(".form-control");
      let feedback = el.querySelector(".feedback");
      let method = "Valid" + input.name[0].toUpperCase() + input.name.slice(1);
      if (method in this) {
        res.push(this[method](formData.get(input.name), input, feedback));
      }
    });
    for (let value of res) {
      if (!value) {
        return false;
      }
    }
    return true;
  },

  //ВЫВОД ОШИБОК
  showError(str, input, feedback) {
    input.classList.remove("border-valid");
    input.classList.add("border-invalid");
    feedback.classList.add("invalid-feedback");
    feedback.innerHTML = str;
  },
  showSuccess(input, feedback) {
    input.classList.remove("border-invalid");
    input.classList.add("border-valid");
    feedback.classList.remove("invalid-feedback");
    feedback.innerHTML = "";
  },

  // СОБЫТИЯ ОТСЛЕЖИВАНИЯ ВВОДА СИМВОЛОВ

  handleEventEmail(event) {
    let input = event.target;
    let feedback = event.composedPath()[1].querySelector(".feedback");
    validation.ValidEmail(event.target.value, input, feedback);
  },

  //МЕТОДЫ ПРОВЕРКИ (СОДЕРЖАТ ПРАВИЛА ПРОВЕРКИ)

  ValidEmail(email, input, feedback) {
    if (email.replace(/\s/g, "") === "") {
      this.showError(`Заполните ${input.type}`, input, feedback);
      return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let result = email.match(regex);
    if (!result) {
      this.showError("Недопустимый формат email-адреса", input, feedback);
      return false;
    }
    this.showSuccess(input, feedback);
    return true;
  },

  // ValidPassword(password, input, feedback) {
  //   if (email.replace(/\s/g, "") === "") {
  //     this.showError(`Заполните ${input.type}`, input, feedback);
  //     return false;
  //   }
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   let result = email.match(regex);
  //   if (!result) {
  //     this.showError("Недопустимый формат пароля", input, feedback);
  //     return false;
  //   }
  //   this.showSuccess(input, feedback);
  //   return true;
  // },
};

//--------------------Validation and send-------------------------

const form = document.querySelector(".form");
const buttonNew = document.querySelector("#form-button");
const inputEmail = form.querySelector("#email");

inputEmail.oninput = function (event) {
  validation.handleEventEmail(event);
};
buttonNew.onpointerdown = (event) => {
  send(event);
};

// Отправка данных формы и контрольная провека данных
function send() {
  if (buttonNew.dataset.slide !== "5") return;
  const formData = new FormData(form);
  let valid = validation.validForm(form, formData);
  if (valid) {
    // setTimeout(()=>{alert('Форма отправляется!')}, 1000)
    form.submit();
  }
}
