import User from "../models/user.model.js";

export async function createUser(req, res) {
  try {
    const nuevoUsuario = new User(req.body);
    await nuevoUsuario.save();
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", user: nuevoUsuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUsers(req, res) {
  const { nombre, email } = req.query;
  const filter = { deleted: false };
  if (nombre) {
    filter.name = new RegExp(nombre, "i"); // Búsqueda parcial y case-insensitive
  }
  if (email) {
    filter.email = new RegExp(email, "i"); // Búsqueda parcial y case-insensitive
  }
  try {
    const usuarios = await User.paginate(filter, {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario || usuario.deleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    //en caso de no poder transformar el id a un ObjectId valido
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(500).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario || usuario.deleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    usuario.deleted = true;
    usuario.deleted_at = new Date();
    await usuario.save();
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    //en caso de no poder transformar el id a un ObjectId valido
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(500).json({ error: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    Object.assign(usuario, req.body);
    await usuario.save();
    res.json({ message: "Usuario actualizado exitosamente", user: usuario });
  } catch (error) {
    //en caso de no poder transformar el id a un ObjectId valido
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(400).json({ error: error.message });
  }
}
