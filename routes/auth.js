const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret123';

// Signup
router.post('/signup', async (req, res) => { 
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync('users.json'));

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now().toString(),
        username,
        password: hashed
    };

    users.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.json({ message: 'User created' });
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync('users.json'));

    const user = users.find(u => u.username === username);

    if (!user) return res.status(401).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.id, username }, JWT_SECRET);

    res.json({ token });
});

module.exports = router;