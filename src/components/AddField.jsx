import React from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = ({ handleAddTask }) => {
  const [inputText, setInputText] = React.useState("");
  const [inputCheckbox, setInputCheckbox] = React.useState(false);

  const handleSubmit = () => {
    handleAddTask(inputText, inputCheckbox);
    setInputText("");
    setInputCheckbox(false);
  };

  return (
    <div className="field">
      <Checkbox
        name="checkbox"
        type="checkbox"
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={inputCheckbox}
        onChange={(event) => setInputCheckbox(event.target.checked)}
      />
      <TextField
        name="text"
        placeholder="Введите текст задачи..."
        variant="standard"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        fullWidth
      />
      <Button onClick={handleSubmit}>
        <AddIcon />
      </Button>
    </div>
  );
};
