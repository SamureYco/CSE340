const express = require('express');
const path = require('path');
const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rutas
const inventoryRoutes = require('./routes/inventoryRoute');
app.use('/inv', inventoryRoutes);

// Ruta de prueba temporal
app.get('/', (req, res) => {
  res.send('Home page working!');
});

// 404 Not Found
app.use((req, res, next) => {
  res.status(404).render('errors/error', {
    errorCode: 404,
    message: 'Page not found'
  });
});

// 500 Internal Server Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('errors/error', {
    errorCode: 500,
    message: 'Something went wrong!'
  });
});

// ✅ Escuchar el servidor: DEBE ir al final
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
