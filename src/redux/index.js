import { createStore, combineReducers } from "redux";
import { taskReducer } from "./reducers/task";
import { filterReducer } from "./reducers/filter";

const RootReducers = combineReducers({
  task: taskReducer,
  filter: filterReducer,
});

const store = createStore(RootReducers);

console.log(store.getState());

export default store;
