
import "./App.css";
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
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)` }}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
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
        <button onClick={() => setRunning(!running)} className="runButtons">
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={randomizeGrid} className="runButtons">Random</button>
        <button onClick={clearGrid} className="runButtons">Clear</button>
        <div>
          <b>Grid Size</b> <br />
          <label>Width:</label>
          <input value={numCols} onChange={handleSetCols} type="number" min="1" max="100" className='sizeInput'/>
          <label>Height:</label>
          <input value={numRows} onChange={handleSetRows} type="number" min="1" max="100" className='sizeInput'/>
        </div>
      </div>
    </div>
  );
}
