const checkInputValidity = (input, config) => {
   const error = document.querySelector(`#${input.id}-error`); // ревью писали,что нужно именно name, а не id, но сейчас профитнее убать одно из этого и строить всё или на id или на name
   // в спринте такого не было но скорее всего можно использовать input.name пока всё оттуда
   if (input.validity.valid) {
      error.textContent = "";
      error.classList.remove(config.errorClass);
      input.classList.remove(config.inputErrorSelector);
   }
   else {
      error.textContent = input.validationMessage;
      error.classList.add(config.errorClass);
      input.classList.add(config.inputErrorSelector);
   }
};

const toggleButtonState = (inputs, button, config) => {
   const formIsValid = inputs.every((input) => input.validity.valid); //проверяем что каждый инпут валидный

   if (formIsValid) {
      button.classList.remove(config.disabledSubmitButton);
      button.disabled = false;
   } else {
      button.classList.add(config.disabledSubmitButton);
      button.disabled = true;
   }
};

const enableValidation = (config) => {
   const { formSelector, inputSelector, submitButtonSelector, ...restConfig } =
      config;

   const forms = [...document.querySelectorAll(formSelector)];

   forms.forEach((form) => {
      const inputs = [...form.querySelectorAll(inputSelector)];
      const button = form.querySelector(submitButtonSelector);

      form.addEventListener("submit", (evt) => {
         evt.preventDefault();
         button.disabled = true;
         button.classList.add(config.disabledSubmitButton);
      });

      inputs.forEach((input) => {
         input.addEventListener("input", () => {
            checkInputValidity(input, restConfig);
            toggleButtonState(inputs, button, restConfig);
         });
      });
   });
};

const config = { // я тут немного переделал названия т.к. у меня названия классов другие, и форма это самостоятельный элемент
   formSelector: ".form",
   inputSelector: ".form__input",
   submitButtonSelector: ".form__submit",
   disabledSubmitButton: "form__submit_disabled",
   inputErrorSelector: "form__input_type-error",
   errorClass: "form__error_visible",
};

enableValidation(config);