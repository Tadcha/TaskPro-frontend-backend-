// Simple test to verify React Testing Library setup
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Simple component for testing
function HelloWorld({ name = 'World' }) {
  return <h1>Hello {name}!</h1>;
}

describe('Test Environment Setup', () => {
  test('React Testing Library works correctly', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });

  test('Props are passed correctly', () => {
    render(<HelloWorld name="TaskPro" />);
    expect(screen.getByText('Hello TaskPro!')).toBeInTheDocument();
  });

  test('Basic DOM assertions work', () => {
    render(<HelloWorld />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello World!');
  });
});
