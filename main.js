var newLine = true;
var value1;
var currentOperator;
// digital button event handler
function digitalBtnPressed(button){
    if(newLine) {
        document.getElementById("input-box").value = button;
        newLine = false;
    } else {
        var currentValue = document.getElementById("input-box").value;
        document.getElementById("input-box").value = currentValue + button;
    }
}

// AC button event handler
function AcBtnPressed(){
    document.getElementById("input-box").value = 0;
    newLine = true;
}

// Operator button event handler
function operatorBtnPressed(operator){
    currentOperator = operator;
    value1 = parseInt(document.getElementById("input-box").value);
    newLine = true;
}