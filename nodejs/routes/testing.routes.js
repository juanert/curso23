import { Router } from 'express';

const router = Router();

// Ruta principal
router.get('/', (req, res) => {
    res.send('Bienvenido a la API con Express');
});

router.get('/api/saludo', (req, res) => {
    res.json({ mensaje: 'Hola desde la API!' });
});

//Ruta con parametros
router.get('/api/usuario/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.json({ mensaje: `Hola, ${nombre}!` });
});

//Ruta con query parameters
router.get('/api/suma', (req, res) => {
    const a = parseFloat(req.query.a) || 0;
    const b = parseFloat(req.query.b) || 0;
    const suma = a + b;
    res.json({ resultado: suma });
});

export default router;