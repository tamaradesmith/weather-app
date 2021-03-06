import React, { useState, useEffect } from 'react';
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
import SensorShow from './components/partials/SensorShow';

import { User } from './js/requests'

function App(props) {

  const [admin, setAdmin] = useState(false);

  async function checkAdmin() {
    const user = await User.getUser();
    setAdmin(user.is_admin);
    return user;
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <div className="App">

      <Router>
        <NavBar admin={admin} />
        <Switch>
          <Route path="/" exact component={DashboardSite} />
          <Route path="/Site" component={DashboardSite} />
          <Route path="/temperure" component={DashboardTemperature} />
          <Route path="/wind" component={DashboardWind} />
          <Route path="/humidily" component={DashboardHumidily} />
          <Route path="/inside" component={DashboardInside} />
          <Route path="/outside" component={DashboardOutside} />

          <Route path="/nodes/configure" render={(routeProps => (
            <DashboardConfig admin={admin} />))} />
          <Route path="/nodes/configure/new" render={(routeProps => (
            <NodeConfig admin={admin} />))} />

          <Route path="/node/:id" component={NodeShow} />
          <Route path="/nodes" component={NodeIndex} />

          <Route path="/sensor/:id" component={SensorShow} />

          <Route path="/login" render={(routeProps => (
            <Login setAdmin={checkAdmin} />))} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
