/*
let runningTotal = 0;  //to keep track of previous number pressed
let buffer = "0"; //to show on screen
let previousOperator; //keeping track of previous action e.g +,*,/,-

const screen = document.querySelector(`.screen`); // screen is grab to keep tracking and calling the screen

function buttonClick(value) {
    if(isNaN(value)) {
        //this is not a number
        handleSymbol(value);  //this is use to seperate symbol from number
    }else{
        //this is a number
        handleNumber(value); // this is use to seperate number from symbol
    }
    screen.innerText = buffer; //to make it show on d screen just call the screen
}

function handleSymbol(symbol) {
switch (symbol) {
    case C:
        buffer = `0`;
        runningTotal = 0;
        break;
        case `=`:
            if (previousOperator === `null`){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperation = null;
            buffer = runningTotal;
            runningTotal = `0`;
            break;
        case `&plus;`:
        case `&times;`:
        case `&divide;`:
        case `-`:
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if(buffer === `0`){
        //do nothing
        return;
    }

const intBuffer = parseInt(buffer);
if(runningTotal === 0) {
    runningTotal = intBuffer;
} else {
    fleshOperation(intBuffer);
}
previousOperator = symbol;
 buffer = `0`;
}

function flushOperation(intBuffer) {
    if(previousOperator === `&plus`) {
        runningTotal += intBuffer;
    }else if(previousOperator === `-`) {
        runningTotal -= intBuffer; 
    }else if(previousOperator === `&times`){
        runningTotal *= intBuffer;
    }else {
        runningTotal /= intBuffer;
    }

    }
}

function handleNumber(numberString) {
    if(buffer === "0") {      // this is used to join seperate numbers we are pressing together e.g 7026......
        buffer = numberString;
    }else {
        buffer = buffer + numberString;
    }
    
}

function init() {     //for setting up the whole bunch of stuffs
    document.querySelector(`.calc-buttons`) //this is grabing the section which is the div where the buttons are stored in
    .addEventListener(`click`, function(event) {
        buttonClick(event.target.innerText); // this is grabbing the numbers and symbols in each button to perform this function 
    })
}

init();
*/

let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
}

init();