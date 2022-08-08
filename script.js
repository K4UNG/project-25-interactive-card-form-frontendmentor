const form = document.getElementById("form");
const inputs = document.querySelectorAll(".form input");

const number = document.getElementById("card__number");
const name = document.getElementById("card__name");
const month = document.getElementById("card__month");
const year = document.getElementById("card__year");
const cvc = document.getElementById("card__cvc");

const nameErr = document.getElementById("name__err");
const numberErr = document.getElementById("number__err");
const dateErr = document.getElementById("date__err");
const cvcErr = document.getElementById("cvc__err");

const container = document.querySelector(".actions");

let errors = [1, 1, 1, 1, 1];

form.onsubmit = (e) => {
  e.preventDefault();
  if (errors[0] !== 0) {
    inputs[0].classList.add("error");
    nameErr.textContent = "Can't be blank";
  }
  if (errors[1] !== 0) {
    inputs[1].classList.add("error");
    const err = errors[1];
    if (err === 1) {
      numberErr.textContent = "Can't be blank";
    } else if (err === 2) {
      numberErr.textContent = "Wrong format, numbers only";
    } else {
      numberErr.textContent = "Invalid number";
    }
  }
  if (errors[2] !== 0 || errors[3] !== 0) {
    const err1 = errors[2];
    const err2 = errors[3];
    if (err1 !== 0) inputs[2].classList.add("error");
    if (err2 !== 0) inputs[3].classList.add("error");
    if (err1 === 1 || err2 === 1) {
      dateErr.textContent = "Can't be blank";
    } else if (err1 === 2 || err2 === 2) {
      dateErr.textContent = "Invalid";
    }
  }
  if (errors[4] !== 0) {
    inputs[4].classList.add("error");
    const err = errors[4];
    if (err === 1) cvcErr.textContent = "Can't be blank";
    else cvcErr.textContent = "Invalid";
  }

  if (errors.reduce((a, b) => a + b, 0) === 0) {
    container.innerHTML = `<div class="success">
        <img src="./images/icon-complete.svg" alt="complete icon">
        <h2>THANK YOU!</h2>
        <p>We've added your card details</p>
        <button class="button">Contine</button>
      </div>`;
    container.querySelector('.button').onclick = () => location.reload()
  }
};

inputs.forEach((input) => {
  input.onkeypress = (e) => {
    const key = e.key;
    if (
      (key === "e" ||
        key === "-" ||
        key === "+" ||
        key === "_" ||
        key === "=") &&
      input.name !== "name"
    )
      e.preventDefault();
  };
  input.addEventListener("keyup", () => {
    if (input.classList.contains("error")) input.classList.remove("error");
    const type = input.name;
    if (type === "name") {
      nameErr.textContent = "";
      if (input.value.trim()) {
        name.textContent = input.value.trim().toUpperCase();
        errors[0] = 0;
      } else {
        name.textContent = "JANE APPLESEED";
        errors[0] = 1;
      }
    } else if (type === "number") {
      numberErr.textContent = "";
      const value = input.value.trim().replace(/\s/g, "");
      const x = Number(value);
      if (x === 0) {
        errors[1] = 1;
      } else if (x != x) {
        errors[1] = 2;
      } else if (value.length < 16) {
        errors[1] = 3;
      } else {
        errors[1] = 0;
      }
      if (value.length > 16) {
        input.value = input.value.slice(0, 16);
        return;
      }
      let num = "0".repeat(16 - value.length) + value;
      number.textContent = `${num.slice(0, 4)} ${num.slice(4, 8)} ${num.slice(
        8,
        12
      )} ${num.slice(12, 16)}`;
    } else if (type === "cvc") {
      cvcErr.textContent = "";
      const x = Number(input.value.trim());
      if (x === 0) {
        errors[4] = 1;
      } else if (x != x || x < 100) {
        errors[4] = 2;
      } else {
        errors[4] = 0;
      }
      let value = x || "0";
      value = value.toString();
      const length = value.length;
      if (length === 4) {
        cvc.textContent = value;
        return;
      } else if (length > 4) {
        input.value = value.slice(0, 4);
        return;
      }
      cvc.textContent = "0".repeat(3 - length) + value;
    } else if (type === "month" || type === "year") {
      dateErr.textContent = "";
      const value = input.value.trim();
      if (value.length > 2) {
        input.value = value.slice(0, 2);
        return;
      }
      if (type === "month") {
        month.textContent = "0".repeat(2 - value.length) + value;
      } else {
        year.textContent = "0".repeat(2 - value.length) + value;
      }
      const x = Number(value);
      const i = type === "month" ? 2 : 3;
      if (x === 0) {
        errors[i] = 1;
      } else if (x != x || x < 0 || (i === 2 && x > 12)) {
        errors[i] = 2;
      } else {
        errors[i] = 0;
      }
    }
  });
});
