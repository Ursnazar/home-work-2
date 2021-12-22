import React from "react";

import "./index.scss";

import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(tasks, action) {
  switch (action.type) {
    case "ADD_TASK":
      const lastId = !tasks.length ? 1 : tasks[tasks.length - 1].id + 1;
      return [...tasks, { ...action.newTask, id: lastId }];
    case "COMPLETE_TASK":
      return tasks.map((item) => {
        if (item.id === action.id) {
          return { ...item, completed: action.completed };
        }
        return item;
      });
    default:
      return tasks;
  }
}

function App() {
  const [tasks, dispatch] = React.useReducer(reducer, [
    {
      id: 1,
      text: "Task 1",
      completed: false,
    },
  ]);

  const addTask = (inputText, inputCheckbox) => {
    dispatch({
      type: "ADD_TASK",
      newTask: {
        id: "",
        completed: inputCheckbox,
        text: inputText,
      },
    });
  };

  const completeTask = ({ id, completed }) => {
    dispatch({
      type: "COMPLETE_TASK",
      id: id,
      completed: !completed,
    });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField addTask={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          <Item tasks={tasks} completeTask={completeTask} />
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
