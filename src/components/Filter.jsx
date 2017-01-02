import React, { Component } from 'react';
import store from '../store';

class Filter extends Component {
  render() {
    const filter = this.props.filter;
    const currentFilter = this.props.currentFilter;
    const children = this.props.children;

    if (filter === currentFilter) {
      return <span>{ children }</span>;
    }

    return (
      <a
        href="#filter-[{filter}]"
        onClick={(event) => {
          event.preventDefault();

          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter,
          });
        }}
      >
        { children }
      </a>
    );
  }
}

Filter.propTypes = {
  filter: React.PropTypes.string.isRequired,
  currentFilter: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired,
};

export default Filter;
