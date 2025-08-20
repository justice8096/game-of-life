import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGrid } from './Grid';

// Test generateEmptyGrid and generateRandomGrid are not exported, so we test via useGrid

describe('useGrid', () => {
  it('initializes with correct grid size and all cells dead', () => {
    const { result } = renderHook(() => useGrid(3, 4));
    expect(result.current.grid.length).toBe(3);
    expect(result.current.grid[0].length).toBe(4);
    expect(result.current.grid.flat().every(cell => cell === 0)).toBe(true);
  });

  it('toggleCell flips a cell state', () => {
    const { result } = renderHook(() => useGrid(2, 2));
    act(() => {
      result.current.toggleCell(0, 1);
    });
    expect(result.current.grid[0][1]).toBe(1);
    act(() => {
      result.current.toggleCell(0, 1);
    });
    expect(result.current.grid[0][1]).toBe(0);
  });

  it('clearGrid sets all cells to 0', () => {
    const { result } = renderHook(() => useGrid(2, 2));
    act(() => {
      result.current.toggleCell(0, 0);
      result.current.toggleCell(1, 1);
    });
    act(() => {
      result.current.clearGrid();
    });
    expect(result.current.grid.flat().every(cell => cell === 0)).toBe(true);
  });

  it('randomizeGrid sets at least one cell to 1 (likely)', () => {
    const { result } = renderHook(() => useGrid(5, 5));
    act(() => {
      result.current.randomizeGrid();
    });
    // Not guaranteed, but very likely
    expect(result.current.grid.flat().some(cell => cell === 1)).toBe(true);
  });

  it('runSimulationStep applies Game of Life rules', () => {
    const { result } = renderHook(() => useGrid(3, 3));
    // Set up a blinker pattern
    act(() => {
      result.current.toggleCell(1, 0);
      result.current.toggleCell(1, 1);
      result.current.toggleCell(1, 2);
    });
    // Step 1
    act(() => {
      result.current.runSimulationStep();
    });
    expect(result.current.grid[0][1]).toBe(1);
    expect(result.current.grid[1][1]).toBe(1);
    expect(result.current.grid[2][1]).toBe(1);
    // Step 2
    act(() => {
      result.current.runSimulationStep();
    });
    expect(result.current.grid[1][0]).toBe(1);
    expect(result.current.grid[1][1]).toBe(1);
    expect(result.current.grid[1][2]).toBe(1);
  });

  it('setRows and setCols update grid size', () => {
    const { result } = renderHook(() => useGrid(2, 2));
    act(() => {
      result.current.setRows({ target: { value: '3' } });
    });
    expect(result.current.grid.length).toBe(3);
    act(() => {
      result.current.setCols({ target: { value: '4' } });
    });
    expect(result.current.grid[0].length).toBe(4);
  });
});
