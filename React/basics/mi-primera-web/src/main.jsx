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
import { Effect } from './pages/Effect.jsx'
import { Character } from './pages/Character.jsx'
import { Ref } from './pages/Ref.jsx'
import { ThemeProvider } from './context/themeContext.jsx'
import { JuanGPT } from './pages/JuanGPT.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<p>About us</p>} />
          <Route path="/contact" element={<p>Contact</p>} />
          <Route path="/state" element={<State />} />
          <Route path="/effect" element={<Effect />} />
          <Route path="/practica" element={<Practica />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/ref" element={<Ref />} />
          <Route path="/juangpt" element={<JuanGPT />} />
          <Route path='*' element={<p>404 Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode >,
)
