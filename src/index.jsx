import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotReloader } from 'react-hot-loader';
import { Provider } from 'react-redux';

import TodoApp from './components/TodoApp';
import store from './store';

const render = () => {
  ReactDOM.render(
    <HotReloader>
      <Provider store={store}>
        <TodoApp />
      </Provider>
    </HotReloader>,
    document.getElementById('root'),
  );
};

if (module.hot) module.hot.accept('.', render);

render();
