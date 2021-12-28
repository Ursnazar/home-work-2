export const addTask = (inputText, inputCheckbox) => {
  return {
    type: "ADD_TASK",
    payload: {
      id: "",
      completed: inputCheckbox,
      text: inputText,
    },
  };
};

export const completeTask = (id, completed) => {
  return {
    type: "COMPLETE_TASK",
    payload: {
      id: id,
      completed: !completed,
    },
  };
};

export const deleteTask = (id) => {
  return {
    type: "DELETE_TASK",
    payload: id,
  };
};
