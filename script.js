const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");
const specialChars = ["%","*","/","-","+","="];
let output = "";

//define function to calculate based on button click
const calculate = (btnValue) => {
    if(btnValue === "=" && btnValue !== "") {

        output = eval(output.replace("%", "/100"));
    }else if (btnValue === "AC") {
        output = ""
    }
    display.value = output;

};

//Add event
buttons.forEach((button) => {
button.addEventListener("click", (e)=> calculate(e.target.dataset.value));


});