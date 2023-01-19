const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const todosDB = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./db.json"))
);

// API Endpoints
app.get("/todos", (req, res) => {
  const { isDone } = req.query;

  if (isDone === "true") {
    const filteredTodos = todosDB.filter((todo) => todo.isDone === true);
    res.json(filteredTodos);
  } else if (isDone === "false") {
    const filteredTodos = todosDB.filter((todo) => todo.isDone === false);
    res.json(filteredTodos);
  } else {
    res.json(todosDB);
  }
});

app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const item = todosDB.find((item) => item.id === todoId);
  res.json(item);
});

app.post("/todos", (req, res) => {
  const todo = req.body.todo;
  const todoId = todosDB.length ? todosDB[todosDB.length - 1].id + 1 : 1;
  const newTask = {
    task: todo,
    id: todoId,
    isDone: false,
  };
  todosDB.push(newTask);
  res.json(newTask);
});

app.patch("/todos/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = todosDB.findIndex((todo) => todo.id === itemId);
  const updatedItem = {
    ...todosDB[itemIndex],
    ...req.body,
    id: itemId,
  };
  todosDB[itemIndex] = updatedItem;
  res.json(updatedItem);
});

app.delete("/todos", (req, res) => {
  const itemId = req.body.id;
  const itemIndex = todosDB.findIndex((todo) => todo.id === itemId);
  todosDB.splice(itemIndex, 1);
  res.json({ id: req.body.id });
});

app.listen(3001, () => {
  console.log("Server Started!");
});

// Kill process if ctrl+c is clicked
process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  process.exit();
});
