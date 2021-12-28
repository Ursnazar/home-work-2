import React from "react";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Divider, Button, List } from "@mui/material";
import { AddField } from "./components/AddField";
import Filter from "./components/Filter";
import { Item } from "./components/Item";
import { addTask, completeTask, deleteTask } from "./redux/actions/task";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddTask = (inputText, inputCheckbox) => {
    dispatch(addTask(inputText, inputCheckbox));
  };

  const handleCompleteTask = ({ id, completed }) => {
    dispatch(completeTask(id, completed));
  };

  const handleDeleteTask = ({ id }) => {
    if (window.confirm("Вы точно хотите удалить задачу?")) {
      dispatch(deleteTask(id));
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
    if (state.task.some((obj) => obj.completed === false)) {
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

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField handleAddTask={handleAddTask} />
        <Divider />
        <Filter />
        <Divider />
        <List>
          <Item
            state={state}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
            editeTask={editeTask}
          />
        </List>
        <Divider />
        <div className="check-buttons">
          <Button disabled={!state.task.length} onClick={markAllTasks}>
            {state.task.every((obj) => obj.completed === true)
              ? "Снять отметки"
              : "Отметить всё"}
          </Button>
          <Button disabled={!state.task.length} onClick={deleteAllTasks}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
