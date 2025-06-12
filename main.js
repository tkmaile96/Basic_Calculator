var newLine = true;
var value1;
var currentOperator;
var hasDecimal = false;

// digital button event handler
function digitalBtnPressed(button) {
    if (newLine) {
        document.getElementById("input-box").value = button;
        newLine = false;
        hasDecimal = false;
    } else {
        var currentValue = document.getElementById("input-box").value;
        document.getElementById("input-box").value = currentValue + button;
    }
}

// AC button event handler
function AcBtnPressed() {
    document.getElementById("input-box").value = "0";
    newLine = true;
    hasDecimal = false;
    value1 = undefined;
    currentOperator = undefined;
}

// Operator button event handler
function operatorBtnPressed(operator) {
    currentOperator = operator;
    value1 = parseFloat(document.getElementById("input-box").value);
    newLine = true;
    hasDecimal = false;
}

// Equals button event handler
function equalBtnPressed() {
    if (currentOperator && value1 !== undefined) {
        var value2 = parseFloat(document.getElementById("input-box").value);
        var result;
        
        switch(currentOperator) {
            case "+":
                result = value1 + value2;
                break;
            case "-":
                result = value1 - value2;
                break;
            case "x":
                result = value1 * value2;
                break;
            case "/":
                result = value1 / value2;
                break;
            default:
                result = value2;
        }
        
        document.getElementById("input-box").value = result.toString();
        newLine = true;
        hasDecimal = document.getElementById("input-box").value.includes('.');
        value1 = undefined;
        currentOperator = undefined;
    }
}

// Percentage button event handler
function percentageBtnPressed() {
    var currentValue = parseFloat(document.getElementById("input-box").value);
    document.getElementById("input-box").value = (currentValue / 100).toString();
    newLine = true;
    hasDecimal = document.getElementById("input-box").value.includes('.');
}

// Plus/Minus button event handler
function plusMinusBtnPressed() {
    var currentValue = document.getElementById("input-box").value;
    if (currentValue !== "0") {
        if (currentValue.charAt(0) === '-') {
            document.getElementById("input-box").value = currentValue.substring(1);
        } else {
            document.getElementById("input-box").value = '-' + currentValue;
        }
    }
}

// Comma (decimal point) button event handler
function comaBtnPressed() {
    if (newLine) {
        document.getElementById("input-box").value = "0.";
        newLine = false;
        hasDecimal = true;
    } else if (!hasDecimal) {
        var currentValue = document.getElementById("input-box").value;
        document.getElementById("input-box").value = currentValue + ".";
        hasDecimal = true;
    }
}

// Helper function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', 'x', '/'].includes(char);
}