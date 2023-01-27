
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