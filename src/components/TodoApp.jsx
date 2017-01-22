import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer as HotReloader } from 'react-hot-loader';

import Filter from './Filter';
import store from '../store';

let todoId = 0;

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;

    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);

    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);

    default:
      return todos;
  }
};

function Todo({ onClick, text, completed }) {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none',
      }}
    >
      {text}
    </li>
  );
}

Todo.PropTypes = {
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
};

function TodoList({ todos, onTodoClick }) {
  return (
    <ul>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo)}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  onTodoClick: React.PropTypes.func.isRequired,
};

class TodoApp extends Component {
  render() {
    const todos = this.props.state.todos;
    const filter = this.props.state.filter;

    const visibleTodos = getVisibleTodos(todos, filter);

    return (
      <div>
        <input
          ref={(node) => {
            this.input = node;
          }}
          type="text"
        />
        <button
          onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              id: todoId += 1,
              text: this.input.value,
            });

            this.input.value = '';
          }}
        >
          Add
        </button>

        <TodoList
          todos={visibleTodos}
          onTodoClick={(todo) => {
            store.dispatch({
              type: 'TOGGLE_TODO',
              id: todo.id,
            });
          }}
        />

        <p>
          Filter:
          {' '}
          <Filter filter="SHOW_ALL" currentFilter={filter}>
            All
          </Filter>
          {' '}
          <Filter filter="SHOW_ACTIVE" currentFilter={filter}>
            Active
          </Filter>
          {' '}
          <Filter filter="SHOW_COMPLETED" currentFilter={filter}>
            Completed
          </Filter>
        </p>
      </div>
    );
  }
}

TodoApp.propTypes = {
  state: React.PropTypes.object.isRequired,
};

const render = () => {
  ReactDOM.render(
    <HotReloader>
      <Provider store={store}>
        <TodoApp
          state={store.getState()}
        />
      </Provider>
    </HotReloader>,
    document.getElementById('root'),
  );
};

if (module.hot) module.hot.accept('./TodoApp', render);

store.subscribe(render);
render();
