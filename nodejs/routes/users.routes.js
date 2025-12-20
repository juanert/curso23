import { Router } from 'express';
import { createUser, getUsers, getUserById, deleteUser, updateUser } from '../controllers/users.controller.js';

// El router me permite definir rutas en un archivo separado
const router = Router();

// Ruta para crear un nuevo usuario
router.post('/', createUser);

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

//Ruta para traer a un solo usuario por ID
router.get('/:id', getUserById);

//Borrar un usuario (soft delete)
router.delete('/:id', deleteUser);

//Ruta para actualizar un usuario
router.patch('/:id', updateUser);

export default router;