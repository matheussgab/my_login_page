const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/database');
const jwt = require('jsonwebtoken');

// In-memory user storage (for demonstration purposes only)
//const users = [];

router.post('/login', (req, res) => {
    // Access login data from the request body
    const { email, password } = req.body;

    // Find the user by email in the users array (for demonstration purposes only)
    //const user = users.find(u => u.email === email);
    //if (!user) {
    //    return res.status(401).send('Invalid credentials');
    //}

    // Query the database for the user
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) {
            console.error('Error querying database:', err.message);
            return res.status(500).send('Internal server error');
        }
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, user: { id: user.id, email: user.email } });

    });
});

router.post('/register', (req, res) => {
    // Access registration data from the request body
    const { email, password } = req.body;

    // Hash the password using bcrypt
    const saltRounds = 10;
    var hash = bcrypt.hashSync(password, saltRounds);

    // Store the user data (email and hashed password) in the users array
    //users.push({ email, password: hash });

    // Insert the user into the database
    db.run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hash], function (err) {
        if (err) {
            console.error('Error inserting user into database:', err.message);
            return res.status(500).send('Internal server error');
        }

        res.send(`${email} registered successfully! senha ${password} hash ${hash}`);
    });

});

module.exports = router;