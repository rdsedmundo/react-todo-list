import React from 'react';
import { connect } from 'react-redux';

let todoId = 0;

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input
        ref={(node) => {
          input = node;
        }}
        type="text"
      />
      <button
        onClick={() => {
          dispatch({
            type: 'ADD_TODO',
            id: todoId += 1,
            text: input.value,
          });

          input.value = '';
        }}
      >
        Add
      </button>
    </div>
  );
};
AddTodo.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(AddTodo);;
