var newLine = true;

function digitalBtnPressed(){
    if(newLine) {
        document.getElementById("input-box").value = button;
        newLine = false;
    } else {
        var currentValue = document.getElementById("input-box").value;
        document.getElementById("input-box").value = currentValue + button;
    }
}