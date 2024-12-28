import { createRoot } from 'react-dom/client';
import './utils/style.ts';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  // </StrictMode>

  <App />
);
