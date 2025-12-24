const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");
const loginSuccess = document.getElementById("loginSuccess");

const regForm = document.getElementById("regForm");
const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regUsername = document.getElementById("regUsername");
const regPassword = document.getElementById("regPassword");
const regConfirmPassword = document.getElementById("regConfirmPassword");

const regNameError = document.getElementById("regNameError");
const regEmailError = document.getElementById("regEmailError");
const regUsernameError = document.getElementById("regUsernameError");
const regPasswordError = document.getElementById("regPasswordError");
const regConfirmPasswordError = document.getElementById("regConfirmPasswordError");
const regSuccess = document.getElementById("regSuccess");

const clearBtn = document.getElementById("clearBtn");
function setInvalid(input, errorSpan, message) {
  input.classList.add("invalid");
  errorSpan.textContent = message;
}

function clearField(input, errorSpan) {
  input.classList.remove("invalid");
  errorSpan.textContent = "";
}
function hasAtSymbol(value) {
  return value.includes("@");
}
function validateLogin(e) {
  e.preventDefault(); // prevent submission if fails
  let ok = true;

  loginSuccess.textContent = "";

  clearField(loginEmail, loginEmailError);
  clearField(loginPassword, loginPasswordError);

  const emailVal = loginEmail.value.trim();
  const passVal = loginPassword.value;

  if (emailVal === "") {
    ok = false;
    setInvalid(loginEmail, loginEmailError, "Email is required.");
  } else if (!hasAtSymbol(emailVal)) {
    ok = false;
    setInvalid(loginEmail, loginEmailError, "Email must include @");
  }

  if (passVal.trim() === "") {
    ok = false;
    setInvalid(loginPassword, loginPasswordError, "Password is required.");
  } else if (passVal.length < 6) {
    ok = false;
    setInvalid(loginPassword, loginPasswordError, "Password must be at least 6 characters.");
  }
  if (ok) {
    loginSuccess.textContent = "Login validation passed ✅";
  }
}
function validateRegistration(e) {
  e.preventDefault();
  let ok = true;

  regSuccess.textContent = "";

  clearField(regName, regNameError);
  clearField(regEmail, regEmailError);
  clearField(regUsername, regUsernameError);
  clearField(regPassword, regPasswordError);
  clearField(regConfirmPassword, regConfirmPasswordError);

  const nameVal = regName.value.trim();
  const emailVal = regEmail.value.trim();
  const userVal = regUsername.value.trim();
  const passVal = regPassword.value;
  const confirmVal = regConfirmPassword.value;

  if (nameVal === "") {
    ok = false;
    setInvalid(regName, regNameError, "Name is required.");
  }
  if (emailVal === "") {
    ok = false;
    setInvalid(regEmail, regEmailError, "Email is required.");
  } else if (!hasAtSymbol(emailVal)) {
    ok = false;
    setInvalid(regEmail, regEmailError, "Email must include @");
  }
  if (userVal === "") {
    ok = false;
    setInvalid(regUsername, regUsernameError, "Username is required.");
  } else if (userVal.length < 3) {
    ok = false;
    setInvalid(regUsername, regUsernameError, "Username must be at least 3 characters.");
  }
  if (passVal.trim() === "") {
    ok = false;
    setInvalid(regPassword, regPasswordError, "Password is required.");
  } else if (passVal.length < 6) {
    ok = false;
    setInvalid(regPassword, regPasswordError, "Password must be at least 6 characters.");
  }
  if (confirmVal.trim() === "") {
    ok = false;
    setInvalid(regConfirmPassword, regConfirmPasswordError, "Confirm password is required.");
  } else if (confirmVal !== passVal) {
    ok = false;
    setInvalid(regConfirmPassword, regConfirmPasswordError, "Passwords do not match.");
  }
  if (ok) {
    regSuccess.textContent = "Registration successful ✅";
  }
}
function clearRegistrationForm() {
  regForm.reset();
  regSuccess.textContent = "";

  clearField(regName, regNameError);
  clearField(regEmail, regEmailError);
  clearField(regUsername, regUsernameError);
  clearField(regPassword, regPasswordError);
  clearField(regConfirmPassword, regConfirmPasswordError);
}
loginEmail.addEventListener("input", () => clearField(loginEmail, loginEmailError));
loginPassword.addEventListener("input", () => clearField(loginPassword, loginPasswordError));

regName.addEventListener("input", () => clearField(regName, regNameError));
regEmail.addEventListener("input", () => clearField(regEmail, regEmailError));
regUsername.addEventListener("input", () => clearField(regUsername, regUsernameError));
regPassword.addEventListener("input", () => clearField(regPassword, regPasswordError));
regConfirmPassword.addEventListener("input", () => clearField(regConfirmPassword, regConfirmPasswordError));

loginForm.addEventListener("submit", validateLogin);
regForm.addEventListener("submit", validateRegistration);
clearBtn.addEventListener("click", clearRegistrationForm);