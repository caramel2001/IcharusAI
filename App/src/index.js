import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./style.css";
import Home from "./views/home";
import Setup from "./views/setup";
import Tracking from "./views/tracking";
import Recommendation from "./views/recommendation";
import NotFound from "./views/not-found";

const App = () => {
  const [login, setLogin] = useState(false);

  return (
    // <Recommendation />
    <Router>
      <Switch>
        <Route
          component={(props) => <Home {...props} login={login} />}
          exact
          path="/"
        />
        {/* <Route component={Home} exact path="/" /> */}
        <Route
          component={(props) => <Setup {...props} setLogin={setLogin} />}
          exact
          path="/setup"
        />
        <Route component={Tracking} exact path="/tracking" />
        <Route component={Recommendation} exact path="/recommendation" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
