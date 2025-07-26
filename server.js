// server.js

const express = require('express');
const path = require('path');
const app = express();
const inventoryRoute = require("./routes/inventoryRoute");

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.render('index', { title: "Home" });
});
app.use("/inventory", inventoryRoute);

// Middleware de error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('errors/error', {
    title: "Error",
    message: "Something went wrong!",
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
