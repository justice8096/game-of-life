import { useState, useCallback, useRef } from "react";

const numRows = 25;
const numCols = 40;

const neighborOffsets = [
  [0, 1], [0, -1], [1, -1],
  [-1, 1], [1, 1],
  [-1, -1], [1, 0], [-1, 0]
];

const generateEmptyGrid = () =>
  Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => 0)
  );

const generateRandomGrid = () =>
  Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () =>
      Math.random() > 0.7 ? 1 : 0
    )
  );

export function useGrid() {
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const runningRef = useRef(false);

  const toggleCell = useCallback((i, j) => {
    setGrid(grid => {
      const newGrid = grid.map(row => [...row]);
      newGrid[i][j] = grid[i][j] ? 0 : 1;
      return newGrid;
    });
  }, []);

  const clearGrid = useCallback(() => {
    setGrid(generateEmptyGrid());
  }, []);

  const randomizeGrid = useCallback(() => {
    setGrid(generateRandomGrid());
  }, []);

  const runSimulationStep = useCallback(() => {
    setGrid(grid => {
      return grid.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;

          neighborOffsets.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += grid[newI][newJ];
            }
          });

          if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
          if (cell === 0 && neighbors === 3) return 1;
          return cell;
        })
      );
    });
  }, []);

  return {
    grid,
    setGrid,
    toggleCell,
    clearGrid,
    randomizeGrid,
    runSimulationStep,
    runningRef,
  };
}
