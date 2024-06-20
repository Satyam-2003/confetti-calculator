import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  background: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.background};
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const HistoryItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background: ${({ theme }) => (theme.background === '#fff' ? '#f0f0f0' : '#444')};
  border-radius: 5px;
  color: ${({ theme }) => theme.color};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Modal = ({ isOpen, onClose, history, theme }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent theme={theme}>
        <h2>Calculation History</h2>
        {history.length > 0 ? (
          history.map((item, index) => (
            <HistoryItem key={index} theme={theme}>
              {item}
            </HistoryItem>
          ))
        ) : (
          <p>No history yet.</p>
        )}
        <CloseButton onClick={onClose} theme={theme}>
          Close
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
