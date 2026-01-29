// index.js
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE = "todos.json";

// helper: read todos
function readTodos() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, "[]");
    }

    const data = fs.readFileSync(FILE, "utf-8");
    return data ? JSON.parse(data) : [];
}


// helper: write todos
function writeTodos(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

/* ================== APIs ================== */

// GET all todos
app.get("/todos", (req, res) => {
    const todos = readTodos();
    res.json(todos);
});

// GET todo by id
app.get("/todos/:id", (req, res) => {
    const todos = readTodos();
    const todo = todos.find(t => t.id == req.params.id);

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
});

// CREATE todo
app.post("/todos", (req, res) => {
    const todos = readTodos();
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title required" });
    }

    const newTodo = {
        id: Date.now(),
        title,
        completed: false
    };

    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json(newTodo);
});

// UPDATE todo
app.put("/todos/:id", (req, res) => {
    const todos = readTodos();
    const index = todos.findIndex(t => t.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const { title, completed } = req.body;
    if (title !== undefined) todos[index].title = title;
    if (completed !== undefined) todos[index].completed = completed;

    writeTodos(todos);
    res.json(todos[index]);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
    const todos = readTodos();
    const newTodos = todos.filter(t => t.id != req.params.id);

    if (todos.length === newTodos.length) {
        return res.status(404).json({ message: "Todo not found" });
    }

    writeTodos(newTodos);
    res.json({ message: "Todo deleted" });
});

/* ========================================== */

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
