import React from 'react';
import {
  ModalContent,
  ModalTitle,
  ModalMessage,
  ButtonGroup,
  ConfirmButton,
  CancelButton,
} from './ConfirmDeleteModal.styled';

const ConfirmDeleteModal = ({
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete this card? This action cannot be undone.',
  onConfirm,
  onCancel,
}) => {
  return (
    <ModalContent>
      <ModalTitle>{title}</ModalTitle>
      <ModalMessage>{message}</ModalMessage>
      <ButtonGroup>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <ConfirmButton onClick={onConfirm}>Delete</ConfirmButton>
      </ButtonGroup>
    </ModalContent>
  );
};

export default ConfirmDeleteModal;
