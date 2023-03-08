const operandsList = ["+", "-", "*", "/"];
const divideByZeroMsg = "no!";
const disableClass = "disabled";

let allButtons = document.querySelectorAll('button');
allButtons = Array.from(allButtons);

const operandButs = document.querySelectorAll(".operand");
const operandButsArray = Array.from(operandButs);

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

function operate(num1, num2, operand) {
	if (isNaN(num1) || isNaN(num2)) {return false}

  switch (operand) {
    case "+":
      return Math.round(add(+num1, +num2) * 100) / 100;
    case "-":
      return Math.round(subtract(+num1, +num2) * 100) / 100;
    case "/":
			if (num2 == 0) {return divideByZeroMsg}
      return Math.round(divide(+num1, +num2) * 100) / 100;
    case "*":
      return Math.round(multiply(+num1, +num2) * 100) / 100;
  }
}

function display(toDisplay) {
  document.getElementById("display").innerText = toDisplay;
}

function clear() {
  document.getElementById("display").innerText = "";
	buttDisabler()
}

function identifyNumbers(calcString) {
	// let numbers;

	let operandInText = identifyOperand(calcString)

	let numList = [];
	let currNum = "";

	for (let charIndex in calcString) {
		// identify characters for evaluation
		let char = calcString[charIndex];
		let nextChar = calcString[+charIndex + 1];
		let lastChar = calcString[+charIndex - 1];

		// evaluate characters as num
		let charIsNum = !Number.isNaN(parseFloat(char)) || char == ".";
		let nextCharIsNum = !Number.isNaN(parseFloat(nextChar)) || nextChar == ".";
		let lastCharIsNum = !Number.isNaN(parseFloat(lastChar)) || lastChar == ".";

		let charIsNegMinus = !lastCharIsNum && nextCharIsNum

		let num = charIsNum || charIsNegMinus

		// evaluate character as operand
		let nanBetweenNums = lastCharIsNum && !charIsNum && nextCharIsNum;
		let currNanNextNan = !charIsNum && !nextCharIsNum;

		let charIsOperand = nanBetweenNums || currNanNextNan;	
		// conditionals

		if (charIsOperand) {
			numList.push(currNum)
			currNum = "";
		} else if (num) {
			currNum = currNum.concat(char);
		} else {
			console.log("something went wrong")
		}
	}

	numList.push(currNum)
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
	let numbers = identifyNumbers(calcString);

	if (operand && numbers.length == 2) {
		return true
	} else {
		return false
	}
}

function buttToggler(buttonTogg, classTogg = disableClass) {
	buttonTogg.classList.toggle(classTogg)
	buttonTogg.toggleAttribute(classTogg)
}

function buttReset() {
	for (butt of allButtons) {
		if (butt.classList.contains(disableClass)) {
			buttToggler(butt, disableClass)
		}
	}
}

function buttDisabler() {
	buttReset()

	let displayText = document.getElementById("display").innerText;
	let numbers = identifyNumbers(displayText);
	let lastChar = displayText.charAt(displayText.length - 1);
	let charBeforeLast = displayText.charAt(displayText.length - 2)

	let emptyDisplay = displayText == "";
	let onlyMinus = displayText == "-";
	let oneNum = numbers.length == 1;
	let twoNums = numbers.length >= 2;
	let hangingOper = operandsList.some(operand => operand == lastChar)
	let operThenMinus = operandsList.some(operand => operand == charBeforeLast) && lastChar == "-"
	
	// decimal
	if (displayText.includes(".")) {

		let decimalButt = document.getElementById("decimalButton")

		if (numbers[0].includes(".") && !hangingOper) {
			buttToggler(decimalButt)
		} else if (numbers[1].includes(".")) {
			buttToggler(decimalButt)
		}
	}

	// equal
	if (!identifyEquation(displayText)) {
		buttToggler(document.getElementById("equalsButton"))
	}

	// operands

	if (emptyDisplay) {
		// only minus allowed
		for (butt of operandButsArray) {
			if (butt.innerText != "-") {
				buttToggler(butt, disableClass)
			}
		}

	} else if (onlyMinus || operThenMinus) {
		// none allowed
		for (butt of operandButsArray) {
			buttToggler(butt, disableClass)
		}

	} else if (hangingOper) {
		// all but present operand allowed
		// minus excepted
		let operand = lastChar

		for (butt of operandButsArray) {
			if (butt.innerText == operand && butt.innerText != "-") {
				buttToggler(butt, disableClass)
			}
		}

	}
}

function numberPress(buttPressed) {
  let textToDisplay = document.getElementById("display").innerText;

	if (textToDisplay.includes(divideByZeroMsg)) {
		clear();
		textToDisplay = document.getElementById("display").innerText;
	}
	
  textToDisplay += buttPressed.innerText;
  display(textToDisplay);
	buttDisabler()
}

function equals() {
	let displayText = document.getElementById("display").innerText
	let equationExists = identifyEquation(displayText)
	
	if (!equationExists) {
		display(displayText)
	} else {
		let operand = identifyOperand(displayText)
		let numbers = identifyNumbers(displayText)
		display(operate(numbers[0], numbers[1], operand))
	}

	buttDisabler()
}

function operandPress(buttPressed) {
	console.log("boop")

  let displayText = document.getElementById("display").innerText;
	
	if (displayText == divideByZeroMsg) {
		clear()
		return
	}

	let operandPressed = buttPressed.innerText
	let numbers = identifyNumbers(displayText)
	let lastChar = displayText.charAt(displayText.length - 1)
	let charBeforeLast = displayText.charAt(displayText.length - 2)

	let twoNums = numbers.length >= 2
	let hangingOper = operandsList.some(operand => operand == lastChar)
	let hangingDecimal = lastChar == "."
	let operThenMinus = operandsList.some(operand => operand == charBeforeLast) && lastChar == "-"

	if (hangingDecimal) {
		display(displayText + "0")
	}

	if (hangingOper && operandPressed == "-") {
		numberPress(buttPressed)
		buttDisabler()
		return
	}

	if (hangingOper) {
		display(displayText.replace(lastChar, operandPressed))
		buttDisabler()
		return
	}

	if (twoNums) {
		let operandForTwoNums = identifyOperand(displayText)
		display(operate(numbers[0], numbers[1], operandForTwoNums))
	}

	numberPress(buttPressed)
	buttDisabler()
}

function decimal() {
	console.log("boop")
	let displayText = document.getElementById("display").innerText;
	let lastChar = displayText.charAt(displayText.length-1)
	let numbers = identifyNumbers(displayText)
	currNumber = numbers[numbers.length - 1]

	console.log(numbers)

	let lastCharIsNum = !Number.isNaN(parseFloat(lastChar))
	let decimalInNum = currNumber.includes('.')

	if (decimalInNum) {return}

	if (lastCharIsNum) {
		display(displayText += '.')
	} else if (!lastCharIsNum) {
		display(displayText += '0.')
	}

	buttDisabler()
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

operandButsArray.forEach((operandBut) => {
  operandBut.addEventListener("click", operandPress.bind(null, operandBut));
});

const equalsButton = document.getElementById("equalsButton")
equalsButton.addEventListener("click", equals)

const decimalButton = document.getElementById("decimalButton")
decimalButton.addEventListener("click", decimal)

// Startup
buttDisabler()

