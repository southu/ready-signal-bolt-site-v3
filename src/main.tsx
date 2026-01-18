import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

// If the container has child nodes, it means the page was pre-rendered
// Use hydrateRoot to attach React to the existing HTML
if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // Otherwise, render normally (development or non-pre-rendered pages)
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
