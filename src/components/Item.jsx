import React from 'react';
import { IconButton, Checkbox, ListItem, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Item = ({  tasks, completeTask }) => {
  return (
    <React.Fragment>
      {tasks.map((task) =>
      <ListItem key={task.id}>
        <div className="d-flex item" >
          <Checkbox icon={<RadioButtonUncheckedIcon />} onChange={() => completeTask(task.id, task.completed)} checked={task.completed} checkedIcon={<CheckCircleIcon />} />
          <Typography className="item-text">{task.text}</Typography>
          <div className="item-buttons d-flex">
            <IconButton>
              <EditIcon style={{ fontSize: 20 }} />
            </IconButton>
            <IconButton>
              <DeleteOutlineIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
        </div>
      </ListItem>
      )}
    </React.Fragment>
  );
};
