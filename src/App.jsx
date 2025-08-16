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
  } = useGrid();

  const [running, setRunning] = useState(false);

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
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${grid[0].length}, 20px)` }}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => toggleCell(i, j)}
              style={{
                width: 20,
                height: 20,
                backgroundColor: cell ? "black" : "white",
                border: "solid 1px #ddd",
              }}
            />
          ))
        )}
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={randomizeGrid}>Random</button>
        <button onClick={clearGrid}>Clear</button>
      </div>
    </div>
  );
}
