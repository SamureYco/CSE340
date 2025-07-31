// 404 Not Found
app.use((req, res, next) => {
  res.status(404).render('error', { errorCode: 404, message: 'Page not found' });
});

// 500 Internal Server Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { errorCode: 500, message: 'Something went wrong!' });
});