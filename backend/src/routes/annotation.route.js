const express = require('express');
const router = express.Router();
const db = require('../db/database');
const authMiddleware = require('../middleware/auth.middleware');

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// Route to create a new annotation
router.post('/create', (req, res) => {
    // Access data from the request body
    const userId = req.user.id;
    const { title, annotation } = req.body;

    // Insert the annotation into the database
    db.run('INSERT INTO annotations (user_id, title, content) VALUES (?, ?, ?)',
        [userId, title, annotation],
        function (err) {
            if (err) {
                console.error('Error inserting annotation:', err.message);
                return res.status(500).json({ error: 'Failed to create annotation' });
            }

            // Get the ID of the newly created annotation
            const annotationId = this.lastID;
            return res.status(201).json({
                message: `Annotation ${title} created successfully!`,
                annotationId: this.lastID
            });

        });
});

// Route to get all annotations for the authenticated user
router.get('/read', (req, res) => {
    // Access user ID from the authenticated request
    const userId = req.user.id;

    db.all('SELECT * FROM annotations WHERE user_id = ?',
        [userId],
        (err, annotations) => {
            if (err) {
                console.error(
                    'Error fetching annotations:', err.message
                );

                return res.status(500).json({
                    error: 'Failed to fetch annotations'
                });
            }

            return res.json(annotations);

        }
    );
});

module.exports = router;