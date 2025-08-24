import "./App.scss";
import React, { useState, useEffect } from "react";
import { I18nProvider, useI18n, langDir } from "../internationalization/i18n.jsx";
import { useGrid } from "../board/Grid";

function GameOfLifeInner() {
	const { t, lang, setLang } = useI18n();
	const [darkMode, setDarkMode] = useState(false);
	useEffect(() => {
		const themeName = `flag-${lang}${darkMode ? '-light' : '-dark'}`;
		document.documentElement.setAttribute('data-theme', themeName);
		document.body.setAttribute('data-theme', themeName);
	}, [lang, darkMode]);
  
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
	}, [running, runSimulationStep, runningRef]);

		const dir = langDir[lang] || 'ltr';
		return (
			<div style={{ userSelect: "none" }} dir={dir}>
				<div style={{ textAlign: 'center', marginBottom: 8 }}>
		<h2 className="app-title">{t('title')}</h2>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 8 }}>
						<label htmlFor="lang-select" className="lang-label" style={{ fontWeight: 500 }}>{'Language:'}</label>
						<select
							id="lang-select"
							aria-label="Select language"
							value={lang}
							onChange={e => setLang(e.target.value)}
						>
							<option value="en">English</option>
							<option value="es">Español</option>
							<option value="zh">中文</option>
							<option value="fr">Français</option>
							<option value="ar">العربية</option>
							<option value="he">עברית</option>
							<option value="ga">Gaeilge (Irish)</option>
							<option value="gu">ગુજરાતી (Gujarati)</option>
							<option value="hi">हिन्दी (Hindi)</option>
							<option value="sw">Kiswahili (Swahili)</option>
							<option value="yo">Yorùbá (Yoruba)</option>
						</select>
						<label htmlFor="theme-toggle-btn" className="mode-label" 
						style={{ fontWeight: 500, marginLeft: 12 }}>
							{t(darkMode ? 'dark' : 'light') + ' mode:'}</label>
						<button
							id="theme-toggle-btn"
							aria-label={darkMode ? t('light') : t('dark')}
							onClick={() => setDarkMode(d => !d)}
							className="themeToggleBtn"
							style={{ marginLeft: 4 }}
						>
							{t(darkMode ? 'light' : 'dark')}
						</button>
					</div>
				</div>
				<div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
					<label htmlFor="width-input" className="width-label">{t('width')}:</label>
					<input
						id="width-input"
						type="number"
						min={1}
						value={numCols}
						onChange={e => {
							setRunning(false);
											setCols(Number(e.target.value));
						}}
						className="sizeInput"
						aria-label={t('width')}
					/>
		<label htmlFor="height-input" className="height-label"
					>{t('height')}:</label>
					<input
						id="height-input"
						type="number"
						min={1}
						value={numRows}
						onChange={e => {
							setRunning(false);

                            setRows(Number(e.target.value));
						}}
						className="sizeInput"
						aria-label={t('height')}
					/>
				</div>
				<div
					className="game-grid"
					role="grid"
					aria-label={t('gridLabel')}
					style={{ display: "grid", gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)` }}
				>
					{grid.map((row, i) =>
						row.map((cell, j) => (
							<div
								key={`${i}-${j}`}
								role="gridcell"
								aria-selected={!!cell}
								aria-label={`${t('cellAlive') && cell ? t('cellAlive') : t('cellDead')} (${i + 1}, ${j + 1})`}
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
						className="runButtons btn-1"
						aria-pressed={running}
						aria-label={running ? t('stopSimulation') : t('startSimulation')}
					>
						{running ? t('stop') : t('start')}
					</button>
					<button onClick={randomizeGrid} 
					className="runButtons btn-2" 
					aria-label={t('randomizeGrid')}>{t('random')}</button>
					<button onClick={clearGrid} className="runButtons btn-3" aria-label={t('clearGrid')}>{t('clear')}</button>
				</div>
			</div>
		);
	}

	export default function App() {
		return (
			<I18nProvider>
				<GameOfLifeInner />
			</I18nProvider>
		);
	}
