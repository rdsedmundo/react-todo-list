import { combineReducers, createStore } from 'redux';
import { todoReducer, filterReducer } from './reducers';

const todoApp = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
});

const store = createStore(todoApp);

export default store;
