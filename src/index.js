const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const startTime = Date.now();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime_seconds: Math.floor((Date.now() - startTime) / 1000),
    version: require('../package.json').version,
    timestamp: new Date().toISOString(),
  });
});

// Hello World endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
