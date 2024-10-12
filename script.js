const slider = document.querySelector(".range__slider input");
const sliderValue = document.querySelector(".length__title");
let number = document.getElementById("number");
let Password = document.getElementById("generationpassword");
let CopyButton = document.getElementById("CopyButton");
let checks = document.querySelectorAll(".check");
let includeletters = document.querySelectorAll(".checkinclude");
let generatelastly = document.getElementById("generatelastly");
let strengthMain = document.querySelectorAll(".strengthMain");

slider.addEventListener("input", (event) => {
  let length = event.target.value;
  sliderValue.setAttribute("data-length", length);
  applyFill(event.target);
  number.textContent = length;
});

function applyFill(slider) {
  const percentage =
    (100 * (slider.value - slider.min)) / (slider.max - slider.min);
  const fillColor = "#4CAF50";
  const backgroundColor = "#ddd";

  const bg = `linear-gradient(90deg, ${fillColor} ${percentage}%, ${backgroundColor} ${percentage + 0.1}%)`;
  slider.style.background = bg;
}

function generatePassword(length) {
  let alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let alphabetLower = "abcdefghijklmnopqrstuvwxyz";
  let password = "";

  let includeUpper = document
    .querySelector(".checkinclude:nth-child(1) .check")
    .classList.contains("selected");
  let includeLower = document
    .querySelector(".checkinclude:nth-child(2) .check")
    .classList.contains("selected");
  let includeNumbers = document
    .querySelector(".checkinclude:nth-child(3) .check")
    .classList.contains("selected");
  let includeSymbols = document
    .querySelector(".checkinclude:nth-child(4) .check")
    .classList.contains("selected");

  if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
    Password.textContent = "Please select at least one character type!";
    return;
  }

  let characters = "";
  if (includeUpper) characters += alphabetUpper;
  if (includeLower) characters += alphabetLower;
  if (includeNumbers) characters += "0123456789";
  if (includeSymbols) characters += "!@#$%^&*()_+-=[]{}|;:'\",.<>?";

  if (characters.length > 0) {
    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    Password.textContent = password;
    number.textContent = password.length;
  } else {
    Password.textContent = "Please select at least one character type!";
  }
}

includeletters.forEach((check, index) => {
  let button = check.children[0];
  button.addEventListener("click", (event) => {
    if (
      button.style.backgroundImage === "" ||
      button.style.backgroundImage === "none"
    ) {
      button.style.backgroundImage = "url('assets/images/icon-check.svg')";
    } else {
      button.style.backgroundImage = "none";
    }
  });
  button.addEventListener("click", () => {
    button.classList.toggle("selected"); // Toggle selected class
  });
});

function Generate() {
  let includeUpper = document
    .querySelector(".checkinclude:nth-child(1) .check")
    .classList.contains("selected");
  let includeLower = document
    .querySelector(".checkinclude:nth-child(2) .check")
    .classList.contains("selected");
  let includeNumbers = document
    .querySelector(".checkinclude:nth-child(3) .check")
    .classList.contains("selected");
  let includeSymbols = document
    .querySelector(".checkinclude:nth-child(4) .check")
    .classList.contains("selected");

  if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
    strengthMain.forEach((item) => {
      if (includeUpper) item.children[0].style.backgroundColor = "none";
      if (includeLower) item.children[1].style.backgroundColor = "none";
      if (includeNumbers) item.children[2].style.backgroundColor = "none";
      if (includeSymbols) item.children[3].style.backgroundColor = "none";
    });
    return;
  }

  strengthMain.forEach((item) => {
    if (includeUpper) item.children[0].style.backgroundColor = "red";
    if (includeLower) item.children[1].style.backgroundColor = "orange";
    if (includeNumbers) item.children[2].style.backgroundColor = "yellow";
    if (includeSymbols) item.children[3].style.backgroundColor = "green";
  });
}

generatelastly.addEventListener("click", () => {
  let length = slider.value;
  generatePassword(length);
  Generate();
});

CopyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(Password.textContent);
});
