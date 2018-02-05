import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Router from './router';

import './utils/index.scss';

import redirect_filter from './utils/filter';

redirect_filter();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app'),
);
