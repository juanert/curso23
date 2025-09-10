import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.jsx'
import { Home } from './pages/Home.jsx'
import { Button } from './components/ui/Button.jsx'
import { Anchor } from './components/ui/Anchor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />
    <Anchor href="https://www.google.com" target="_blank">
      <Button texto="Ir a Google" />
    </Anchor>
    <Button />
    */}@
    <Home />
  </StrictMode>,
)
