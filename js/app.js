"use strict";

const numbersBtn = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operators");
const clearBtn = document.querySelector(".clear_all");
const equalBtn = document.querySelector(".equals");
const calculationSection = document.querySelector(".calculation_section");
const totalSection = document.querySelector(".total_section");

let displayValue = 0;
let firstNumber = null;
let operator = null;

function updateDisplayValue(value) {
  totalSection.textContent += value;
  displayValue = parseFloat(totalSection.textContent);
}

function operate() {
  if (firstNumber === null) {
    firstNumber = displayValue;
  } else if (operator) {
    firstNumber = calculate(operator, firstNumber, displayValue);
  }
  operator = this.textContent;
  calculationSection.textContent = `${firstNumber} ${operator}`;
  totalSection.textContent = "";
}

function calculate(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      if (b !== 0) {
        return a / b;
      } else {
        return "Error";
      }
    default:
      return "Error: Invalid operator";
  }
}

function reset() {
  calculationSection.textContent = "";
  totalSection.textContent = "";
  displayValue = 0;
  firstNumber = null;
  operator = null;
}

function equalise() {
  if (operator && totalSection.textContent) {
    const result = calculate(operator, firstNumber, displayValue);
    totalSection.textContent = result;
    calculationSection.textContent = "";
    firstNumber = result;
    operator = null;
  }
}

numbersBtn.forEach((button) => {
  button.addEventListener("click", () =>
    updateDisplayValue(button.textContent)
  );
});

operators.forEach((button) => {
  button.addEventListener("click", operate);
});

equalBtn.addEventListener("click", equalise);
clearBtn.addEventListener("click", reset);

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (/[0-9]/.test(key)) {
    updateDisplayValue(key);
  } else if (["+"].includes(key)) {
    operate.call({ textContent: key });
  } else if (["-"].includes(key)) {
    operate.call({ textContent: "−" });
  } else if (["*"].includes(key)) {
    operate.call({ textContent: "×" });
  } else if (["/"].includes(key)) {
    operate.call({ textContent: "÷" });
  } else if (key === "Enter") {
    equalise();
  } else if (key === "Backspace") {
    reset();
  }
});
