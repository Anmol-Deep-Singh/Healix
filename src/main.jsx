import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoginContextProvider } from './contextAPI/LoginContextProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>  
  </StrictMode>,
  </BrowserRouter>
)
