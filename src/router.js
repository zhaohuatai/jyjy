import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './routes/App';
import Index from './routes/index';
import Login from './routes/login/Login';
import Column from './routes/column';
import User from './routes/user/User';
import Course from './routes/course';
import CourseDetail from './routes/course/CourseDetail';
import ColumnDetail from './routes/column/ColumnDetail';

const Routers = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="/column" component={Column} />
        <Route path="/column/:id" component={ColumnDetail} />
        <Route path="/course" component={Course} />
        <Route path="/course/:id" component={CourseDetail} />
        <Route path="/my" component={User} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  );
};

export default Routers;
