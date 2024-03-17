document.addEventListener("DOMContentLoaded", () => {
    const displayOperation = document.querySelector(".display-operation");
    const displayResult = document.querySelector(".display-result");
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".buttons button");

    let currentOperation = "";
    let currentResult = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const btnValue = button.dataset.value;

            if (btnValue === "=") {
                displayOperation.value = currentOperation;
                currentResult = evaluateExpression(currentOperation);
                displayResult.value = currentResult;
                display.value = currentResult; // Afficher le résultat final dans le champ display
            } else if (btnValue === "AC") {
                currentOperation = "";
                currentResult = "";
                displayOperation.value = "";
                displayResult.value = "";
                display.value = ""; // Effacer le champ display
            } else if (btnValue === "DEL") {
                currentOperation = currentOperation.slice(0, -1);
                displayOperation.value = currentOperation;
            } else {
                currentOperation += btnValue;
                displayOperation.value = currentOperation;
            }
        });
    });

    const evaluateExpression = (expression) => {
        try {
            let sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
            return new Function('return ' + sanitizedExpression)();
        } catch (error) {
            return "Error";
        }
    };
});
