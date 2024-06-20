// src/components/Calculator.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { evaluate } from 'mathjs';
import Button from './Button';
import Display from './Display';
import History from './History';
import ThemeSwitcher from './ThemeSwitcher';
import ConfettiExplosion from 'react-confetti-explosion';

const CalculatorStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  padding: 20px;
  border-radius: 10px;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('light');
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => setConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  const handleButtonClick = (label) => {
    if (label === '=') {
      try {
        const result = evaluate(input).toString();
        setHistory([...history, `${input} = ${result}`]);
        setInput(result);
        if (/5.*6|6.*5/.test(input)) {
          setConfetti(true);
        }
      } catch (error) {
        setInput('Error');
      }
    } else if (label === 'C') {
      setInput('');
    } else {
      setInput(input + label);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷',
    '2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×',
    '1/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
  ];

  return (
    <div>
      <header>
        <h1>Confetti Calculator</h1>
        <input type="text" placeholder="Search..." />
      </header>
      <CalculatorStyled theme={theme}>
        {confetti && <ConfettiExplosion />}
        <ThemeSwitcher toggleTheme={toggleTheme} theme={theme} />
        <Display value={input} />
        <ButtonsContainer className="buttons-container">
          {buttons.map((label, index) => (
            <Button key={index} label={label} onClick={handleButtonClick} />
          ))}
        </ButtonsContainer>
        <History history={history} />
      </CalculatorStyled>
    </div>
  );
};

export default Calculator;
