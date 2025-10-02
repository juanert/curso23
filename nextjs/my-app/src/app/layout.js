import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Inicio - Mi Aplicación Next.js",
  description: "Esta es la página de inicio de mi aplicación Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}