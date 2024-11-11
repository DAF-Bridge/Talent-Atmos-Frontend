import React from 'react';
import { render, screen } from '@testing-library/react';
import MyComponent from '../src/components/MyComponent';

test('renders hello world', () => {
  render(<MyComponent />); // ARRANGE
  
  const linkElement = screen.getByText(/hello world/i); // ACT

  expect(linkElement).toBeInTheDocument(); // ASSERT
});
