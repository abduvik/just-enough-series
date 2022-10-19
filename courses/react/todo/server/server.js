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
  res.send(JSON.stringify(todosDB));
});

app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const item = todosDB.find((item) => item.id === todoId);
  res.send(JSON.stringify(item)); //@todo to be implmented
});

app.post("/todos", (req, res) => {
  const todo = req.body.todo;
  const newTask = {
    task: todo,
    id: todosDB[todosDB.length - 1].id + 1,
  };
  todosDB.push(newTask);
  res.send(JSON.stringify(newTask));
});

app.patch("/todos", (req, res) => {
  const itemId = req.body.id;
  const itemIndex = todosDB.findIndex((todo) => todo.id === itemId);
  const updatedItem = {
    ...todosDB[itemIndex],
    ...req.body,
    id: itemId,
  };
  todosDB[itemIndex] = updatedItem;
  todosDB.splice(itemIndex, 1);
  res.send(JSON.stringify(updatedItem));
});

app.delete("/todos", (req, res) => {
  const itemId = req.body.id;
  const itemIndex = todosDB.findIndex((todo) => todo.id === itemId);
  todosDB.splice(itemIndex, 1);
  res.send({ id: req.body.id });
});

app.listen(3001, () => {
  console.log("Server Started!");
});

// Kill process if ctrl+c is clicked
process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  process.exit();
});
