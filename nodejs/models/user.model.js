import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoose.plugin(mongoosePaginate);

/**
 * Definición del esquema y modelo de Usuario
 * name: nombre del usuario, solo letras y espacios
 * email: correo electrónico válido y único
 * age: edad del usuario, entre 0 y 120
 * password: contraseña con al menos 6 caracteres, incluyendo letras y números
 * deleted: indicador de borrado lógico
 * deleted_at: fecha de borrado lógico
 * Timestamps: createdAt y updatedAt automáticos
 * Autor: Juan Rodriguez
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[A-Za-záéíóúÁÉÍÓÚñÑ' ]+$/.test(v);
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
      },
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate: {
        validator: function (v) {
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(v);
        },
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

export default User;
