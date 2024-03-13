document.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector(".display");
    const operationDisplay = document.querySelector(".operation-display");
    const resultDisplay = document.querySelector(".result-display");
    const buttons = document.querySelectorAll(".button");
    const specialChars = ["%", "*", "/", "-", "+", "="];
    let operationText = "";
    let output = "";

    const calculate = (btnValue) => {
        if (btnValue === "=" && output !== "") {
            output = eval(output.replace("%", "/100"));
            operationText = display.value + " = " + output;
            operationDisplay.textContent = operationText;
            resultDisplay.textContent = output;
        } else if (btnValue === "AC") {
            output = "";
            operationText = "";
            operationDisplay.textContent = "";
            resultDisplay.textContent = "";
        } else if (btnValue === "DEL") {
            output = output.toString().slice(0, -1);
        } else {
            if (output === "" && specialChars.includes(btnValue)) return;
            output += btnValue;
        }

        display.value = output;
    };

    buttons.forEach((button) => {
        button.addEventListener("click", (e) => calculate(e.target.dataset.value));
    });
});
