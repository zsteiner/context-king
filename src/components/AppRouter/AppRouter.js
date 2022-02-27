import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Forecast from '../../pages/Forecast';
import Timemachine from '../../pages/Timemachine';
import Nav from '../Nav/Nav';

const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Nav />
      <Routes>
        <Route path="/" element={<Forecast />} />
        <Route path="timemachine" element={<Timemachine />} />
      </Routes>
    </React.Fragment>
  </Router>
);

export default AppRouter;
