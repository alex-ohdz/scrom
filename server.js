const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const html = fs.readFileSync(path.join(__dirname, 'Tema1.html'), 'utf8');

const markers = [
  { id: '1.1', marker: '1.1 Fundamentos' },
  { id: '1.2', marker: '1.2 Claves' },
  { id: '1.3', marker: '1.3 Funcionamiento' },
  { id: '1.4', marker: '1.4 Herramientas' },
  { id: 'actividad', marker: '2. Completa' }
];

const sections = {};
markers.forEach((m, i) => {
  const start = html.indexOf(m.marker);
  const end = i < markers.length - 1 ? html.indexOf(markers[i + 1].marker, start) : html.length;
  sections[m.id] = start !== -1 ? html.slice(start, end) : '';
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/section/:id', (req, res) => {
  const id = req.params.id;
  res.send(sections[id] || '');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
