import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.jsx'
import { Home } from './pages/Home.jsx'
import { Button } from './components/ui/Button.jsx'
import { Anchor } from './components/ui/Anchor.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { State } from './pages/State.jsx'
import { Practica } from './pages/Practica.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<p>About us</p>} />
        <Route path="/contact" element={<p>Contact</p>} />
        <Route path="/state" element={<State />} />
        <Route path="/practica" element={<Practica />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
