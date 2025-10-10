import styled from 'styled-components';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
  max-width: 400px;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.mainTextColor};
  margin: 0;
`;

export const ModalMessage = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.subtitleColor};
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  min-width: 100px;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`;

export const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.backgroundSecondaryColor};
  color: ${({ theme }) => theme.mainTextColor};
  border: 1px solid ${({ theme }) => theme.borderColor};

  &:hover {
    background-color: ${({ theme }) => theme.backgroundTertiaryColor};
  }
`;
