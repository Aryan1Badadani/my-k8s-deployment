// src/app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from my Kubernetes app running on Docker Desktop!');
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
