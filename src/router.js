import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './routes/App';
import Index from './routes/index';
import Login from './routes/login/Login';
import Register from './routes/login/Register';
import Column from './routes/column';

import User from './routes/my/User';
import Order from './routes/my/order';
import MyFavorite from './routes/my/favorite';
import MyCoupon from './routes/my/coupon';
import Myinfo from './routes/my/myinfo';
import EditMyinfo from './routes/my/editmyinfo';

import Course from './routes/course';
import CourseCat from './routes/course/CourseCat';
import CourseDetail from './routes/course/CourseDetail';
import ColumnDetail from './routes/column/ColumnDetail';
import ColumnItemDetail from './routes/column/ColumnItemDetail';
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
import Employ from './routes/employ';
import MemberExclusive from './routes/exclusive';
import Event from './routes/event';
import Introduce from './routes/introduce';
import Consult from './routes/consult';
import Service from './routes/service';
import EntranceDetail from './routes/service/EntranceDetail';
import ServiceFirst from './routes/service/ServiceFirst';
import ServiceSecond from './routes/service/ServiceSecond';
import ServiceThird from './routes/service/ServiceThird';
import ProvinceLine from './routes/provinceline';
import Interlocution from './routes/interlocution';
import InterlocutionDetail from './routes/interlocution/InterlocutionDetail';

import BigDataIndex from './routes/bigdata';
import BigData from './routes/bigdata/bigdata';
import BigDataDetail from './routes/bigdata/bigdata/BigDataDetail';

import Award from './routes/bigdata/award';

import Question from "./routes/bigdata/question/index";
import QuestionDetail from "./routes/bigdata/question/QuestionDetail";
import Brochure from "./routes/bigdata/brochure";
import BrochureDetail from "./routes/bigdata/brochure/BrochureDetail";

import ColumnOrderDetail from './routes/my/order/column/ColumnOrderDetail';
import CourseOrderDetail from './routes/my/order/course/CourseOrderDetail';

const Routers = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="/column" component={Column} />
        <Route path="/column/:id" component={ColumnDetail} />
        <Route path="/columnitem/:id" component={ColumnItemDetail} />

        <Route path="/course" component={Course} />
        <Route path="/coursecat/:id" component={CourseCat} />
        <Route path="/course/:id" component={CourseDetail} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

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

        <Route path="/provinceline" component={ProvinceLine} />

        <Route path="/bigdata" >
          <IndexRoute component={BigDataIndex} />
          <Route path="bigdata" component={BigData} />
          <Route path="bigdata/:id" component={BigDataDetail} />

          <Route path="award" component={Award} />

          <Route path="question" component={Question} />
          <Route path="question/:id" component={QuestionDetail} />

          <Route path="brochure" component={Brochure} />
          <Route path="brochure/:id" component={BrochureDetail} />
        </Route>

        <Route path="/service" >
          <IndexRoute component={Service} />
          <Route path=":id" component={EntranceDetail} />
          <Route path="first/:id" component={ServiceFirst} />
          <Route path="second/:id" component={ServiceSecond} />
          <Route path="third/:id" component={ServiceThird} />
        </Route>

        <Route path="/service/:id" component={EntranceDetail} />
        <Route path="/service" component={Service} />
        <Route path="/servicethird/:id" component={ServiceThird} />

        <Route path="/join" component={Join} />
        <Route path="/employ" component={Employ} />
        <Route path="/memberexclusive" component={MemberExclusive} />
        <Route path="/event" component={Event} />
        <Route path="/consult" component={Consult} />
        <Route path="/introduce" component={Introduce} />

        <Route path="/interlocution" component={Interlocution} />
        <Route path="/interlocution/:id" component={InterlocutionDetail} />
        <Route path="/interlocution/:id" component={InterlocutionDetail} />

        <Route path="/my" >
          <IndexRoute component={User} />
          <Route path="order" >
            <IndexRoute component={Order} />
            <Route path="column/:id" component={ColumnOrderDetail} />
            <Route path="course/:id" component={CourseOrderDetail} />
          </Route>
          <Route path="favorite" component={MyFavorite} />
          <Route path="coupon" component={MyCoupon} />
          <Route path="myinfo" component={Myinfo} />
          <Route path="editmyinfo" component={EditMyinfo} />
        </Route>
      </Route>
    </Router>
  );
};

export default Routers;
