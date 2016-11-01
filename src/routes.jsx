import React from 'react';
import {Route, IndexRoute, Router} from 'react-router';

import LoginFormFinish from './component/index/Login';
import Home from './component/Home';


export default(
  <Router>
    <Route path="/" component={Home}/>
    <Route path="/login" component={LoginFormFinish}/>
  </Router>
);
