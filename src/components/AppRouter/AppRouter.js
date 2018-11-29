import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Forecast from '../../pages/Forecast';
import Timemachine from '../../pages/Timemachine';
// import Nav from '../Nav/Nav';

const AppRouter = () => (
  <Router>
    <React.Fragment>
      {/* <Nav /> */}
      <Route path="/" exact component={Forecast} />
      <Route path="/timemachine" exact component={Timemachine} />
    </React.Fragment>
  </Router>
);

export default AppRouter;
