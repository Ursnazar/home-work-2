const initialState = [
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
  {
    id: 3,
    text: "Task 3",
    completed: false,
  },
];

export function taskReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_TASKS":
      return action.payload;
    case "ADD_TASK":
      const lastId = !state.length ? 1 : state[state.length - 1].id + 1;
      return [...state, { ...action.payload, id: lastId }];
    case "COMPLETE_TASK":
      return state.map((task) => {
        if (action.payload.id === task.id) {
          task.completed = action.payload.completed;
        }
        return task;
      });
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "REMOVE_ALL_TASKS":
      return (state = []);
    case "MARK_TASKS":
      return state.map((item) => {
        return action.payload
          ? { ...item, completed: true }
          : { ...item, completed: false };
      });
    case "UPDATE_TASK":
      return state.map((task) => {
        if (task.id === action.payload.id) {
          task.text = action.payload.text;
        }
        return task;
      });
    default:
      return state;
  }
}
