"use strict";

const elements = {
  numbersBtn: document.querySelectorAll(".num"),
  operators: document.querySelectorAll(".operators"),
  clearBtn: document.querySelector(".clear_all"),
  equalBtn: document.querySelector(".equals"),
  calculationSection: document.querySelector(".calculation_section"),
  totalSection: document.querySelector(".total_section"),
  deleteBtn: document.querySelector(".delete"),
};

let firstNumber = null;
let secondNumber = null;
let previousCalculation = null;
let operator = null;

// -------------------- Functions ---------------------

function updatefirstNumber(value) {
  elements.totalSection.textContent += value;
  firstNumber = parseFloat(elements.totalSection.textContent);
}

function operate() {
  operator = this.textContent;

  if (elements.calculationSection.textContent === "" && !previousCalculation) {
    secondNumber = firstNumber;
  } else if (
    elements.totalSection.textContent !== "" &&
    elements.calculationSection.textContent !== ""
  ) {
    secondNumber = calculate(operator, secondNumber, firstNumber);
  } else if (firstNumber !== secondNumber) {
    secondNumber = parseFloat(elements.totalSection.textContent);
  } else if (operator) {
    secondNumber = calculate(operator, secondNumber, firstNumber);
  }

  elements.calculationSection.textContent = `${secondNumber} ${operator}`;
  elements.totalSection.textContent = "";
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

function deleteLast() {
  elements.totalSection.textContent = elements.totalSection.textContent.slice(
    0,
    -1
  );
}

function reset() {
  elements.calculationSection.textContent = "";
  elements.totalSection.textContent = "";
  firstNumber = null;
  secondNumber = null;
  previousCalculation = null;
  operator = null;
}
function equalise() {
  if (elements.totalSection.textContent !== "") {
    const result = calculate(operator, secondNumber, firstNumber);
    elements.totalSection.textContent = result;
    elements.calculationSection.textContent = "";
    previousCalculation = result;
    console.log("Equalising");
  }
}

// ----------------------------- Event Listeners ------------------------

elements.numbersBtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (elements.totalSection.textContent.length > 14) {
      return -1;
    } else {
      updatefirstNumber(button.textContent);
    }
  });
});

elements.operators.forEach((button) => {
  button.addEventListener("click", operate);
});

elements.equalBtn.addEventListener("click", equalise);
elements.deleteBtn.addEventListener("click", deleteLast);
elements.clearBtn.addEventListener("click", reset);

document.addEventListener("keydown", (e) => {
  if (elements.totalSection.textContent.length > 14) {
    return -1;
  } else {
    const key = e.key;
    if (/[0-9]/.test(key)) {
      updatefirstNumber(key);
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
    } else if (key === "Escape") {
      reset();
    } else if (key === "Backspace") {
      deleteLast();
    }
  }
});
