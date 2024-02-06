// AppRouter.js

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
