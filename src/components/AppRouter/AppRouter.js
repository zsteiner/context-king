import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Forecast from '../../pages/Forecast';
import Timemachine from '../../pages/Timemachine';
import Nav from '../Nav/Nav';

function AppRouter() {
  return (
    <Router>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Forecast />} />
          <Route path="timemachine" element={<Timemachine />} />
        </Routes>
      </>
    </Router>
  );
}

export default AppRouter;
