const express = require('express');
const app = express();
const port = 3000;

app.get('/api/data', (req, res) => {
  // Aquí puedes definir la lógica para manejar las solicitudes y enviar respuestas al componente Angular.
  res.json({ message: 'Respuesta desde el servidor Node.js' });
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
