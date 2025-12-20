const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (app, port) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conexión a MongoDB exitosa");

    // Iniciar el servidor solo si la conexión a MongoDB es exitosa
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1); // Finaliza el proceso si no se puede conectar a la base de datos
  }
};

module.exports = connectDB;
