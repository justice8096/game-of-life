import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

// Basic test to check if the title renders

describe('App', () => {
  it("renders Conway's Game of Life title", () => {
    render(<App />);
    expect(screen.getByText(/Conway's Game of Life/i)).toBeInTheDocument();
  });

  it('renders grid size inputs and updates value', () => {
    render(<App />);
    // Find inputs by their label text
    const widthInput = screen.getByLabelText('Width:');
    const heightInput = screen.getByLabelText('Height:');
    expect(widthInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();
    fireEvent.change(widthInput, { target: { value: '15' } });
    expect(widthInput.value).toBe('15');
    fireEvent.change(heightInput, { target: { value: '10' } });
    expect(heightInput.value).toBe('10');
  });

  it('start/stop button toggles running state', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /start/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(button.textContent.toLowerCase()).toBe('stop');
    fireEvent.click(button);
    expect(button.textContent.toLowerCase()).toBe('start');
  });
});