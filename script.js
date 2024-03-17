const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// Fonction pour calculer le résultat en fonction du clic sur le bouton
const calculate = (btnValue) => {
    if (btnValue === "=" && output !== "") {
        output = evaluateExpression(output.replace("%", "/100"));
    } else if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL") {
        output = output.toString().slice(0, -1);
    } else {
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }

    display.value = output;
};

// Fonction pour évaluer une expression arithmétique
const evaluateExpression = (expression) => {
    const operators = ["+", "-", "*", "/"];
    const numbers = expression.split(/\+|-|\*|\//).map(Number);
    const operands = expression.split('').filter(char => operators.includes(char));

    let result = numbers[0];
    for (let i = 0; i < operands.length; i++) {
        const operator = operands[i];
        const operand = numbers[i + 1];
        switch (operator) {
            case '+':
                result += operand;
                break;
            case '-':
                result -= operand;
                break;
            case '*':
                result *= operand;
                break;
            case '/':
                result /= operand;
                break;
            default:
                break;
        }
    }

    return result;
};

// Ajouter un événement pour chaque bouton
buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
