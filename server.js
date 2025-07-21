// server.js

// 1. Requiere Express
const express = require('express');
const app = express();
const path = require('path');
const inventoryRoute = require("./routes/inventoryRoute");

// 2. Define el puerto
const port = process.env.PORT || 3000;

// 3. Usa EJS como motor de plantillas
app.set('view engine', 'ejs');

// 4. Establece la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// 5. Carpeta de archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// 6. Ruta principal (home page)
app.get('/', (req, res) => {
  res.render('index');
});

// 7. Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
 
app.use("/inventory", inventoryRoute);