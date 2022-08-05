import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";

const serverPath = "http://localhost:4000/todo";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const fetchData = () => {
    fetch(serverPath)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  };

  const onSubmit = () => {
    fetch(serverPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newItem }),
    }).then(() => {
      fetchData();
      setNewItem("");
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello from Docker!!!</p>
        <div>
          <input onInput={(e) => setNewItem(e.target.value)} value={newItem} />
          <button onClick={onSubmit}>Add new Item</button>
        </div>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
