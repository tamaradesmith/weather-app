import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import DashboardSite from './components/DashboardSite';
import DashboardTemperature from './components/DashboardTemperature';
import DashboardWind from './components/DashboardWind';
import DashboardHumidily from './components/DashboardHumidily';
import DashboardIndoors from './components/DashboardIndoors';
import DashboardOutdoors from './components/DashboardOutdoors';
import DashboardConfig from './components/DashboardConfig'
import NodeConfig from './components/partials/configure/NodeConfig';
import NodeShow from './components/partials/NodeShow';
import NodeIndex from './components/partials/NodeIndex';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={DashboardSite} />
          <Route path="/Site" component={DashboardSite} />
          <Route path="/DashboardTemperature" component={DashboardTemperature} />
          <Route path="/DashboardWind"  component = {DashboardWind} />
          <Route path="/DashboardHumidily" component={DashboardHumidily} />
          <Route path="/DashboardIndoors" component={DashboardIndoors} />
          <Route path="/DashboardOutdoors"  component = {DashboardOutdoors} />
          <Route path="/nodes/configure" exact component = {DashboardConfig} />
          <Route path="/DashboardConfig/node/new" component = {NodeConfig} />
          {/* <Route path="/DashboardConfig/node/:id/devices/new" component={DeviceConfig} /> */}
          <Route path="/node/:id" component={NodeShow} />
          <Route path="/nodes" component={NodeIndex} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
