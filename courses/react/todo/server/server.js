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
app.get("/todo", (req, res) => {
  res.send(JSON.parse(todosDB));
});

app.get("/todo/:id", (req, res) => {
  const item = todosDB.find((item) => item.id === req.params.id);
  res.send(JSON.parse(item)); //@todo to be implmented
});

app.post("/todo", (req, res) => {
  const item = req.body;
  todosDB.push({
    ...item,
    id: todosDB[todosDB.length - 1].id + 1,
  });
  res.send(item);
});

app.patch("/todo", (req, res) => {
  const itemId = req.body.id;
  const itemIndex = todosDB.findIndex((todo) => todo.id === itemId);
  todosDB[itemIndex] = {
    ...todosDB[itemIndex],
    ...req.body,
    id: itemId,
  };
  todosDB.splice(itemIndex, 1);
  res.send({});
});

app.delete("/todo", (req, res) => {
  const itemId = req.body.id;
  const itemIndex = todosDB.findIndex((todo) => todo.id === itemId);
  todosDB.splice(itemIndex, 1);
  res.send({});
});

app.listen(3000, () => {
  console.log("Server Started!");
});

// Kill process if ctrl+c is clicked
process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  process.exit();
});
