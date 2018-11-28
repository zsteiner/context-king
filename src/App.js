import React from 'react';

import AppRouter from './components/AppRouter/AppRouter';
import { ReactComponent as IconSet } from './assets/WeatherIcons.svg';

const App = () => {
  return (
    <React.Fragment>
      <IconSet /> ,
      <AppRouter />
    </React.Fragment>
  );
};

export default App;
