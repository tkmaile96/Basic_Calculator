var newLine = true;
var value1;
var currentOperator;
var hasDecimal = false;
var openParentheses = 0;

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
    openParentheses = 0;
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
    var expression = document.getElementById("input-box").value;
    
    // Add missing closing parentheses
    while (openParentheses > 0) {
        expression += ")";
        openParentheses--;
    }
    
    // Handle implicit multiplication
    expression = expression.replace(/(\d)\(/g, '$1*(')
                          .replace(/\)(\d)/g, ')*$1')
                          .replace(/\)\(/g, ')*(');
    
    try {
        // Replace × with * for evaluation
        var evalExpression = expression.replace(/x/g, '*');
        var result = eval(evalExpression);
        
        if (!isFinite(result)) {
            document.getElementById("input-box").value = "Error";
        } else {
            document.getElementById("input-box").value = result.toString();
        }
        
        newLine = true;
        hasDecimal = document.getElementById("input-box").value.includes('.');
        value1 = undefined;
        currentOperator = undefined;
        openParentheses = 0;
    } catch (e) {
        document.getElementById("input-box").value = "Error";
        newLine = true;
        openParentheses = 0;
    }
}

// Brackets button event handler
function brackectsBtnPressed() {
    var currentValue = document.getElementById("input-box").value;
    var lastChar = currentValue.slice(-1);
    
    if (newLine || currentValue === "0") {
        document.getElementById("input-box").value = "(";
        openParentheses++;
        newLine = false;
    } else if (lastChar === "(" || isOperator(lastChar)) {
        document.getElementById("input-box").value = currentValue + "(";
        openParentheses++;
    } else if (/\d/.test(lastChar) || lastChar === ")") {
        if (openParentheses > 0 && lastChar !== "(") {
            document.getElementById("input-box").value = currentValue + ")";
            openParentheses--;
        } else {
            document.getElementById("input-box").value = currentValue + "*(";
            openParentheses++;
        }
    } else {
        document.getElementById("input-box").value = currentValue + "(";
        openParentheses++;
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
        var lastChar = currentValue.slice(-1);
        
        if (isOperator(lastChar) || lastChar === "(") {
            document.getElementById("input-box").value = currentValue + "0.";
        } else {
            document.getElementById("input-box").value = currentValue + ".";
        }
        hasDecimal = true;
    }
}

// Helper function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', 'x', '/'].includes(char);
}