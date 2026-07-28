import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SesionProvider } from './context/sesion.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <SesionProvider>
      <App />
    </SesionProvider>
  </ErrorBoundary>,
)
