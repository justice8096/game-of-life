import { useState, useCallback, useRef } from "react";



// numRows and numCols should be managed inside the hook, not at the top level

const neighborOffsets = [
  [0, 1], [0, -1], [1, -1],
  [-1, 1], [1, 1],
  [-1, -1], [1, 0], [-1, 0]
];


function generateEmptyGrid(numRows, numCols) {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => 0)
  );
}

function generateRandomGrid(numRows, numCols) {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () =>
      Math.random() > 0.7 ? 1 : 0
    )
  );
}


export function useGrid(initialRows = 20, initialCols = 20) {
  const [numRows, setRows] = useState(initialRows);
  const [numCols, setCols] = useState(initialCols);
  const [grid, setGrid] = useState(() => generateEmptyGrid(initialRows, initialCols));
  const runningRef = useRef(false);


  const toggleCell = useCallback((i, j) => {
    setGrid(grid => {
      const newGrid = grid.map(row => [...row]);
      newGrid[i][j] = grid[i][j] ? 0 : 1;
      return newGrid;
    });
  }, []);


  const clearGrid = useCallback(() => {
    setGrid(generateEmptyGrid(numRows, numCols));
  }, [numRows, numCols]);


  const randomizeGrid = useCallback(() => {
    setGrid(generateRandomGrid(numRows, numCols));
  }, [numRows, numCols]);


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
  }, [numRows, numCols]);


  // When numRows or numCols changes, regenerate the grid
  const updateRows = (e) => {
    const value = parseInt(e.target.value, 10);
    setRows(value);
    setGrid(generateEmptyGrid(value, numCols));
  };
  const updateCols = (e) => {
    const value = parseInt(e.target.value, 10);
    setCols(value);
    setGrid(generateEmptyGrid(numRows, value));
  };

  return {
    grid,
    setGrid,
    toggleCell,
    clearGrid,
    randomizeGrid,
    runSimulationStep,
    runningRef,
    setRows: updateRows,
    setCols: updateCols,
    numRows,
    numCols
  };
}
