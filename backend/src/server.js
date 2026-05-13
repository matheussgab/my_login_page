require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db/database');
const authRoutes = require('./routes/auth.route');
const protectedRoutes = require('./routes/protected.route');

const app = express();
const port = process.env.PORT; // 3000

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Test server');
});

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});