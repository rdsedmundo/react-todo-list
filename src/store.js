import { combineReducers, createStore } from 'redux';

import { loadState, saveState } from './storage';
import { todoReducer, filterReducer } from './reducers';

const todoApp = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
});

/* eslint-disable no-underscore-dangle */
const reduxExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

const previousState = loadState();

const store = createStore(todoApp, previousState, reduxExtension);

store.subscribe(() => saveState({
  todos: store.getState().todos,
}));

export default store;
