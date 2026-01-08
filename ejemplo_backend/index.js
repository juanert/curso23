import express, { json } from "express"; 
import connection from "./config/db.js";
import corsInstance from "./config/cors.js";
import limiter from "./config/rateLimiter/index.js";
// Routes import
import studentRoutes from "./routes/students.router.js";

// Initial setup
const app = express(); 
const port = 3001; 
app.use(json()); 
app.use(corsInstance); 
// Apply rate limiter (imported from config)
app.use(limiter);
// Routes setup
app.use("/students", studentRoutes);

// Database connection
connection
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.error("Error de conexión:", error));

// Excecute server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
