
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

function display(text) {
	
};

console.log("add: " + add(1, 2))
console.log("subtract: " + subtract(1, 2))
console.log("divide: " + divide(1, 5))
console.log("multiply: " + multiply(1, 2))

const midButCont = document.querySelector('#middleButtonsContainer')
const midButsArray = Array.from(midButCont.childNodes)
midButsArray.forEach(button => button.className = 'middleButton')

const sideButCont = document.querySelector('#sideButtonsContainer')
const sideButsArray = Array.from(sideButCont.childNodes)
sideButsArray.forEach(button => button.className = 'sideButton')

