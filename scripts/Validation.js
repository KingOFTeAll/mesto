const checkInputValidity = (input, config) => {
   const error = document.querySelector(`#${input.id}-error`); 

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

const makeButtonStateDisabled = (button, config) => {
   button.classList.add(config.disabledSubmitButton);
   button.disabled = true;
}

const makeButtonStateEnabled = (button, config) => {
   button.classList.remove(config.disabledSubmitButton);
   button.disabled = false;
}

const toggleButtonState = (inputs, button, config) => {

   const formIsValid = inputs.every((input) => input.validity.valid); //проверяем что каждый инпут валидный

   if (formIsValid)
   {makeButtonStateEnabled(button, config);}
   else{ makeButtonStateDisabled(button, config);}
};

const enableValidation = () => {
   const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config;

   const forms = [...document.querySelectorAll(formSelector)];

   forms.forEach((form) => {
      const inputs = [...form.querySelectorAll(inputSelector)];
      const button = form.querySelector(submitButtonSelector);


      toggleButtonState(inputs, button, restConfig);

      form.addEventListener("submit", (evt) => {
         evt.preventDefault();
         toggleButtonState(inputs, button, restConfig);
      });

      inputs.forEach((input) => {
         input.addEventListener("input", () => {
            checkInputValidity(input, restConfig);
            toggleButtonState(inputs, button, restConfig);
         });
      });
     
   });
};

const config = { 
   formSelector: ".form",
   inputSelector: ".form__input",
   submitButtonSelector: ".form__submit",
   disabledSubmitButton: "form__submit_disabled",
   inputErrorSelector: "form__input_type-error",
   errorClass: "form__error_visible",
};

enableValidation(config);// Заккоментить 