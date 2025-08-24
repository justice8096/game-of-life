import { useState, useCallback, useRef, useEffect } from "react";

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
	const [numRows, setRowsRaw] = useState(initialRows);
	const [numCols, setColsRaw] = useState(initialCols);
	// Ensure numRows and numCols are always at least 1
	const setRows = (n) => setRowsRaw(Math.max(1, Number(n)));
	const setCols = (n) => setColsRaw(Math.max(1, Number(n)));
	const [grid, setGrid] = useState(() => generateEmptyGrid(initialRows, initialCols));
	const runningRef = useRef(false);

	// Update grid when numRows or numCols changes
	useEffect(() => {
		setGrid(generateEmptyGrid(numRows, numCols));
	}, [numRows, numCols]);

	const toggleCell = useCallback((i, j) => {
		if (i < 0 || i >= numRows || j < 0 || j >= numCols) return;
		setGrid(grid => {
			const newGrid = grid.map(row => [...row]);
			newGrid[i][j] = grid[i][j] ? 0 : 1;
			return newGrid;
		});
	}, [numRows, numCols]);

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
					for (const [dx, dy] of neighborOffsets) {
						const x = i + dx;
						const y = j + dy;
						if (x >= 0 && x < numRows && y >= 0 && y < numCols) {
							neighbors += grid[x][y];
						}
					}
					if (cell) {
						return neighbors === 2 || neighbors === 3 ? 1 : 0;
					} else {
						return neighbors === 3 ? 1 : 0;
					}
				})
			);
		});
	}, [numRows, numCols]);

	return {
		grid,
		toggleCell,
		clearGrid,
		randomizeGrid,
		runSimulationStep,
		runningRef,
		setRows,
		setCols,
		numRows,
		numCols
	};
}
