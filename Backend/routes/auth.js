const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashPassword, role });
        await user.save()
        res.json({message: 'New user is registered!'});
    } catch (err) {
        return res.status(500).json({message: 'Registration is failed'});
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({message: 'Invalid Credentials'});
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn : '1h'})
        res.json({token});
    } catch (err) {
        return res.status(500).json({message: 'Error in Logging in ', error: err.message});
    }
})

module.exports = router;