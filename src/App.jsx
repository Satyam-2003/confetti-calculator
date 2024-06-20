import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { evaluate } from 'mathjs';
import Button from './components/Button';
import Display from './components/Display';
import ThemeSwitcher from './components/ThemeSwitcher';
import ConfettiExplosion from 'react-confetti-explosion';
import Modal from './components/Modal';

const lightTheme = {
  background: '#fff',
  color: '#000',
};

const darkTheme = {
  background: '#333',
  color: '#fff',
};

const CalculatorStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const HistoryButton = styled.button`
  background: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.background};
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
`;

const App = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('light');
  const [confetti, setConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => setConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  const handleButtonClick = (label) => {
    if (label === '=') {
      try {
        const expression = input.replace(/×/g, '*').replace(/÷/g, '/');
        const result = evaluate(expression).toString();
        setHistory([...history, `${input} = ${result}`]);
        setInput(result);
        if (/5.*6|6.*5/.test(expression)) {
          setConfetti(true);
        }
      } catch (error) {
        setInput('Error');
      }
    } else if (label === 'C') {
      setInput('');
    } else {
      setInput((prevInput) => (prevInput === 'Error' ? label : prevInput + label));
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷',
    '2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×',
    '1/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
  ];

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <header>
        <h1>Confetti Calculator</h1>
        <input type="text" placeholder="Search..." />
      </header>
      <CalculatorStyled>
        {confetti && <ConfettiExplosion />}
        <ThemeSwitcher toggleTheme={toggleTheme} theme={theme} />
        <Display value={input} />
        <ButtonsContainer>
          {buttons.map((label, index) => (
            <Button key={index} label={label} onClick={() => handleButtonClick(label)} />
          ))}
        </ButtonsContainer>
        <HistoryButton onClick={toggleModal} theme={theme}>
          View History
        </HistoryButton>
        <Modal isOpen={isModalOpen} onClose={toggleModal} history={history} theme={theme} />
      </CalculatorStyled>
    </ThemeProvider>
  );
};

export default App;
