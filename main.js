var newLine = true;

function digitalBtnPressed(button){
    if(newLine) {
        document.getElementById("input-box").value = button;
        newLine = false;
    } else {
        var currentValue = document.getElementById("input-box").value;
        document.getElementById("input-box").value = currentValue + button;
    }
}

function AcBtnPressed(){
    document.getElementById("input-box").value = 0;
    newLine = true;
}