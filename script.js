const form = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#password-toggle");
const formMessage = document.querySelector("#form-message");

function setFieldError(input, message) {
  const field = input.closest(".field");
  const error = field.querySelector(".field-error");
  const inputWrap = field.querySelector(".input-wrap");

  error.textContent = message;
  inputWrap.classList.toggle("is-invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateEmail() {
  const email = emailInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  setFieldError(emailInput, valid ? "" : "Enter a valid email address.");
  return valid;
}

function validatePassword() {
  const valid = passwordInput.value.length >= 8;

  setFieldError(passwordInput, valid ? "" : "Password must be at least 8 characters.");
  return valid;
}

emailInput.addEventListener("input", () => {
  if (emailInput.getAttribute("aria-invalid") === "true") {
    validateEmail();
  }
});

passwordInput.addEventListener("input", () => {
  if (passwordInput.getAttribute("aria-invalid") === "true") {
    validatePassword();
  }
});

passwordToggle.addEventListener("click", () => {
  const showingPassword = passwordInput.type === "password";

  passwordInput.type = showingPassword ? "text" : "password";
  passwordToggle.setAttribute("aria-label", showingPassword ? "Hide password" : "Show password");
  passwordToggle.setAttribute("aria-pressed", String(showingPassword));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  const emailIsValid = validateEmail();
  const passwordIsValid = validatePassword();

  if (!emailIsValid) {
    emailInput.focus();
    return;
  }

  if (!passwordIsValid) {
    passwordInput.focus();
    return;
  }

  formMessage.textContent =
    "Your details look good. Connect this form to an authentication service to sign in.";
});

document.querySelectorAll(".login-panel a[href='#']").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

document.querySelector("#google-button").addEventListener("click", () => {
  formMessage.textContent = "Google sign-in is not connected yet.";
});
