console.log("JS Loaded")

// constants
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// helper functions
const debounce = (func, timeout = 300) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args)}, timeout);
  }
}

// elements 
const emailInputElmt = document.getElementById("email-input");
const emailInputFlash = document.getElementById("email-error");

const submitButton = document.getElementById("submit-btn");
const dismissButton = document.getElementById("success-btn")

const signupCard = document.getElementById("signup-card");
const messageCard = document.getElementById("success-card");

// register event listeners
let messageActive = false;
let isValidEmail = true;

emailInputElmt.addEventListener("keyup", debounce((e) => {
  const emailValue = e.target.value;

  if (emailValue.length <= 0) {
    emailInputFlash.style.visibility = "hidden";
    return;
  }

  isValidEmail = EMAIL_REGEX.test(emailValue);

  if (isValidEmail) {
    emailInputFlash.style.visibility = "hidden";
  } else {
    emailInputFlash.style.visibility = "visible";
  }
}));

submitButton.addEventListener("click", () => {
  if (isValidEmail && emailInputElmt.value.length > 0) {
    signupCard.style.display = "none";
    messageCard.style.display = "block";
  }
});

dismissButton.addEventListener("click", () => {
  if (window.screen.width >= 1440) {
    signupCard.style.display = "flex";
  } else {
    signupCard.style.display = "block";
  }
  messageCard.style.display = "none";

  emailInputElmt.value = "";
});