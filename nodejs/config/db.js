import mongoose from 'mongoose';

// Conectar a MongoDB
const connection = mongoose.connect('mongodb://127.0.0.1:27017/curso23')

export default connection;