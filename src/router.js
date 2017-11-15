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
import SchoolDetail from './routes/school/SchoolDetail';
import Profession from './routes/profession/Profession';
import ProfessionDetail from './routes/profession/ProfessionDetail';
import Career from './routes/career/Career';
import CareerDetail from './routes/career/CareerDetail';
import Expert from './routes/expert/Expert';
import ExpertDetail from './routes/expert/ExpertDetail';
import News from './routes/news/News';
import NewsDetail from './routes/news/NewsDetail';
import Join from './routes/join';
import MemberExclusive from './routes/exclusive';
import Event from './routes/event';
import Introduce from './routes/introduce';
import Consult from './routes/consult';

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
        <Route path="/school/:id" component={SchoolDetail} />
        <Route path="/career" component={Career} />
        <Route path="/career/:id" component={CareerDetail} />
        <Route path="/profession" component={Profession} />
        <Route path="/profession/:id" component={ProfessionDetail} />
        <Route path="/expert/:id" component={ExpertDetail} />
        <Route path="/expert" component={Expert} />
        <Route path="/news" component={News} />
        <Route path="/news/:id" component={NewsDetail} />

        <Route path="/join" component={Join} />
        <Route path="/memberexclusive" component={MemberExclusive} />
        <Route path="/event" component={Event} />
        <Route path="/consult" component={Consult} />
        <Route path="/introduce" component={Introduce} />

      </Route>
    </Router>
  );
};

export default Routers;
