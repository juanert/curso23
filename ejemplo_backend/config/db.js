import mongoose from "mongoose";

const connection = mongoose.connect("mongodb://127.0.0.1:27017/estudiantes_lexpin");

export default connection;