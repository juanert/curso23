import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section>
      <h1 className="text-4xl font-bold">Hola, soy Juan</h1>
      <Link to="/about-us">About us</Link>
    </section>
  )
}

export { Hero }