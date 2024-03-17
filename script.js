document.addEventListener("DOMContentLoaded", () => {
    const displayOperation = document.querySelector(".display-operation");
    const displayResult = document.querySelector(".display-result");
    const buttons = document.querySelectorAll(".buttons button");

    let currentOperation = ""; // Opération en cours
    let lastOperator = null; // Dernier opérateur utilisé

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const btnValue = button.dataset.value;

            if (btnValue === "AC") {
                clearCalculator();
            } else if (btnValue === "DEL") {
                handleDelete();
            } else if (btnValue === "=") {
                handleEqual();
            } else if (isOperator(btnValue)) {
                handleOperator(btnValue);
            } else {
                currentOperation += btnValue;
                updateDisplayOperation();
            }
        });
    });

    const handleDelete = () => {
        currentOperation = currentOperation.slice(0, -1);
        updateDisplayOperation();
    };

    const handleEqual = () => {
        if (lastOperator !== null && currentOperation !== "") {
            let result = evaluateExpression(currentOperation);
            displayResult.value = result;
            currentOperation = result.toString();
            lastOperator = null;
            updateDisplayOperation();
        }
    };

    const handleOperator = (operator) => {
        if (currentOperation !== "") {
            if (lastOperator !== null) {
                handleEqual(); // Calcule le résultat avant d'ajouter le nouvel opérateur
            }
            currentOperation += operator;
            lastOperator = operator;
            updateDisplayOperation();
        }
    };

    const clearCalculator = () => {
        currentOperation = "";
        lastOperator = null;
        updateDisplayOperation();
        displayResult.value = "";
    };

    const updateDisplayOperation = () => {
        displayOperation.value = currentOperation;
    };

    const evaluateExpression = (expression) => {
        try {
            let sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
            return new Function('return ' + sanitizedExpression)();
        } catch (error) {
            return "Error";
        }
    };

    const isOperator = (value) => {
        return value === "+" || value === "-" || value === "*" || value === "/";
    };
});
