const express = require('express');
const app = express();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
}); 

