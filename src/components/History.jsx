import React from 'react';
import styled from 'styled-components';

const HistoryStyled = styled.div`
  margin-top: 20px;
`;

const HistoryItem = styled.div`
  padding: 5px;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
`;

const History = ({ history, theme }) => {
  return (
    <HistoryStyled>
      {history.map((item, index) => (
        <HistoryItem key={index} theme={theme}>
          {item}
        </HistoryItem>
      ))}
    </HistoryStyled>
  );
};

export default History;
