import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import DashboardSite from './components/DashboardSite';
import DashboardTemperature from './components/DashboardTemperature';
import DashboardWind from './components/DashboardWind';
import DashboardHumidily from './components/DashboardHumidily';
import DashboardInside from './components/DashboardInside';
import DashboardOutside from './components/DashboardOutside';
import DashboardConfig from './components/DashboardConfig'
import NodeConfig from './components/partials/configure/NodeConfig';
import NodeShow from './components/partials/NodeShow';
import NodeIndex from './components/partials/NodeIndex';
import Login from './components/Login';

function App() {
  return (
    <div className="App">

      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={DashboardSite} />
          <Route path="/Site" component={DashboardSite} />
          <Route path="/temperature" component={DashboardTemperature} />
          <Route path="/wind"  component = {DashboardWind} />
          <Route path="/humidily" component={DashboardHumidily} />
          <Route path="/inside" component={DashboardInside} />
          <Route path="/outside"  component = {DashboardOutside} />
          <Route path="/nodes/configure" exact component = {DashboardConfig} />
          <Route path="/nodes/configure/new" component = {NodeConfig} />
      
          <Route path="/node/:id" component={NodeShow} />
          <Route path="/nodes" component={NodeIndex} />
          <Route path="/login" component={Login} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
