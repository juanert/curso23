/**
 * Button component
 * @param {string} texto - The text to display on the button (default: "Presioname")
 * @param {string} estilos - Additional CSS classes for styling (default: "bg-blue-600 px-4 py-2 font-bold text-2xl")
 * @returns {JSX.Element} A styled button element
 * @author Juan Rodriguez 
 */
function Button({ texto = "Presioname", estilos = "bg-blue-600 px-4 py-2 font-bold text-2xl" }) {
  return (
    <button className={"cursor-pointer " + estilos}>{texto}</button>
  )
}

export { Button }