"use strict";

const numbersBtn = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operators");
const clearBtn = document.querySelector(".clear_all");
const equalBtn = document.querySelector(".equals");
let calculationSection = document.querySelector(".calculation_section");
let totalSection = document.querySelector(".total_section");

let displayValue = 0;

let answer = 0;

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
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "−":
      return subtract(firstNumber, secondNumber);
    case "×":
      return multiply(firstNumber, secondNumber);
    case "÷":
      return divide(firstNumber, secondNumber);
  }
};

function updateDisplayValue() {
  totalSection.textContent += this.textContent;
  displayValue = Number(totalSection.textContent);
}

for (let i = 0; i < numbersBtn.length; i++) {
  numbersBtn[i].addEventListener("click", updateDisplayValue);
}

let operatorValue = true;
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    switch (operator.textContent) {
      case "+":
      case "−":
      case "×":
      case "÷":
        if (answer !== 0) {
          firstNumber = answer;
        } else if (calculationSection.textContent !== "") {
          secondNumber = displayValue;
          firstNumber = calculate(sign, firstNumber, secondNumber);
        } else {
          firstNumber = displayValue;
        }

        sign = operator.textContent;
        calculationSection.textContent = `${firstNumber}${sign}`;
        totalSection.textContent = "";
        break;
    }
  });
});

function reset() {
  calculationSection.textContent = "";
  totalSection.textContent = "";
  displayValue = 0;
  answer = 0;
}

equalBtn.addEventListener("click", () => {
  if (calculationSection.textContent) {
    answer = calculate(sign, firstNumber, displayValue);
    totalSection.textContent = answer;
    calculationSection.textContent = "";
  }
});

clearBtn.addEventListener("click", reset);
