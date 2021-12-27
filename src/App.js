import React from "react";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(state);

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
    if (state.tasks.some((obj) => obj.completed == false)) {
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

  const editeTask = (id) => {
    const updateText = window.prompt("Введите новую задачу");
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id: id,
        text: updateText,
      },
    });
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
            editeTask={editeTask}
          />
        </List>
        <Divider />
        <div className="check-buttons">
          <Button disabled={!state.tasks.length} onClick={markAllTasks}>
            {state.tasks.every((obj) => obj.completed === true)
              ? "Снять отметки"
              : "Отметить всё"}
          </Button>
          <Button disabled={!state.tasks.length} onClick={deleteAllTasks}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
