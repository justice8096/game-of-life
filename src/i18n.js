import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    title: "Conway's Game of Life",
    width: 'Width',
    height: 'Height',
    start: 'Start',
    stop: 'Stop',
    random: 'Random',
    clear: 'Clear',
    gridLabel: 'Game of Life grid',
    cellAlive: 'alive',
    cellDead: 'dead',
    startSimulation: 'Start simulation',
    stopSimulation: 'Stop simulation',
    randomizeGrid: 'Randomize grid',
    clearGrid: 'Clear grid',
  },
  es: {
    title: "El Juego de la Vida de Conway",
    width: 'Ancho',
    height: 'Alto',
    start: 'Iniciar',
    stop: 'Detener',
    random: 'Aleatorio',
    clear: 'Limpiar',
    gridLabel: 'Cuadrícula del Juego de la Vida',
    cellAlive: 'viva',
    cellDead: 'muerta',
    startSimulation: 'Iniciar simulación',
    stopSimulation: 'Detener simulación',
    randomizeGrid: 'Aleatorizar cuadrícula',
    clearGrid: 'Limpiar cuadrícula',
  },
};

const I18nContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = (key) => translations[lang][key] || key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
