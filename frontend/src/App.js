import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Orders from './components/orders/Orders';
import SignIn from './components/auth/Signin';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/orders" component={Orders} />
        <Route exact={true} path="/signin" component={SignIn} />
      </Switch>
    </Router>
  ); 
}

export default App;