const btn = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");
const clearBtn = document.querySelector(".clear_all");
const divideBtn = document.querySelector(".division");
const multiplyBtn = document.querySelector(".multiplication");
const minusBtn = document.querySelector(".subtraction");
const plusBtn = document.querySelector(".addition");
const equalBtn = document.querySelector(".equals");
const calculationSection = document.querySelector(".calculation_section");
const total_section = document.querySelector(".total_section");

btn.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "AC") {
      total_section.textContent = "";
      calculationSection.textContent = "";
    } else if (button.textContent === "•") {
      total_section.textContent += ".";
    } else if (
      button.textContent !== "Ans" &&
      button.textContent !== "±" &&
      button.textContent !== "x²" &&
      button.textContent !== "x!" &&
      button.textContent !== "." &&
      button.textContent !== "%" &&
      button.textContent !== "(" &&
      button.textContent !== ")"
    ) {
      total_section.textContent += button.textContent;
    }
  });
});
