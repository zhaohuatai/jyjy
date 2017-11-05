import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './routes/App';
import Index from './routes/index';
import Login from './routes/login/Login';
import Column from './routes/column';

const Routers = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="/column" component={Column} />
        <Route path="/course" component={Login} />
        <Route path="/my" component={Login} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  );
};

export default Routers;
