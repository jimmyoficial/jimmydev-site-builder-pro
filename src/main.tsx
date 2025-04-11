
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/simulator.css'

// Add version information for cache busting
const APP_VERSION = '1.0.1';
console.log(`App Version: ${APP_VERSION}`);

// Force reload if a new version is detected (for future updates)
if (localStorage.getItem('app_version') !== APP_VERSION) {
  localStorage.setItem('app_version', APP_VERSION);
  if (localStorage.getItem('app_version_initialized')) {
    console.log('New version detected, reloading...');
    window.location.reload();
  } else {
    localStorage.setItem('app_version_initialized', 'true');
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
