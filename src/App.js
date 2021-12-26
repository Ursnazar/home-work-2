import React from "react";

import "./index.scss";

import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      const lastId = !state.tasks.length
        ? 1
        : state.tasks[state.tasks.length - 1].id + 1;
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: lastId }],
      };
    case "COMPLETE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (action.payload.id === task.id) {
            task.completed = action.payload.completed;
          }
          return task;
        }),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "REMOVE_ALL_TASKS":
      return {
        ...state,
        tasks: (state.tasks = []),
      };
    case "MARK_TASKS":
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          return action.payload
            ? { ...item, completed: true }
            : { ...item, completed: false };
        }),
      };
    case "SET_FILTER":
      return {
        ...state,
        filterBy: action.payload,
      };

    default:
      return state.tasks;
  }
}

function App() {
  const [textButton, setTextButton] = React.useState({
    addMark: true,
  });

  const [state, dispatch] = React.useReducer(reducer, {
    filterBy: "all",
    tasks: [
      {
        id: 1,
        text: "Task 1",
        completed: false,
      },
      {
        id: 2,
        text: "Task 2",
        completed: false,
      },
    ],
  });

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
    if (window.confirm("Вы точно хотите удалить все задачи?")) {
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

  const filterIndex = {
    all: 0,
    active: 1,
    completed: 2,
  };

  const setFilter = (_, newIndex) => {
    const status = Object.keys(filterIndex)[newIndex];
    console.log(status);
    dispatch({
      type: "SET_FILTER",
      payload: status,
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
        <Tabs onChange={setFilter} value={filterIndex[state.filterBy]}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          <Item
            state={state}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        </List>
        <Divider />
        <div className="check-buttons">
          <Button /* disabled={!state.tasks.length} */ onClick={markAllTasks}>
            {textButton.addMark ? "Отметить всё" : "Снять отметки"}
          </Button>
          <Button /* disabled={!state.tasks.length} */ onClick={deleteAllTasks}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
