const operatorButtonList = Array.from(document.querySelectorAll('.btn'));
const operatorAttr = 'data-operator';

class Calculator {
    buttonList = Array.from(document.querySelectorAll('.btn'));
    resultElement = document.querySelector('.calculator-result');
    numeralList = this.buttonList.filter(e => !e.hasAttribute(operatorAttr));
    operatorList = this.buttonList.filter(e => e.hasAttribute(operatorAttr));
    
    operators = {
        ca: () => null,
        x2: a => a ** 2,
        '/': (a, b) => a / b,
        '*': (a, b) => a * b,
        '-': (a, b) => a - b,
        '+': (a, b) => a + b,
        '=': () => this.getResult(),
        del: a => a.toString().slice(0, -1),
        '.': a => a + '.',
    };

    getLeftOperand() {
        return +this.getResult().split(this.currentOperator)[0];
    };
    getRightOperand() {
        return +this.getResult().split(this.currentOperator)[1];
    };
    currentOperator;

    getResult() {
        return this.resultElement.textContent;
    }

    constructor() {
        this.numeralList.forEach(element => {
            element.addEventListener('click', () => {
                this.concatResult(element.textContent)
            })
        });

        this.operatorList.forEach(element => {
            element.addEventListener('click', () => {
                const operatorName = element.textContent;

                if (!this.getResult()) {
                    return
                }
                switch (operatorName) {
                    case '*':
                    case '+':
                    case '/':
                    case '-':
                        if (this.currentOperator) {
                            return;
                        }

                        this.concatResult(operatorName);
                        this.currentOperator = operatorName;
                        break;
                    case '.':
                            if (this.currentOperator === '.') {
                                return;
                            }
                            this.concatResult(operatorName);
                            break;
                    default:
                        this.currentOperator = operatorName;
                        this.displayResult(this.operators[this.currentOperator](this.getLeftOperand(), this.getRightOperand()));
                        this.currentOperator = null;
                }
            })
        })
    }

    displayResult(value) {
        this.resultElement.textContent = value;
    }

    concatResult(value) {
        this.displayResult(this.resultElement.textContent + value)
    }
}

class Operator {
    element;
    name;
    calculateFn;

    constructor(name, calculateFn, isDisplayOperator = false) {
        this.name = name;
        this.calculateFn = calculateFn;
        this.element = this.getElement();
        this.element.addEventListener('click', () => {
            if (isDisplayOperator) {
                resultElement.textContent += this.name;
            }
        })
    }

    getElement() {
        return operatorButtonList.find(e => e.getAttribute(operatorAttr) === this.name);
    }

    // calculate() {
    //     resultElement.textContent = 
    // }
}

new Calculator()