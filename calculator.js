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
const divideByZeroMsg = "no!"

function operate(num1, num2, operand) {
	if (isNaN(num1) || isNaN(num2)) {return false}

  switch (operand) {
    case "+":
      return add(+num1, +num2);
    case "-":
      return subtract(+num1, +num2);
    case "/":
			if (num2 == 0) {return divideByZeroMsg}
      return parseFloat(divide(+num1, +num2).toFixed(5));
    case "*":
      return multiply(+num1, +num2);
  }
}

function display(toDisplay) {
  document.getElementById("display").innerText = toDisplay;
}

function clear() {
  document.getElementById("display").innerText = "";
	//enable decimal button
}

function numberPress(buttPressed) {
  let textToDisplay = document.getElementById("display").innerText;

	if (textToDisplay.includes(divideByZeroMsg)) {
		clear();
		textToDisplay = document.getElementById("display").innerText;
	}
	
  textToDisplay += buttPressed.innerText;
  display(textToDisplay);
}

function equals() {

	let displayText = document.getElementById("display").innerText;
	let operand;
	let numbers;
	let result = displayText

	for (const operands of operandsList) {
		let opIndex = displayText.indexOf(operands);

		// check for negative numbers
		if (opIndex != -1 
			&& opIndex != 0 
			&& !isNaN(+displayText[opIndex - 1])) {

			operand = operands
			numbers = displayText.split(operand)

			// if user pressed equals after only entering a num and / or *...
			if ((operands == "*" || operands == "/") && (displayText.charAt(opIndex) 
			== displayText.charAt(displayText.length-1))) {
				numbers[1] = 1
			}

			result = operate(numbers[0], numbers[1], operand)
			break
		}
	}

	display(result)
}

function identifyNumbers() {
	let displayText = document.getElementById("display").innerText;

	// split by operand if one exists
	for (const operands of operandsList) {
		let opIndex = displayText.indexOf(operands);

		// don't trigger on negative numbers
		if (opIndex != -1 
				&& opIndex != 0 
				&& !isNaN(+displayText[opIndex - 1])) {

			let operand = operands
			numbers = Array.from(displayText.split(operand))
			return numbers
		}
	}

function operandPress(buttPressed) {
  let operandText = buttPressed.innerText;
  let displayText = document.getElementById("display").innerText;

	let includesAnOperand = operandsList.some(operand => displayText.includes(operand))

	if (displayText == divideByZeroMsg) {
		clear()
	} else if (includesAnOperand) {
		equals(operandText)
		numberPress(buttPressed)
	} else if (displayText.charAt(displayText.length-1) == ".") {
		displayText += "0"
		display(displayText)
		numberPress(buttPressed)
	}	else if (displayText.length != 0) {
		numberPress(buttPressed)
	} 
}

function decimal() {
	let displayText = document.getElementById("display").innerText;
	let lastChar = displayText.charAt(displayText.length-1)
	let currNumber = identifyNumbers()[-1]


	console.log(lastChar)

	if (!isNaN(lastChar) && !currNumber.includes('.')) {
		display(displayText += '.')
		// disable decimal button
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

const decimalButton = document.getElementById("decimalButton")
decimalButton.addEventListener("click", decimal)

