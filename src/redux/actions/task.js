export const requestTasks = () => async (dispatch) => {
  const resp = await fetch("https://61bcac53d8542f0017824937.mockapi.io/tasks");
  if (resp.ok) {
    const data = await resp.json();
    dispatch({
      type: "FETCH_TASKS",
      payload: data,
    });
  }
};

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

export const deleteAllTasks = () => {
  return {
    type: "REMOVE_ALL_TASKS",
  };
};

export const markAllTasksComplete = () => {
  return {
    type: "MARK_TASKS",
    payload: true,
  };
};

export const markAllTasksNotComplete = () => {
  return {
    type: "MARK_TASKS",
    payload: false,
  };
};

export const editeTask = (id, updateText) => {
  return {
    type: "UPDATE_TASK",
    payload: {
      id: id,
      text: updateText,
    },
  };
};
