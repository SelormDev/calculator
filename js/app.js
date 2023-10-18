"use strict";

const num = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operators");
const clearBtn = document.querySelector(".clear_all");
let calculationSection = document.querySelector(".calculation_section");
let totalSection = document.querySelector(".total_section");
let displayValue = 0;

let firstNumber;
let sign;
let secondNumber;

const add = (firstNumber, secondNumber) => {
  return firstNumber + secondNumber;
};

const subtract = (firstNumber, secondNumber) => {
  return firstNumber - secondNumber;
};

const multiply = (firstNumber, secondNumber) => {
  return firstNumber * secondNumber;
};

const divide = (firstNumber, secondNumber) => {
  return firstNumber / secondNumber;
};
const calculate = (operator, firstNumber, secondNumber) => {
  if (operator === "+") {
    return add(firstNumber, secondNumber);
  } else if (operator === "−") {
    return subtract(firstNumber, secondNumber);
  } else if (operator === "×") {
    return multiply(firstNumber, secondNumber);
  } else if (operator === "÷") {
    return divide(firstNumber, secondNumber);
  } else {
    return secondNumber;
  }
};

function updateDisplayValue() {
  totalSection.textContent += this.textContent;
  displayValue = Number(totalSection.textContent);
}

for (let i = 0; i < num.length; i++) {
  num[i].addEventListener("click", updateDisplayValue);
}

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    switch (operator.textContent) {
      case "+":
      case "−":
      case "×":
      case "÷":
        if (calculationSection.textContent !== "") {
          secondNumber = displayValue;
          firstNumber = calculate(sign, firstNumber, secondNumber);
          totalSection.textContent = firstNumber;
        } else {
          firstNumber = displayValue;
        }

        sign = operator.textContent;
        calculationSection.textContent = `${firstNumber} ${sign}`;
        totalSection.textContent = "";
        break;
    }
  });
});

clearBtn.addEventListener("click", () => {
  calculationSection.textContent = "";
  totalSection.textContent = "";
  displayValue = 0;
});
