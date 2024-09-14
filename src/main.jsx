import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SesionProvider } from './context/sesion.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <SesionProvider>
    <App />
  </SesionProvider>,
)
