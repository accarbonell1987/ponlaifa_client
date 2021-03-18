import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// import Home from './components/Home';
// import Player from './components/Player';
// import './style/App.css';
import './App.scss';

import { Login } from './screens';
import { BaseLayout } from './components';

console.log(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`);

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Home}></Route>
        <Route path="/player/:id" component={Player}></Route> */}
        <Route exact path="/login" component={Login} />
        <Route path="/" component={BaseLayout} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );
}

export default App;
