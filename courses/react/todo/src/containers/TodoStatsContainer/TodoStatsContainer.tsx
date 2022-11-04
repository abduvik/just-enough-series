import { useEffect, useState } from "react";
import { Todo } from "../../models/Todo";

import classes from "./TodoStatsContainer.module.scss";

export const TodoStatsContainer = ({ todoService }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    todoService.getAllTodos().then((todos: Todo[]) => {
      setTodos(todos);
    });
  }, []);

  const doneTodos = todos.filter((todo) => todo.isDone);
  const notDoneTodos = todos.filter((todo) => !todo.isDone);

  return (
    <div>
      <h2>Stats</h2>
      <div className={classes.StatsBoardContainer}>
        <div className={classes.StatsBoard}>
          <div className={classes.BoardTitle}>To do ({doneTodos.length})</div>
          <ul>
            {doneTodos.map((todo) => (
              <li key={todo.id}>{todo.task}</li>
            ))}
          </ul>
        </div>
        <div className={classes.StatsBoard}>
          <div className={classes.BoardTitle}>Done ({notDoneTodos.length})</div>
          <ul>
            {notDoneTodos.map((todo) => (
              <li key={todo.id}>{todo.task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
