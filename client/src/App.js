import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import DashboardTemperature from './components/DashboardTemperature';
import DashboardWind from './components/DashboardWind';
import DashboardHumidily from './components/DashboardHumidily';
import DashboardIndoors from './components/DashboardIndoors';
import DashboardOutdoors from './components/DashboardOutdoors';
import ConfigNodes from './components/ConfigNodes'


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={DashboardTemperature} />
          <Route path="/DashboardTemperature" component={DashboardTemperature} />
          <Route path="/DashboardWind"  component = {DashboardWind} />
          <Route path="/DashboardHumidily" component={DashboardHumidily} />
          <Route path="/DashboardIndoors" component={DashboardIndoors} />
          <Route path="/DashboardOutdoors"  component = {DashboardOutdoors} />
          <Route path="/ConfigNodes"  component = {ConfigNodes} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
