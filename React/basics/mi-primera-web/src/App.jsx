import './App.css'
import Anchors from './components/anchors'

function App() {
  let saludo = 'Hola Mundo y Hola Angela!'

  return (
    <section className="App">
      <h1>Mi proyecto de React con Lexpin</h1>
      <Anchors href={"https://vite.dev"} />
      <div className="card">
        <h2>{saludo}</h2>
        <p>
          Editado por mi <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Esto es irrelevante, pero es un párrafo al fin y al cabo.
      </p>
    </section>
  )
}

export default App
