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
import School from './routes/school/School';
import Profession from './routes/profession/Profession';
import Career from './routes/career/Career';
import Expert from './routes/expert/Expert';
import ExpertDetail from './routes/expert/ExpertDetail';
import News from './routes/news/News';
import NewsDetail from './routes/news/NewsDetail';

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
        <Route path="/school" component={School} />
        <Route path="/career" component={Career} />
        <Route path="/profession" component={Profession} />
        <Route path="/expert/:id" component={ExpertDetail} />
        <Route path="/expert" component={Expert} />
        <Route path="/news" component={News} />
        <Route path="/news/:id" component={NewsDetail} />
      </Route>
    </Router>
  );
};

export default Routers;
