'use strict'

let displayValue = '0';
let oldValue = '';
let operator = '';
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

// updating the display
const updateDisplay = function() {
    if (displayValue.length < 9) {
        display.textContent = displayValue;
    } else if (displayValue.length >= 9) {
        display.textContent = displayValue.substring(0,9)
    }
}

updateDisplay();

// Calculations
for (let i = 0; i <buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        if (buttons[i].classList.contains('digit')) {
            if (displayValue === '0') {
                displayValue = buttons[i].value;
                updateDisplay();
            } else if (operator != '') {
                displayValue += buttons[i].value;
                updateDisplay();
            } else {
                displayValue += buttons[i].value;
                updateDisplay();
            }
        } else if (buttons[i].classList.contains('ac')) {
            displayValue = '0';
            oldValue = '';
            operator = '';
            updateDisplay();
        } else if (buttons[i].classList.contains('operator')) {
            if (operator == '') {
                oldValue = displayValue;
                operator = buttons[i].value;
                displayValue = '';
            } else {
                displayValue = `${operate(parseFloat(oldValue), parseFloat(displayValue), operator)}`;
                operator = buttons[i].value;
                updateDisplay();
                oldValue = displayValue;
                displayValue = '';
            }
        } else if (buttons[i].classList.contains('equals') && oldValue != '' && operator != '') {
            displayValue = `${operate(parseFloat(oldValue), parseFloat(displayValue), operator)}`;
            operator = '';
            updateDisplay();
        } else if (buttons[i].classList.contains('decimal') && displayValue.indexOf('.') === -1) {
            displayValue += buttons[i].value;
            updateDisplay();
        }
    })
}

// Operations
const operate = (a, b, op) => {
    if (op === '+') {
        return a + b;
    } else if (op === '-') {
        return a - b;
    } else if (op === '*') {
        return a * b;
    } else if (op === '/') {
        if (b === 0) {
            return `error`;
        } else {
            return a / b;
        }
    }
}