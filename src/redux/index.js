import { createStore } from "redux";

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
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            task.text = action.payload.text;
          }
          return task;
        }),
      };
    default:
      return state.tasks;
  }
}

const store = createStore(reducer, {
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
    {
      id: 3,
      text: "Task 3",
      completed: false,
    },
  ],
});

export default store;
