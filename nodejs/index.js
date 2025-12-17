import express, { json } from 'express'; //importamos express
import mongoose from 'mongoose'; //importamos mongoose
const app = express(); // Crear el servidor ejecutando express
const port = 3000;//crear un puerto
app.use(json());// Middleware para parsear JSON

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/curso23')

// Schema de usuario
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[A-Za-záéíóúÁÉÍÓÚñÑ' ]+$/.test(v);
            },
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
        }
    },
    age: {
        type: Number,
        min: 0,
        max: 120,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function (v) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(v);
            },
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const User = mongoose.model('Users', userSchema);

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido a la API con Express');
});

// Ruta para crear un nuevo usuario
app.post('/api/users', async (req, res) => {
    try {
        const nuevoUsuario = new User(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', user: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
    const { nombre, email } = req.query;
    const filter = { deleted: false };
    if (nombre) {
        filter.name = new RegExp(nombre, 'i'); // Búsqueda parcial y case-insensitive
    }
    if (email) {
        filter.email = new RegExp(email, 'i'); // Búsqueda parcial y case-insensitive
    }
    try {
        const usuarios = await User.find(filter);
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Ruta para traer a un solo usuario por ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario || usuario.deleted) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        //en caso de no poder transformar el id a un ObjectId valido
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(500).json({ error: error.message });
    }
});

//Borrar un usuario (soft delete)
app.delete('/api/users/:id', async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario || usuario.deleted) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        usuario.deleted = true;
        usuario.deleted_at = new Date();
        await usuario.save();
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        //en caso de no poder transformar el id a un ObjectId valido
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(500).json({ error: error.message });
    }
});

//Ruta para actualizar un usuario
app.patch('/api/users/:id', async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        Object.assign(usuario, req.body);
        await usuario.save();
        res.json({ message: 'Usuario actualizado exitosamente', user: usuario });
    } catch (error) {
        //en caso de no poder transformar el id a un ObjectId valido
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: 'Hola desde la API!' });
});

//Ruta con parametros
app.get('/api/usuario/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.json({ mensaje: `Hola, ${nombre}!` });
});

//Ruta con query parameters
app.get('/api/suma', (req, res) => {
    const a = parseFloat(req.query.a) || 0;
    const b = parseFloat(req.query.b) || 0;
    const suma = a + b;
    res.json({ resultado: suma });
});

//iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});