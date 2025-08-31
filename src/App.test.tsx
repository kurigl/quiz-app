import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders quiz start button', () => {
  render(<App />);
  const startButton = screen.getByRole('button', { name: /quiz starten/i });
  expect(startButton).toBeInTheDocument();
});
