require('dotenv').config();
const express = require('express');
const app = express();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});