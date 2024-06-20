import React from 'react';
import styled from 'styled-components';

const ThemeSwitcherStyled = styled.button`
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: #fff;
  cursor: pointer;
`;

const ThemeSwitcher = ({ toggleTheme, theme }) => {
  return (
    <ThemeSwitcherStyled onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </ThemeSwitcherStyled>
  );
};

export default ThemeSwitcher;
