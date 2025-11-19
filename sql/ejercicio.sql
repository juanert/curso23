CREATE DATABASE youtube_clone WITH ENCODING 'UTF8';

/*CREAR TABLAS*/

CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    numero_telefono VARCHAR(15),
    pais VARCHAR(50),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE videos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    url_video VARCHAR(255) UNIQUE NOT NULL,
    url_miniatura VARCHAR(255),
    duracion FLOAT NOT NULL,
    id_usuario BIGINT NOT NULL,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE comentarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_video BIGINT NOT NULL,
    id_usuario BIGINT NOT NULL,
    contenido TEXT NOT NULL,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_video) REFERENCES videos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

/*Insertar datos*/
INSERT INTO usuarios (nombre_usuario, correo_electronico, contrasena, fecha_nacimiento, numero_telefono, pais) VALUES
('juan123', 'hola@hola.com', 'contrasena123', '1990-05-15', '1234567890', 'Mexico'),
('maria456', 'maria@gmail.com', 'contrasena456', '1985-10-20', '0987654321', 'Argentina');
INSERT INTO videos (titulo, descripcion, url_video, url_miniatura, duracion, id_usuario) VALUES
('Mi primer video', 'Este es el descripcion de mi primer video', 'http://videos.com/mi_primer_video', 'http://videos.com/miniaturas/mi_primer_video.jpg', 10.5, 1),
('Tutorial de SQL', 'Aprende SQL desde cero en este tutorial', 'http://videos.com/tutorial_sql', 'http://videos.com/miniaturas/tutorial_sql.jpg', 25.0, 2);
INSERT INTO comentarios (id_video, id_usuario, contenido) VALUES
(1, 2, '¡Gran video! Me encantó.'),
(2, 1, 'Muy útil el tutorial, gracias por compartirlo.');

/*Consultas de ejemplo*/
-- Obtener todos los videos subidos por un usuario específico
SELECT * FROM videos WHERE id_usuario = 1;

-- Obtener todos los comentarios de un video específico
SELECT * FROM comentarios WHERE id_video = 2;

-- Contar el número de videos subidos por cada usuario
SELECT id_usuario, COUNT(*) AS numero_videos FROM videos GROUP BY id_usuario;

-- Contar cuantos usuarios hay
SELECT COUNT(*) AS total_usuarios FROM usuarios;

/*Consultas relacionales*/
-- Obtener todos los videos junto con el nombre de usuario del uploader
SELECT v.*, u.nombre_usuario FROM videos v
INNER JOIN usuarios u ON v.id_usuario = u.id;

-- Obtener todos los comentarios junto con el nombre de usuario del comentarista y el título del video
SELECT c.*, u.nombre_usuario, v.titulo FROM comentarios c
INNER JOIN usuarios u ON c.id_usuario = u.id
INNER JOIN videos v ON c.id_video = v.id;

/*Actualizar datos*/
-- Actualizar el título de un video
UPDATE videos SET titulo = 'Mi primer video actualizado' WHERE id = 1;

-- Actualizar el contenido de un comentario
UPDATE comentarios SET contenido = '¡Gran video! Me encantó mucho.' WHERE id = 1;

/*Eliminar datos*/
-- Eliminar un comentario específico
DELETE FROM comentarios WHERE id = 2;

-- Eliminar un video específico (esto también eliminará los comentarios asociados debido a la clave foránea con ON DELETE CASCADE)
DELETE FROM videos WHERE id = 1;
