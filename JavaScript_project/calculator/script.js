let prevNumber = "";
let calculationOperator = "";
let currentNumber = "0";


const calculatorScreen = document.querySelector(".calculator-screen");
function updateScreen(number) {

  calculatorScreen.value = number;
}


const numbers = document.querySelectorAll(".number");
numbers.forEach(function (number) {
 
  number.addEventListener("click", function (event) {
 
    inputNumber(event.target.value);
    updateScreen(currentNumber);
  });
});


function inputNumber(number) {
  if (currentNumber === "0") {

    currentNumber = number;
  } else {
    currentNumber += number;
  }
}

const operators = document.querySelectorAll(".operator");
operators.forEach(function (operator) {
  operator.addEventListener("click", function (event) {
    inputOperator(event.target.value);
  });
});


function inputOperator(operator) {
  if (calculationOperator === "") {
    prevNumber = currentNumber;
  }
  calculationOperator = operator;
  currentNumber = "0";
}


const equalSign = document.querySelector(".equal-sign");
equalSign.addEventListener("click", function () {
  calculate(); 
  updateScreen(currentNumber);
});


function calculate() {
  let result = ""; 
  switch (calculationOperator) {
    case "+":
      result = parseFloat(prevNumber) + parseFloat(currentNumber); 
      break;
    case "-":
      result = parseFloat(prevNumber) - parseFloat(currentNumber);
      break;
    case "*":
      result = parseFloat(prevNumber) * parseFloat(currentNumber);
      break;
    case "/":
      result = parseFloat(prevNumber) / parseFloat(currentNumber);
      break;
    default:
      break;
  }
  currentNumber = result;
  calculationOperator = "";
}


function clearAll() {
  prevNumber = "";
  calculationOperator = "";
  currentNumber = "0";
}


const clearBtn = document.querySelector(".all-clear");
clearBtn.addEventListener("click", function () {
  clearAll(); 
  updateScreen(currentNumber);
});


const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", function (event) {

  inputDecimal(event.target.value);
  updateScreen(currentNumber);
});

inputDecimal = function (dot) {
  if (currentNumber.includes(".")) {
    return;
  }
  currentNumber += dot;
};


const percentage = document.querySelector(".percentage");
percentage.addEventListener("click", function (event) {
  inputPercentage(event.target.value);
  updateScreen(currentNumber);
});


inputPercentage = function (percentage) {
  if (currentNumber.includes("%")) {
    return;
  }
  currentNumber = currentNumber / 100;
};