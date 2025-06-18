// components/Calculator/Calculator.js
import React, { useState } from 'react';
import {
  CalculatorContainer,
  Display,
  DisplayHistory,
  DisplayCurrent,
  ButtonGrid,
  Button,
  OperatorButton,
  ClearButton,
  EqualsButton,
} from './styles';

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [history, setHistory] = useState('');
  const [storedValue, setStoredValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setCurrentValue('0');
    setHistory('');
    setStoredValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setCurrentValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setCurrentValue(currentValue === '0' ? String(digit) : currentValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setCurrentValue('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(currentValue);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operation) {
      const currentValue = storedValue || 0;
      let newValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setStoredValue(newValue);
      setCurrentValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
    setHistory(`${storedValue || ''} ${nextOperation}`);
  };

  const handleEquals = () => {
    if (!operation || waitingForOperand) return;

    performOperation(null);
    setHistory('');
  };

  const handleButtonClick = (value) => {
    switch (value) {
      case 'C':
        clearAll();
        break;
      case '+/-':
        setCurrentValue(String(parseFloat(currentValue) * -1));
        break;
      case '%':
        setCurrentValue(String(parseFloat(currentValue) / 100));
        break;
      case '.':
        inputDecimal();
        break;
      case '=':
        handleEquals();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        performOperation(value);
        break;
      default:
        inputDigit(value);
    }
  };

  return (
    <CalculatorContainer>
      <Display>
        <DisplayHistory>{history}</DisplayHistory>
        <DisplayCurrent>{currentValue}</DisplayCurrent>
      </Display>
      <ButtonGrid>
        <ClearButton onClick={() => handleButtonClick('C')}>C</ClearButton>
        <Button onClick={() => handleButtonClick('+/-')}>+/-</Button>
        <Button onClick={() => handleButtonClick('%')}>%</Button>
        <OperatorButton onClick={() => handleButtonClick('/')}>÷</OperatorButton>

        <Button onClick={() => handleButtonClick('7')}>7</Button>
        <Button onClick={() => handleButtonClick('8')}>8</Button>
        <Button onClick={() => handleButtonClick('9')}>9</Button>
        <OperatorButton onClick={() => handleButtonClick('*')}>×</OperatorButton>

        <Button onClick={() => handleButtonClick('4')}>4</Button>
        <Button onClick={() => handleButtonClick('5')}>5</Button>
        <Button onClick={() => handleButtonClick('6')}>6</Button>
        <OperatorButton onClick={() => handleButtonClick('-')}>-</OperatorButton>

        <Button onClick={() => handleButtonClick('1')}>1</Button>
        <Button onClick={() => handleButtonClick('2')}>2</Button>
        <Button onClick={() => handleButtonClick('3')}>3</Button>
        <OperatorButton onClick={() => handleButtonClick('+')}>+</OperatorButton>

        <Button onClick={() => handleButtonClick('0')} style={{ gridColumn: 'span 2' }}>
          0
        </Button>
        <Button onClick={() => handleButtonClick('.')}>.</Button>
        <EqualsButton onClick={() => handleButtonClick('=')}>=</EqualsButton>
      </ButtonGrid>
    </CalculatorContainer>
  );
};

export default Calculator;