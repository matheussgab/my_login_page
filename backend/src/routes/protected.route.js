const express = require('express');
const authenticateToken = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    res.send( `Hello ${req.user.email}, you have accessed a protected route!`);

});

module.exports = router;