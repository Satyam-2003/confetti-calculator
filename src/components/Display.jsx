import React from 'react';
import styled from 'styled-components';

const DisplayStyled = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
  padding: 10px;
  background: #222;
  color: #fff;
  text-align: right;
  border-radius: 5px;
  min-height: 50px;
`;

const Display = ({ value }) => {
  return <DisplayStyled>{value}</DisplayStyled>;
};

export default Display;
