const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

// Create a db.json file if it doesn't exists
const dbPath = path.resolve(__dirname, "./.db");
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath);
}

const db = path.resolve(__dirname, "./.db/db.json");
if (!fs.existsSync(db)) {
  fs.writeFileSync(db, "[]", { flag: "w" });
}

// API Endpoints
app.get("/todo", (req, res) => {
  const todos = fs.readFileSync(db);
  res.send(JSON.parse(todos));
});

app.post("/todo", (req, res) => {
  const item = req.body.name;
  const todos = JSON.parse(fs.readFileSync(db));
  todos.push(item);
  fs.writeFileSync(db, JSON.stringify(todos));
  res.send(todos);
});

app.listen(3000, () => {
  console.log("Server Started!");
});

// Kill process if ctrl+c is clicked
process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  process.exit();
});
