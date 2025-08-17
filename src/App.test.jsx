import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

// Basic test to check if the title renders

describe('App', () => {
  it("renders Conway's Game of Life title", () => {
    render(<App />);
    expect(screen.getByText(/Conway's Game of Life/i)).toBeInTheDocument();
  });
});