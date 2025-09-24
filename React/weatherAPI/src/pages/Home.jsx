import { useState, useEffect, useRef } from "react"

function Home() {
  //Obtener las coordenadas del usuario
  const [location, setLocation] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Función para obtener la localización del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }, error => {
        setError(error)
        setLoading(false)
      })
    }
  }, [])

  useEffect(() => {
    // Obtener los datos del clima de la localización del usuario
    const getWeather = async () => {
      // Valido que location no sea null y que tenga latitud y longitud
      if (location && location.latitude && location.longitude) {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&lang=es&appid=bba433c537b246af73295d51320aeb33`)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => setError(error))
          .finally(() => { setLoading(false); console.log(data) })
      }
    }
    //ejecuto la función
    getWeather()
    // El useEffect se ejecuta cada vez que location cambia
  }, [location])

  if (loading) return <h1>Loading...</h1>

  return (
    <div>
      {error ? (<h1>{error.message}</h1>) : (<Weather data={data} setData={setData} error={error} setError={setError} loading={loading} setLoading={setLoading} />)}
    </div>
  )
}

function Weather({ data, error, loading, setData, setError, setLoading }) {
  const inputRef = useRef()
  const handleSearch = () => {
    // Obtener los datos del clima de la ciudad buscada
    const city = inputRef.current.value.trim()
    if (city) {
      setLoading(true)
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    }
  }

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>{error.message}</h1>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
      <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
      <p className="text-lg">{data.weather[0].description}</p>
      <p className="text-2xl font-bold">Temperatura: {data.main.temp}°C</p>
      <p className="text-lg">Mínima: {data.main.temp_min}°C</p>
      <p className="text-lg">Máxima: {data.main.temp_max}°C</p>
      <p className="text-lg">Humedad: {data.main.humidity}%</p>
      <p className="text-lg">Viento: {data.wind.speed} m/s</p>
      <div>
        <input ref={inputRef} type="text" placeholder="Buscar ciudad..." />
        <button onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  )
}

export { Home }