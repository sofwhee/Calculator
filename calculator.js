function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

const operandsList = ["+", "-", "*", "/"];

function operate(num1, num2, operand) {
  switch (operand) {
    case "+":
      return add(+num1, +num2);
    case "-":
      return subtract(+num1, +num2);
    case "/":
			if (num2 == 0) {return "very funny..."}
      return divide(+num1, +num2).toFixed(5);
    case "*":
      return multiply(+num1, +num2);
  }
}

function display(toDisplay) {
  document.getElementById("display").innerText = toDisplay;
}

function clear() {
  document.getElementById("display").innerText = "";
}

function numberPress(buttPressed) {
  let textToDisplay = document.getElementById("display").innerText;

	if (textToDisplay.includes("very funny...")) {
		clear();
		textToDisplay = document.getElementById("display").innerText;
	}
	
  textToDisplay += buttPressed.innerText;
  display(textToDisplay);
}

function operandPress(buttPressed) {
  let operandText = buttPressed.innerText;
  let displayText = document.getElementById("display").innerText;

	if (!displayText.includes(operandText)) {
		console.log("displaytext does not include the operand")
		numberPress(buttPressed)
	} else {
		console.log("displaytext does include the operand")
		equals()
		numberPress(buttPressed)
	}
}

function equals() {
	let displayText = document.getElementById("display").innerText;
	let operand

	operandsList.forEach(operandStr => {
		if (displayText.includes(operandStr)) {
			operand = operandStr
		}
	})

	if (operand) {
		const numbers = displayText.split(operand);
    const result = operate(numbers[0], numbers[1], operand);
		display(result)
  }
}

// Add and remove classes
const midButCont = document.querySelector("#middleButtonsContainer");
const midButsArray = Array.from(midButCont.childNodes);
midButsArray.forEach((button) => (button.className = "numberButton"));

document.getElementById("decimalButton").classList.remove("numberButton");
document.getElementById("equalsButton").classList.remove("numberButton");

const sideButCont = document.querySelector("#sideButtonsContainer");
const sideButsArray = Array.from(sideButCont.children);
sideButsArray.forEach((button) => button.classList.add("sideButton"));


// Apply eventlisteners to buttons.
const numberButs = document.querySelectorAll(".numberButton");
const numberButsArray = Array.from(numberButs);
numberButsArray.forEach((numberBut) => {
  numberBut.addEventListener("click", numberPress.bind(null, numberBut));
});

const clearBut = document.getElementById("clearButton");
clearBut.addEventListener("click", clear);

const operandButs = document.querySelectorAll(".operand");
const operandButsArray = Array.from(operandButs);
operandButsArray.forEach((operandBut) => {
  operandBut.addEventListener("click", operandPress.bind(null, operandBut));
});

const equalsButton = document.getElementById("equalsButton")
equalsButton.addEventListener("click", equals)

