const express = require("express");
const {
  registrarUsuario,
  actualizarDinos,
  obtenerDinos,
  obtenerUsuariosConFiltro,
  descargarExcelUsuarios,
} = require("../controllers/user.controller");

const router = express.Router();

// Ruta para registrar un usuario
router.post("/registrar", registrarUsuario);

// Ruta para actualizar un dinosaurio
router.put("/dinos/:id", actualizarDinos);

// Ruta para obtener los dinosaurios de un usuario por ID
router.get("/dinosObtener/:id", obtenerDinos);

router.post("/usuariosConFiltro", obtenerUsuariosConFiltro);

router.get("/excel", descargarExcelUsuarios);

descargarExcelUsuarios;

module.exports = router;
