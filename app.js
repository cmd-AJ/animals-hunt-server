const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Importar morgan
const connectDB = require("./src/config/db");
require("dotenv").config();

// Rutas
const userRoutes = require("./src/routes/user.routes");

// Configuración del servidor
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());

app.use(express.urlencoded({ extended: false })); // Middleware que analiza los datos de la solicitud HTTP y los pone en un objeto req.body
app.use(express.json());

app.use(morgan("dev")); // Usar morgan para registrar solicitudes HTTP

// Usar las rutas de usuario
app.use("/api/usuarios", userRoutes);

// Conexión a MongoDB e inicio del servidor
connectDB(app, PORT);

// Rutas
app.get("/", (req, res) => {
  res.send("¡Bienvenido a Dino Hunt Server!");
});
