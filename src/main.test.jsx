import { describe, it, expect } from 'vitest';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './ui/App.jsx';

// Mock the root element for rendering
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

describe('main.jsx', () => {
  it('renders App without crashing', () => {
    expect(() => {
      createRoot(document.getElementById('root')).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }).not.toThrow();
  });
});
