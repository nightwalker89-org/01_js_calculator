let expression = "";

function insert(char) {
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
  try {
    let result = eval(expression);
    document.getElementById("result").value = result;
    expression = "";
  } catch (error) {
    document.getElementById("result").value = "Error";
  }
}