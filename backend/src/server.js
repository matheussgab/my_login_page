// Environment variables
require('dotenv').config();

// server.js
const express = require('express');
const cors = require('cors');

// Import route handlers
const authRoutes = require('./routes/auth.route');
const protectedRoutes = require('./routes/protected.route');
const annotationRoutes = require('./routes/annotation.route');

const app = express();
const port = process.env.PORT; // 3000

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Test server');
});

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/annotations', annotationRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});