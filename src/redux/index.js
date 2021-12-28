import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import axios from "axios";
import { taskReducer } from "./reducers/task";
import { filterReducer } from "./reducers/filter";

const RootReducers = combineReducers({
  task: taskReducer,
  filter: filterReducer,
});

const log = (store) => (next) => (action) => {
  if (action.type === "ADD_TASK") {
    axios.post(
      "https://61bcac53d8542f0017824937.mockapi.io/tasks",
      action.payload
    );
  }
  next(action);
};

const store = createStore(
  RootReducers,
  composeWithDevTools(applyMiddleware(thunk, log))
);

console.log(store.getState());

export default store;
