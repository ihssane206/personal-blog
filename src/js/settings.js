const KEY_DARK = "darkMode";
const KEY_FONT = "fontSize";
const KEY_FORM = "savedForm";
const darkToggle = document.getElementById("darkToggle");

const smallBtn = document.getElementById("smallBtn");
const mediumBtn = document.getElementById("mediumBtn");
const largeBtn = document.getElementById("largeBtn");

const username = document.getElementById("username");
const email = document.getElementById("email");
const savedMsg = document.getElementById("savedMsg");
const clearSavedBtn = document.getElementById("clearSavedBtn");

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  darkToggle.checked = isDark;
  localStorage.setItem(KEY_DARK, String(isDark));
}
function applyFont(sizePx) {
  document.body.style.fontSize = sizePx;
  localStorage.setItem(KEY_FONT, sizePx);
}
let saveTimer = null;

function showSavedMessage() {
  savedMsg.textContent = "Saved!";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    savedMsg.textContent = "";
  }, 1200);
}
function saveForm() {
  const data = {
    username: username.value,
    email: email.value
  };
  localStorage.setItem(KEY_FORM, JSON.stringify(data));
  showSavedMessage();
}

function loadForm() {
  const raw = localStorage.getItem(KEY_FORM);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    if (data.username) username.value = data.username;
    if (data.email) email.value = data.email;
  } catch (e) {
    // if corrupted, remove it
    localStorage.removeItem(KEY_FORM);
  }
}

function clearSavedData() {
  localStorage.removeItem(KEY_FORM);
  username.value = "";
  email.value = "";
  savedMsg.textContent = "";
}

// ====== LOAD SAVED SETTINGS ON PAGE LOAD ======
window.addEventListener("load", () => {
  // theme
  const isDark = localStorage.getItem(KEY_DARK) === "true";
  applyTheme(isDark);

  // font
  const savedFont = localStorage.getItem(KEY_FONT);
  if (savedFont) applyFont(savedFont);

  // form
  loadForm();
});

// ====== EVENTS ======
darkToggle.addEventListener("change", () => {
  applyTheme(darkToggle.checked);
});

smallBtn.addEventListener("click", () => applyFont("14px"));
mediumBtn.addEventListener("click", () => applyFont("18px"));
largeBtn.addEventListener("click", () => applyFont("22px"));

username.addEventListener("input", saveForm);
email.addEventListener("input", saveForm);

clearSavedBtn.addEventListener("click", clearSavedData);
