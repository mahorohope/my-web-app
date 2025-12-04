// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// root route
app.get('/', (req, res) => {
  res.type('text').send('Hello, World!');
});

// about route requested in assignment
app.get('/about', (req, res) => {
  res.type('text').send('About Page');
});

// default 404 for other paths
app.use((req, res) => {
  res.status(404).type('text').send('Not Found');
});

app.listen(port, () => {
  console.log(Server running at http://localhost:${port});
});