const User = require("../models/user.model");
const XLSX = require("xlsx");

// Controlador para registrar un usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, telefono } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !correo || !telefono) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos (nombre, correo, telefono) son obligatorios",
      });
    }

    // Validar formato del correo
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      return res.status(400).json({
        success: false,
        message: "El formato del correo es inválido",
      });
    }

    // Validar formato del teléfono (exactamente 8 dígitos numéricos)
    const telefonoRegex = /^[0-9]{8}$/;
    if (!telefonoRegex.test(telefono)) {
      return res.status(400).json({
        success: false,
        message: "El teléfono debe contener exactamente 8 dígitos numéricos",
      });
    }

    // Verificar si el correo ya está registrado
    const usuarioExistente = await User.findOne({ correo });
    if (usuarioExistente) {
      return res.status(200).json({
        success: true,
        message: "El correo ya está registrado",
        usuario: usuarioExistente,
      });
    }

    // Crear un nuevo usuario con los campos requeridos
    const nuevoUsuario = new User({
      nombre,
      correo,
      telefono,
    });

    // Guardar el usuario en la base de datos
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      usuario: usuarioGuardado,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
      error: error.message,
    });
  }
};

const actualizarDinos = async (req, res) => {
  try {
    const { id } = req.params; // ID del usuario
    const { dinoNombre } = req.body; // Nombre del animal a actualizar

    // Validar que el ID esté presente
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "El ID del usuario es obligatorio",
      });
    }

    // Validar que el nombre del animal esté presente
    if (!dinoNombre) {
      return res.status(400).json({
        success: false,
        message: "Debe proporcionar el nombre del animal a actualizar",
      });
    }

    // Validar que el nombre del animal sea válido
    const dinosValidos = [
      "animal_0",
      "animal_1",
      "animal_2",
      "animal_3",
      "animal_4",
      "animal_5",
      "animal_6",
      "animal_7",
      "animal_8",
      "animal_9",
    ];
    if (!dinosValidos.includes(dinoNombre)) {
      return res.status(400).json({
        success: false,
        message: `El nombre del animal '${dinoNombre}' no es válido`,
      });
    }

    // Actualizar el animal a true
    const campoDino = {};
    campoDino[dinoNombre] = true;

    const usuario = await User.findByIdAndUpdate(
      id,
      { $set: campoDino },
      { new: true, runValidators: true }
    );

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // Verificar si todos los animals están en true
    const todosDinosTrue = dinosValidos.every((dino) => usuario[dino] === true);


    res.status(200).json({
      success: true,
      message: `El animal '${dinoNombre}' fue actualizado exitosamente a true`,
      usuario,
    });
  } catch (error) {
    console.error("Error al actualizar animal:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar animal",
      error: error.message,
    });
  }
};

const obtenerDinos = async (req, res) => {
  try {
    const { id } = req.params; // ID del usuario

    // Validar que el ID esté presente
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "El ID del usuario es obligatorio",
      });
    }

    // Buscar al usuario por ID
    const usuario = await User.findById(id);

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // Extraer los animals del usuario
    const dinos = {
      animal_1: usuario.animal_1,
      animal_2: usuario.animal_2,
      animal_3: usuario.animal_3,
      animal_4: usuario.animal_4,
      animal_5: usuario.animal_5,
      animal_6: usuario.animal_6,
      animal_7: usuario.animal_7,
      animal_8: usuario.animal_8,
    };

    res.status(200).json({
      success: true,
      message: "animals obtenidos exitosamente",
      dinos,
      juegoVecesCompletado: usuario.juegoVecesCompletado,
    });
  } catch (error) {
    console.error("Error al obtener animals:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener animals",
      error: error.message,
    });
  }
};

const obtenerUsuariosConFiltro = async (req, res) => {
  try {
    const { orden } = req.body; // Obtener el orden desde el cuerpo de la solicitud

    // Determinar el orden de clasificación (descendente por defecto)
    const sortOrder = orden === "asc" ? 1 : -1;

    console.log(orden);

    // Obtener todos los usuarios y ordenarlos por fecha de creación
    const usuarios = await User.find().sort({ createdAt: sortOrder });

    res.status(200).json({
      success: true,
      message: "Usuarios obtenidos exitosamente",
      usuarios,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

const descargarExcelUsuarios = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await User.find();

    // Convertir los datos a un formato adecuado para Excel
    const datos = usuarios.map((usuario) => ({
      Nombre: usuario.nombre,
      Correo: usuario.correo,
      Teléfono: usuario.telefono,
      Estado_Juego:
        usuario.juegoVecesCompletado > 0
          ? "Juego Completado"
          : "Juego No Completado",
      Ganador: usuario.ganador ? "Sí" : "No",
      Fecha_Creación: usuario.createdAt,
      Fecha_Actualización: usuario.updatedAt,
    }));

    // Crear un libro de Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(datos);

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

    // Generar un archivo Excel en memoria
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Configurar la respuesta para descargar el archivo
    res.setHeader("Content-Disposition", "attachment; filename=usuarios.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Enviar el archivo al cliente
    res.send(excelBuffer);
  } catch (error) {
    console.error("Error al generar el archivo Excel:", error);
    res.status(500).json({
      success: false,
      message: "Error al generar el archivo Excel",
      error: error.message,
    });
  }
};

module.exports = {
  registrarUsuario,
  actualizarDinos,
  obtenerDinos, // Exportar la nueva función
  obtenerUsuariosConFiltro,
  descargarExcelUsuarios,
};
