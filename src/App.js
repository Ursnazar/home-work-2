import React from "react";

import "./index.scss";

import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(tasks, action) {
  switch (action.type) {
    case "ADD_TASK":
      const index = tasks.length - 1;
      const lastId = tasks[index].id;
      action.newTask.id = lastId + 1;
      const newTask = action.newTask;
      tasks = [...tasks, newTask];
      return tasks;
    case "TODO":
      const index2 = tasks.findIndex((item) => item.id === action.id);
      const newTask2 = tasks.slice();
      newTask2[index2].completed = action.completed;
      tasks = newTask2;
      return tasks;
    default:
      return tasks;
  }
}

function App() {
  const [checkbox, setCheckbox] = React.useState(false);

  const [tasks, dispatch] = React.useReducer(reducer, [
    {
      id: 1,
      text: "Task 1",
      completed: false,
    },
  ]);

  const addTask = (event) => {
    event.preventDefault();

    const completed = event.target.checkbox.checked;
    const text = event.target.text.value;

    dispatch({
      type: "ADD_TASK",
      newTask: {
        id: "",
        completed: completed,
        text: text,
      },
    });
    setCheckbox(false);
    event.target.reset();
  };

  const completeTask = (id, completed) => {
    dispatch({
      type: "TODO",
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
        <AddField
          addTask={addTask}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
        />
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
