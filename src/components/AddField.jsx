import React from 'react';

import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({addTask, checkbox, setCheckbox}) => { 
  return (
    <form onSubmit={(event) => addTask(event)} className="field">
      <Checkbox
        type="checkbox"
        checked={checkbox}
        onChange={() => setCheckbox(!checkbox)}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        name='checkbox'
      />
      <TextField name="text" placeholder="Введите текст задачи..." variant="standard" fullWidth />
      <Button type="submit">
        <AddIcon />
      </Button>
    </form>
  );
};
