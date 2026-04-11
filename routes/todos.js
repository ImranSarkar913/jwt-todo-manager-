const express = require('express');
const router = express.Router();
const fs = require('fs');
const authMiddleware = require('../middleware/authMiddleware');

// Add Todo
router.post('/', authMiddleware, (req, res) => {
    const todos = JSON.parse(fs.readFileSync('todos.json'));

    const newTodo = {
        id: Date.now().toString(),
        userId: req.user.id,
        text: req.body.text,
        createdAt: new Date()
    };

    todos.push(newTodo);
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));

    res.json(newTodo);
});

// Get Todos
router.get('/', authMiddleware, (req, res) => {
    const todos = JSON.parse(fs.readFileSync('todos.json'));

    const userTodos = todos.filter(t => t.userId === req.user.id);

    res.json(userTodos);
});

// Delete Todo
router.delete('/:id', authMiddleware, (req, res) => {
    let todos = JSON.parse(fs.readFileSync('todos.json'));

    todos = todos.filter(
        t => !(t.id === req.params.id && t.userId === req.user.id)
    );

    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));

    res.json({ message: 'Deleted' });
});

module.exports = router;