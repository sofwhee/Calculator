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

function identifyNumbers(calcString, operand = null) {
	let numbers;

	if (operand) {

		numbers = Array.from(calcString.split(operand))
		
		// if equal pressed with ex: "2+" "2-" "2/"... equal itself
		if (numbers.length == 1 && (operand == "+" || operand == "-")) {
			numbers.push("0")
		} else if (numbers.length == 1 && (operand == "/" || operand == "*")) {
			numbers.push("1")
		}

	} else if (!operand) {
		numbers = [calcString]
	}

	return numbers
}

console.log(identifyNumbers("4-4", operandsList))

function identifyOperand(calcString, validOperands) {
	let includesAnOperand = validOperands.some(operand => calcString.includes(operand))

	if (includesAnOperand && calcString.includes("-")) {
	
		let minusCount;

		for (const char of calcString) {
			if (char == "-") {minusCount++}
		}

		let calcStringIter = calcString

		for (let i = minusCount; i > 0; i--) {
	
			let charBeforeIsNan = isNaN(calcStringIter.charAt(calcStringIter.indexOf("-")));

			if (!charBeforeIsNan) {
				return "-"
			} else {
				calcStringIter = calcStringIter.replace("-", "")
			}

		}
	} 
	
	if (includesAnOperand) {
		let operandInText = validOperands.some(operand => {
			if (calcString.includes(operand)) {return operand}
		})
		return operandInText
	} else if (!includesAnOperand) {
		return null
	}
}

function identifyEquation(calcString, validOperands) {
	let operand = identifyOperand(calcString, validOperands);
	let numbers = identifyNumbers(calcString, operand);
	if (operand && numbers.length == 2) {
		return true
	} else {
		return false
	}
}

console.log(identifyEquation("4-4", operandsList))
console.log(identifyEquation("-4", operandsList))

function equals(calcString, validOperands) {
	let equationExists = identifyEquation(calcString, validOperands)
	
	if (!equationExists) {
		display(calcString)
	} else {
		let numbers = identifyNumbers(calcString, validOperands)
		let operand = identifyOperand(calcString, validOperands)
		display(operate(numbers[0], numbers[1], operand))
	}
}

function operandPress(buttPressed) {
  let operandText = buttPressed.innerText;
  let displayText = document.getElementById("display").innerText;

	let includesAnOperand = operandsList.some(operand => displayText.includes(operand))

	if (displayText == divideByZeroMsg) {
		clear()
	}
}

	// } else if (operandText == "-") { // handle negatives...
	// 	firstEntry = displayText.length == 0
	// 	doubleMinusAtStart = displayText.length == 1 && displayText.charAt(0) == "-"
	// 	tripleMinus = displayText.slice(-2) == "--"

	// 	if (displayText.length == 0) {
	// 		numberPress(buttPressed)
	// 	} else if (!doubleMinusAtStart && !tripleMinus) {
	// 		numberPress(buttPressed)
	// 	}

		// equationExists = 
		
		// doubleMinusAtStart = displayText.length > 1 && displayText.charAt(0) == "-"
		// tripleMinus = displayText.slice(displayText.length-2, displayText.length-1) == "--"
		// minusAtEnd = identifyNumbers().length > 1

		// console.log(doubleMinusAtStart + " " + tripleMinus + " " + minusAtEnd)

		// if (doubleMinusAtStart || tripleMinus) {
		// 	console.log("invalid minus")
		// 	return // do nothing if invalid "-"
		// } else if (minusAtEnd) {
		// 	equals(operandText)

		// }

		// minusAtStart = displayText.length == 1 && displayText == "-"

		// if (minusAtStart) {
		// 	return
		// }

		// numberPress(buttPressed)
		
	// } else if (includesAnOperand && displayText.charAt(displayText.length-1) != "-") {
	// 	equals(operandText)
	// 	numberPress(buttPressed) 
	// } else if (displayText.charAt(displayText.length-1) == ".") {
	// 	displayText += "0"
	// 	display(displayText)
	// 	numberPress(buttPressed)
	// }	else if (displayText.length == 1 && displayText.charAt(displayText.length-1) == "-") {
	// 	return
	// } else if (displayText.length != 0) {
	// 	numberPress(buttPressed)
	// }


function decimal() {
	let displayText = document.getElementById("display").innerText;
	let lastChar = displayText.charAt(displayText.length-1)
	let currNumber = identifyNumbers()
	currNumber = currNumber[currNumber.length - 1]

	console.log(currNumber)

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

