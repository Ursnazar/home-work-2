import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { taskReducer } from "./reducers/task";
import { filterReducer } from "./reducers/filter";

const RootReducers = combineReducers({
  task: taskReducer,
  filter: filterReducer,
});

const store = createStore(RootReducers, applyMiddleware(thunk));

console.log(store.getState());

export default store;
