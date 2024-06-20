import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  padding: 20px;
  font-size: 1em;
  background: #444;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const Button = ({ label, onClick }) => {
  return <ButtonStyled onClick={() => onClick(label)}>{label}</ButtonStyled>;
};

export default Button;
