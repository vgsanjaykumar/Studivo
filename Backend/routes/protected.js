const express = require('express');
const { authenticateJWT, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/admin', authenticateJWT, authorizeRole('admin'), (req, res) => {
    res.json({message: 'Welcome, admin'})
});

router.get('/student', authenticateJWT, (req, res) => {
    res.json({message: 'Welcome, Student'})
});
 
router.get('/tutor', authenticateJWT, (req, res) => {
    res.json({message: 'Welcome, Tutor'})
});

module.exports = router;