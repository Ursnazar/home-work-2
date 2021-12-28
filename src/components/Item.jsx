import React from "react";
import { IconButton, Checkbox, ListItem, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const Item = ({
  state,
  handleCompleteTask,
  handleDeleteTask,
  editeTask,
}) => {
  return (
    <React.Fragment>
      {state.task
        .filter((obj) => {
          if (state.filter.filterBy === "all") {
            return true;
          }
          if (state.filter.filterBy === "completed") {
            return obj.completed;
          }
          if (state.filter.filterBy === "active") {
            return !obj.completed;
          }
        })
        .map((task) => (
          <ListItem key={task.id}>
            <div className="d-flex item">
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                onChange={() => handleCompleteTask(task)}
                checked={task.completed}
                checkedIcon={<CheckCircleIcon />}
              />
              <Typography className="item-text">{task.text}</Typography>
              <div className="item-buttons d-flex">
                <IconButton onClick={() => editeTask(task.id)}>
                  <EditIcon style={{ fontSize: 20 }} />
                </IconButton>
                <IconButton onClick={() => handleDeleteTask(task)}>
                  <DeleteOutlineIcon style={{ fontSize: 20 }} />
                </IconButton>
              </div>
            </div>
          </ListItem>
        ))}
    </React.Fragment>
  );
};
