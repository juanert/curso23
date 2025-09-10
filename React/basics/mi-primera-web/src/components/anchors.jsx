import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function Anchors({href}) {
  return (
    <div>
      <h2>Creado con las tecnologias:</h2>
      <a href={href} target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}

export default Anchors;