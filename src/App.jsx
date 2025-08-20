
import "./App.scss";
import React, { useState, useEffect } from "react";

import { useGrid } from "./Grid";

export default function GameOfLife() {
  const {
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
  } = useGrid();

  const [cellSize, setCellSize] = useState(20);

  function handleSetCols(e) {
    setRunning(false);
    setCols(e); // setCols expects the event, not just the value
  }

    function handleSetRows(e) {
    setRunning(false);
    setRows(e); // setCols expects the event, not just the value
  }

  const [running, setRunning] = useState(false);

  useEffect(() => {
    // This runs every time numRows or numCols change
    let cellMax=Math.max(numCols, numRows); // Reset cell size when changing rows or columns
    setCellSize(Math.round(20*(20/cellMax))); // Reset cell size when
  }, [numRows, numCols]);

  useEffect(() => {
    runningRef.current = running;
    if (!running) return;
    const interval = setInterval(() => {
      if (!runningRef.current) {
        clearInterval(interval);
        return;
      }
      runSimulationStep();
    }, 100);
    return () => clearInterval(interval);
  }, [running, runningRef, runSimulationStep]);

  return (
    <div style={{ userSelect: "none" }}>
      <h2>Conway's Game of Life</h2>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label htmlFor="width-input">Width:</label>
        <input
          id="width-input"
          type="number"
          min={1}
          value={numCols}
          onChange={e => {
            setRunning(false);
            setCols(e);
          }}
          className="sizeInput"
          aria-label="Grid width"
        />
        <label htmlFor="height-input">Height:</label>
        <input
          id="height-input"
          type="number"
          min={1}
          value={numRows}
          onChange={e => {
            setRunning(false);
            setRows(e);
          }}
          className="sizeInput"
          aria-label="Grid height"
        />
      </div>
      <div
        role="grid"
        aria-label="Game of Life grid"
        style={{ display: "grid", gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)` }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              role="gridcell"
              aria-selected={!!cell}
              aria-label={`Cell ${i + 1}, ${j + 1} ${cell ? 'alive' : 'dead'}`}
              tabIndex={0}
              onClick={() => toggleCell(i, j)}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: cell ? "black" : "white",
                border: "solid 1px #ddd",
              }}
            />
          ))
        )}
      </div>
      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => setRunning(!running)}
          className="runButtons"
          aria-pressed={running}
          aria-label={running ? "Stop simulation" : "Start simulation"}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={randomizeGrid} className="runButtons" aria-label="Randomize grid">Random</button>
        <button onClick={clearGrid} className="runButtons" aria-label="Clear grid">Clear</button>
      </div>
    </div>
  );
}
