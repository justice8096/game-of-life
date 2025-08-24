import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
	it("renders Conway's Game of Life title", () => {
		render(<App />);
		expect(screen.getByText(/Conway's Game of Life/i)).toBeInTheDocument();
	});

	it('renders grid size inputs and updates value', () => {
		render(<App />);
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
	it('toggles dark/light mode and updates data-theme', () => {
		render(<App />);
		const toggleBtn = screen.getByRole('button', { name: /light|dark/i });
		const html = document.documentElement;
		const initialTheme = html.getAttribute('data-theme');
		fireEvent.click(toggleBtn);
		const newTheme = html.getAttribute('data-theme');
		expect(newTheme).not.toBe(initialTheme);
	});

	it('changes language and updates the title', () => {
		render(<App />);
		const select = screen.getByLabelText('Select language');
		fireEvent.change(select, { target: { value: 'fr' } });
		expect(screen.getByText(/Jeu de la vie de Conway/i)).toBeInTheDocument();
	});

	it('renders the grid centered with correct class', () => {
		render(<App />);
		const grid = screen.getByRole('grid');
		expect(grid).toHaveClass('game-grid');
	});

		it('labels and inputs have correct class names', () => {
			render(<App />);
			// Check labels
			expect(screen.getByText('Width:')).toHaveClass('width-label');
			expect(screen.getByText('Height:')).toHaveClass('height-label');
			// Check inputs
			expect(screen.getByLabelText('Width:')).toHaveClass('sizeInput');
			expect(screen.getByLabelText('Height:')).toHaveClass('sizeInput');
		});
});
