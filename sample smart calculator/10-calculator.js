 let currentNumber = localStorage.getItem('currentNumber') || "";
 let previousNumber = localStorage.getItem('previousNumber') || "";
 let operator = localStorage.getItem('operator') || "";
 function addNumber(num) {
  if (previousNumber === ''){
      currentNumber += num;
      displayCalculation(currentNumber);
    }
    else {
      currentNumber += num;
      displayCalculation(previousNumber + operator + currentNumber);
    }
      // to store in local storage
      localStorage.setItem('currentNumber', currentNumber);
}
    
 function setOperator(op) {
  if (currentNumber === '') return;
      previousNumber = currentNumber;
      operator = op;
      displayCalculation(previousNumber + operator);
      // document.getElementById('js-display').innerHTML = previousNumber + operator;

      currentNumber = '';
      // to store in local storage
      localStorage.setItem('operator', operator);
  }

 function calculate() {
  if (currentNumber === '' || previousNumber === '' ) return;

      const num1 = 
      parseFloat(previousNumber);
      const num2 =
      parseFloat(currentNumber);
      let result;
      switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
             result = num1 - num2;
             break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
             result = num1 / num2;
             break;
        default:
            result = 'invalid operator';
    }
        currentNumber = result.toString();
        displayCalculation(currentNumber);
        operator = null;
        previousNumber = '';
  }

 function resetCalculation () {
        currentNumber = '';
        previousNumber = '';
        operator = null;
        localStorage.removeItem('curremtNumber');
        localStorage.removeItem('previousNumber');
        localStorage.removeItem('operator');
        // to remove form display
        displayCalculation('0');
  }

    function displayCalculation (value) {
        document.getElementById('js-display').innerHTML = value;
  }
function clearLast() {
   currentNumber = currentNumber.slice(0, -1);
  displayCalculation(currentNumber === '' ? '0' : currentNumber);
}

document.addEventListener('keydown', 
   (event) => {
    const key = event.key;
    if (key === 'Backspace') {
      //stop browsing from going back
      event.preventDefault();
      //call your clearLast() function
      clearLast();
    } else if (key === '+'){
      setOperator(key);
    }else if (key === '-' || key === '*' || key === '/') {
      setOperator(key);
    } else if (key === 'Enter' || key === '=') {
      calculate();
    } else if (key === 'Escape') {
      resetCalculation();
    } else if (!isNaN(key)) {
      addNumber(key);
    }
});
//function for activate cursor from mouse
function activateCursor() {
  document.getElementById('cursor').classList.add('blink').focus();
}
function deactivateCursor() {
  document.getElementById('cursor').classList.remove('blink');
}
