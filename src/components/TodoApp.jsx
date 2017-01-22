import React from 'react';
import { connect } from 'react-redux';

import AddTodo from './AddTodo';
import Filter from './Filter';
import TodoList from './TodoList';

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

const TodoApp = ({ todos, filter, onTodoClick }) => (
  <div>
    <AddTodo />

    <TodoList
      todos={
        getVisibleTodos(todos, filter)
      }
      onTodoClick={onTodoClick}
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
TodoApp.propTypes = {
  todos: React.PropTypes.array.isRequired,
  filter: React.PropTypes.string.isRequired,
  onTodoClick: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    todos: state.todos,
    filter: state.filter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTodoClick: (todo) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id: todo.id,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
