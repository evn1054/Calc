let a = ''; //fist number
let b = ''; //second number
let sign = ''; // sign of operation

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const actions = ['-', '+', '/', '*'];
const textOutPanel = document.getElementById('textOut');

//function for math operations
const mathOperations = (x, y, operator) => {
    let result;

    switch (operator) {
        case '+':
            return result = Number(x) + Number(y);

        case '-':            
            return result = Number(x) - Number(y);

        case '*':
            return result = Number(x) * Number(y);

        case '/':
            if (y === '0') {
                return new Error("Error")
                
            } else {
                return result = Number(x) / Number(y);
            
            }
    }

    return Number(parseFloat(result).toFixed(12));
}

const setValues = (x, y, operator) => {
    a = x;
    b = y;
    sign = operator;
}

updateTextOutPanel = (value) => {
    textOutPanel.value = value;
}

//screen cleaning function 
const clearAll = () => {
    setValues('', '', '');
    updateTextOutPanel('');
}

//sign change button
const changeSignBtn = (value) => {
    return value *= -1;
}

const setPersentValue = (x,y,operator) => {
    let result;

    switch (operator) {
        case '+':
            return result = Number(x) + Number(y)*Number(x)/100;

        case '-':            
            return result = Number(x) - Number(y)*Number(x)/100;

        case '*':
            return result = Number(y)*Number(x)/100;

        case '/':
            if (y === '0') {
                return new Error("Error")
                
            } else {
                return result = Number(x)/(Number(y)/100);
            
            }
    }

    
}


document.querySelector('.ac').addEventListener('click', clearAll);

document.querySelector('.buttons').addEventListener('click', (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('ac')) return;

    const key = event.target.textContent;
    updateTextOutPanel('');

    if (key == '+/-') {
        if (!b) {
            setValues(changeSignBtn(a), '', sign);
            updateTextOutPanel(a);
            checkOut();
        } else {
            setValues(a, changeSignBtn(b), sign);
            updateTextOutPanel(b);
            checkOut();
        }
    } 

    if (key == '%') {
        if (a && b && sign) {
            updateTextOutPanel(setPersentValue(a, b, sign));
            setValues('','','');
        } else {
            updateTextOutPanel('Error');
            setValues('','','');
        }

    }

    if (actions.includes(key)) {
        if (b) {
            const result = mathOperations(a, b, key);
            if (typeof result === 'number') {
                setValues(result, '', key); 
                updateTextOutPanel(result);
                checkOut();
            } else {
                clearAll();
                updateTextOutPanel(result.message);
                checkOut();
            
            }
        } else {
            setValues(a,'',key);
            updateTextOutPanel(`${a}${key}`);
            checkOut();
        }
    }


    if (digits.includes(key)) {
        if (!b && !sign) {
            if (a === '0' && key === '0') {    
                updateTextOutPanel('0') ;
                checkOut();
    
            } else {
                setValues(a+key, '', '');
                updateTextOutPanel(a);
                checkOut();


            }            
        }

        if (sign && a) {
            setValues(a, b+key, sign);
            updateTextOutPanel(b);
            checkOut();

            
        }                
    }
            

    if (key === '=') {
        const result = mathOperations(a, b, sign);

        if (typeof result === 'number') {
            setValues(result, '', '');
            updateTextOutPanel(a);
            checkOut();

        }
        else {
            clearAll();
            updateTextOutPanel('Error');
            checkOut();

        }

    }
} )
