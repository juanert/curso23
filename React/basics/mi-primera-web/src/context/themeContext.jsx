import { createContext, useState } from 'react';

//Creo el contexto con un valor por defecto, en este caso 'light', que representa el tema claro.
//ThemeContext me permite compartir el estado del tema (claro u oscuro) en toda la aplicación sin necesidad de 
// pasar props manualmente a través de cada nivel del árbol de componentes.
const ThemeContext = createContext('light');

//Componente proveedor del contexto que envuelve a los componentes que necesitan acceso al tema.
function ThemeProvider({ children }) {
  // Estado para manejar el tema actual, puede ser 'light' o 'dark'.
  const [theme, setTheme] = useState('light');
  // Función para alternar entre temas claro y oscuro.
  const toggleTheme = () => {
    setTheme((tema) => (tema === 'light' ? 'dark' : 'light'));
  }
  // Proporciona el estado del tema y la función para cambiarlo a los componentes hijos.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };