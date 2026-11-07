import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SessionProvider } from './context/session.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <SessionProvider>
      <App />
    </SessionProvider>
  </ErrorBoundary>,
)
