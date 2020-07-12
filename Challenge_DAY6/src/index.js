// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const select = document.querySelector("select");
const option = document.querySelectorAll("select option");
const COUTRY_LS = "selectCountry";

function saveCountry(value) {
  localStorage.setItem(COUTRY_LS, value);
}

function handleChange(event) {
  const value = event.target.value;
  saveCountry(value);
}

function paintCountry(preValue) {
  const len = option.length;
  for (let i = 1; i < len; i++) {
    if (option[i].value === preValue) {
      option[i].selected = true;
    }
  }
}

function loadCountry() {
  const value = localStorage.getItem(COUTRY_LS);
  if (value === null) {
    select.addEventListener("change", handleChange);
  } else {
    paintCountry(value);
  }
}

function init() {
  loadCountry();
}
init();
