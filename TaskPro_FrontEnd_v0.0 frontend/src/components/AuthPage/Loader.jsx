import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import styled from 'styled-components';

// Professional loading overlay with smooth animations
const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const LoaderText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #334155;
  text-align: center;
`;

/**
 * Professional loading component with overlay
 * Features:
 * - Full-screen overlay with blur effect
 * - Smooth fade-in animation
 * - Customizable text and colors
 * - Accessibility support
 */
const Loader = ({ text = 'Loading...', size = 48 }) => {
  return (
    <LoaderOverlay role="status" aria-label={text}>
      <LoaderContainer>
        <ColorRing
          visible={true}
          height={size}
          width={size}
          ariaLabel="loading-spinner"
          wrapperStyle={{}}
          wrapperClass="spinner-wrapper"
          colors={['#8FA1D0', '#E09CB5', '#f8b26a', '#abbd81', '#849b87']}
        />
        <LoaderText>{text}</LoaderText>
      </LoaderContainer>
    </LoaderOverlay>
  );
};

export default Loader;
