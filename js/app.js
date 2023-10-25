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

function updateDisplayValue(e) {
  totalSection.textContent += this.textContent;
  displayValue = Number(totalSection.textContent);
}
function updateKeyDisplayValue(e) {
  if (Number(e.key) || e.key === "0") {
    totalSection.textContent += Number(e.key);
    displayValue = Number(totalSection.textContent);
  }
}

function reset() {
  calculationSection.textContent = "";
  totalSection.textContent = "";
  displayValue = 0;
  answer = 0;
}

function equalise() {
  if (calculationSection.textContent) {
    answer = calculate(sign, firstNumber, displayValue);
    totalSection.textContent = answer;
    calculationSection.textContent = "";
  }
}

function operate() {
  console.log(
    `firstNumber:${firstNumber} answer:${answer} displayValue:${displayValue}`
  );
  if (calculate.textContent && totalSection.textContent) {
    equalise();
  } else if (answer !== 0) {
    firstNumber = Number(totalSection.textContent);
  } else if (calculationSection.textContent !== "") {
    secondNumber = displayValue;
    firstNumber = calculate(sign, firstNumber, secondNumber);
  } else {
    firstNumber = displayValue;
  }
}

for (let i = 0; i < numbersBtn.length; i++) {
  numbersBtn[i].addEventListener("click", updateDisplayValue);
}
document.addEventListener("keydown", updateKeyDisplayValue);

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    switch (operator.textContent) {
      case "+":
      case "−":
      case "×":
      case "÷":
        operate();
        sign = operator.textContent;
        calculationSection.textContent = `${firstNumber}${sign}`;
        totalSection.textContent = "";
        break;
    }
  });
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "+":
    case "-":
    case "/":
    case "*":
      operate();
      sign = e.key;
      calculationSection.textContent = `${firstNumber}${sign}`;
      totalSection.textContent = "";
      break;
    case "Enter":
      equalise();
      break;
  }
});

equalBtn.addEventListener("click", equalise);
clearBtn.addEventListener("click", reset);
