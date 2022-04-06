const express = require('express')
// const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

db = process.env.DB_URL

const app = express();
app.use(express.json());
app.use(cors());

// mongoose.connect(db, {
//     useNewUrlParser: true,
//     useNewUrlParser: true,
// })
//     .then(() => console.log("connected to database"))
//     .catch(console.error)

const connect = require("./config/db")
connect()

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })

    todo.save();

    res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json({ result });
});

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.text = req.body.text;

    todo.save();

    res.json(todo);
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`MERN app listening at http://localhost:${PORT}`)
})
