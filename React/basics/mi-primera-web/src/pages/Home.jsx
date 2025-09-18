import { FormSection, Hero, Products } from "../components/Home/HomeSections"
import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <div className={theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"}>
      <Hero></Hero>
      <Products></Products>
      <FormSection></FormSection>
      <p>El tema es {theme}</p>
      <button className={theme === "light" ? "bg-black text-white" : "bg-red-600 text-black"} onClick={toggleTheme}>Cambiar tema</button>
    </div>
  )
}

export { Home }