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

const operandsList = ["+", "-", "*", "/"]
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

function identifyNumbers(calcString, operandInText = null) {
	// let numbers;

	let numList = [];

	if (operandInText) {

		let currNum = "";

		for (let charIndex in calcString) {

			let char = calcString[charIndex];
			let nextChar = calcString[+charIndex + 1];
			let lastChar = calcString[+charIndex - 1];

			let charIsNum = !Number.isNaN(parseFloat(char));
			let nextCharIsNum = !Number.isNaN(parseFloat(nextChar));
			let lastCharIsNum = !Number.isNaN(parseFloat(lastChar));

			let charIsOperand = !charIsNum && lastCharIsNum && nextCharIsNum;
			let operandFollowedByNeg = !charIsNum && !nextCharIsNum;
			let negFollowingOperand = char == "-" && !lastCharIsNum && nextCharIsNum;
			
			if (charIsOperand || operandFollowedByNeg) {
				currNum = "";
			} else if (negFollowingOperand) {
				currNum = currNum.concat(char);
			} else if (charIsNum && nextCharIsNum) {
				currNum = currNum.concat(char);
			} else if (charIsNum) {
				currNum = currNum.concat(char);
				numList.push(currNum);
				currNum = "";
			}
		}

	} else {
		numList = [calcString]
	}

	return numList
}

function identifyOperand(calcString) {
	let includesAnOperand = operandsList.some(operand => calcString.includes(operand))

	// Negative num identifying minuses may be removed from this var 
	// 	during minus handling process.
	let calcStringIter = calcString

	// minus handling
	if (includesAnOperand && calcString.includes("-")) {

		let minusCount = 0;
		for (const char of calcString) {
			if (char == "-") {minusCount++}
		}

		// for each minus symbol found in equation,
		// check if first minus in string is after a number
		// if not, then remove that minus

		for (let i = minusCount; i > 0; i--) {

			let minusIndex = calcStringIter.indexOf("-");
			let charBeforeMinus = calcStringIter.charAt(minusIndex - 1);
			let charBeforeIsNan = Number.isNaN(parseFloat(charBeforeMinus))

			if (!charBeforeIsNan) {
				return "-"
			} else {
				calcStringIter = calcStringIter.replace("-", "")
			}
		}
	} 
	
	if (includesAnOperand) {
		let operandInText;

		for (let i = 0; i != operandsList.length; i++) {
			if (calcStringIter.includes(operandsList[i])) {
				operandInText = operandsList[i]
			}
		}

		return operandInText
	}

	// no operand found
	return null
}

function identifyEquation(calcString) {
	let operand = identifyOperand(calcString, operandsList);
	let numbers = identifyNumbers(calcString, operand);

	if (operand && numbers.length == 2) {
		return true
	} else {
		return false
	}
}

function equals() {
	let displayText = document.getElementById("display").innerText
	let equationExists = identifyEquation(displayText)
	
	if (!equationExists) {
		display(displayText)
	} else {
		let operand = identifyOperand(displayText)
		let numbers = identifyNumbers(displayText, operand)
		display(operate(numbers[0], numbers[1], operand))
	}
}

function operandPress(buttPressed) {

  let displayText = document.getElementById("display").innerText;
	
	if (displayText == divideByZeroMsg) {
		clear()
		return
	}

	let currOperand = buttPressed.innerText;
	let minus = currOperand == "-";
	
	let prevChar = displayText.charAt(displayText.length - 1);
	let prevCharIsOp = operandsList.some(operand => operand == currOperand);
	let prevCharIsNum = !Number.isNaN(parseFloat(prevChar));
	let isFirstChar = displayText.length = 0;
	let afterOperand = identifyOperand(displayText, operandsList);
	let afterEquation = identifyEquation(displayText, operandsList);
	function tripleOperandCheck() {
		if (displayText.length > 2) {
			let lastTwoChars = displayText.slice(-2).split('')
			const isOperand = (character) => operandsList.some(operand => character == operand)
			return lastTwoChars.every(isOperand)
		}
	}
	let tripleOperand = tripleOperandCheck()

	let minusFirstChar = isFirstChar && minus;
	let isOperator = prevCharIsNum && !afterEquation;
	let minusAfterOp = minus && prevCharIsOp && !tripleOperand && !afterEquation;
	let secondOperator = prevCharIsNum && afterEquation;

	let normalValidPress = minusFirstChar || isOperator || minusAfterOp;

	if (displayText == divideByZeroMsg) {
		clear()
		console.log('clear message')
	} else if (normalValidPress) {
		numberPress(buttPressed)
		console.log('normal valid press')
	} else if (secondOperator) {
		let numbers = identifyNumbers(displayText, currOperand);
		let result = operate(numbers[0], numbers[1], identifyOperand(displayText, operandsList));
		display(result + currOperand)
		console.log('second operator')
	} else if (tripleOperand) {
		console.log('triple operand')
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

