
function add(num1, num2) {
	return num1 + num2;
};

function subtract(num1, num2) {
	return num1 - num2;
};

function divide(num1, num2) {
	return num1 / num2;
};

function multiply(num1, num2) {
  return num1 * num2;
};

function operate(num1, num2, operand) {
	switch(operand) {
		case "+":
			return add(num1, num2);
		case "-":
			return subtract(num1, num2);
		case "/":
			return divide(num1, num2);
		case "*":
			return multiply(num1, num2);
	}
};

function display(toDisplay) {
	// add conditionals to limit length of text...
	document.getElementById('display').innerText = toDisplay
};

const midButCont = document.querySelector('#middleButtonsContainer')
const midButsArray = Array.from(midButCont.childNodes)
midButsArray.forEach(button => button.className = 'numberButton')

document.getElementById('decimalButton').classList.remove('numberButton')
document.getElementById('decimalButton').classList.remove('numberButton')

const sideButCont = document.querySelector('#sideButtonsContainer')
const sideButsArray = Array.from(sideButCont.childNodes)
sideButsArray.forEach(button => button.className = 'sideButton')

// make number buttons put buttons on calculator
function numberPress(buttPressed) {
	textToDisplay = document.getElementById('display').innerText
	textToDisplay += buttPressed.innerText
	display(textToDisplay)
}

const numberButs = document.querySelectorAll('.numberButton')
const numberButsArray = Array.from(numberButs)
numberButsArray.forEach((numberBut) => {
	numberBut.addEventListener('click', numberPress.bind(null, numberBut))
})

// make clear button work
function clear() {
	document.getElementById('display').innerText = ""
}

const clearBut = document.getElementById('clearButton')
clearBut.addEventListener('click', clear)

// make operand buttons put operands on calculator

// make equals button execute operation in display

// make operand buttons automatically put through
// operation if doubled up in display

//