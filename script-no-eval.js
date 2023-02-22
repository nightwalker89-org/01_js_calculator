let expression = "";

function insert(char) {
  if (char === "+" || char === "-" || char === "*" || char === "/") {
    if (expression.slice(-1) === "+" || expression.slice(-1) === "-" || expression.slice(-1) === "*" || expression.slice(-1) === "/") {
      expression = expression.slice(0, -1);
    }
  }
  expression += char;
  document.getElementById("result").value = expression;
}

function clearResult() {
  expression = "";
  document.getElementById("result").value = "";
}

function backspace() {
  expression = expression.slice(0, -1);
  document.getElementById("result").value = expression;
}

function calculate() {
  let result;
  try {
    result = evaluate(expression);
    document.getElementById("result").value = result;
  } catch (error) {
    document.getElementById("result").value = "Error";
  }
  expression = result ? result.toString() : "";
}

function evaluate(expression) {
  let operators = [],
    operands = [],
    currentOperand = "";
  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];
    if (char === "+" || char === "-" || char === "*" || char === "/") {
      if (currentOperand !== "") {
        operands.push(parseFloat(currentOperand));
        currentOperand = "";
      }
      operators.push(char);
    } else {
      currentOperand += char;
    }
  }
  if (currentOperand !== "") {
    operands.push(parseFloat(currentOperand));
  }
  let result;
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "*" || operators[i] === "/") {
      let op1 = operands[i];
      let op2 = operands[i + 1];
      let operator = operators[i];
      let partialResult = operator === "*" ? op1 * op2 : op1 / op2;
      operands.splice(i, 2, partialResult);
      operators.splice(i, 1);
      i--;
    }
  }
  result = operands[0];
  for (let i = 0; i < operators.length; i++) {
    let operator = operators[i];
    let operand = operands[i + 1];
    if (operator === "+") {
      result += operand;
    } else {
      result -= operand;
    }
  }
  return result;
}