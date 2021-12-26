import React from "react";

import "./index.scss";

import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(tasks, action) {
  switch (action.type) {
    case "ADD_TASK":
      const lastId = !tasks.length ? 1 : tasks[tasks.length - 1].id + 1;
      return [...tasks, { ...action.payload, id: lastId }];
    case "COMPLETE_TASK":
      return tasks.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, completed: action.payload.completed };
        }
        return item;
      });
    case "DELETE_TASK":
      return tasks.filter((task) => task.id !== action.payload);
    case "REMOVE_ALL_TASKS":
      return [];
    case "MARK_TASKS":
      return tasks.map((item) => {
        return action.payload
          ? { ...item, completed: true }
          : { ...item, completed: false };
      });
    default:
      return tasks;
  }
}

function App() {
  const [textButton, setTextButton] = React.useState({
    addMark: true,
  });

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
      payload: {
        id: "",
        completed: inputCheckbox,
        text: inputText,
      },
    });
  };

  const completeTask = ({ id, completed }) => {
    dispatch({
      type: "COMPLETE_TASK",
      payload: {
        id: id,
        completed: !completed,
      },
    });
  };

  const deleteTask = ({ id }) => {
    if (window.confirm("Вы точно хотите удалить задачу?")) {
      dispatch({
        type: "DELETE_TASK",
        payload: id,
      });
    } else return;
  };

  const deleteAllTasks = () => {
    let isOk = window.confirm("Вы точно хотите удалить все задачи?");
    if (isOk) {
      dispatch({
        type: "REMOVE_ALL_TASKS",
      });
    }
  };

  const markAllTasks = () => {
    setTextButton({ ...textButton, addMark: !textButton.addMark });
    if (textButton.addMark) {
      dispatch({
        type: "MARK_TASKS",
        payload: true,
      });
    } else {
      dispatch({
        type: "MARK_TASKS",
        payload: false,
      });
    }
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
          <Item
            tasks={tasks}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={markAllTasks}>
            {textButton.addMark ? "Отметить всё" : "Снять отметки"}
          </Button>
          <Button onClick={deleteAllTasks}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
