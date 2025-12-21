const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    animal_0: {
      type: Boolean,
      default: false,
    },
    animal_1: {
      type: Boolean,
      default: false,
    },
    animal_2: {
      type: Boolean,
      default: false,
    },
    animal_3: {
      type: Boolean,
      default: false,
    },
    animal_4: {
      type: Boolean,
      default: false,
    },
    animal_5: {
      type: Boolean,
      default: false,
    },
    animal_6: {
      type: Boolean,
      default: false,
    },
    animal_7: {
      type: Boolean,
      default: false,
    },
    animal_8: {
      type: Boolean,
      default: false,
    },
    animal_9: {
      type: Boolean,
      default: false,
    },
    juegoVecesCompletado: {
      type: Number,
      default: 0,
    },
    ganador: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
  }
);

module.exports = mongoose.model("User", userSchema);
