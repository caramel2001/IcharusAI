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
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState(null);

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
          component={(props) => (
            <Setup
              {...props}
              setLogin={setLogin}
              setApiKey={setApiKey}
              setName={setName}
              setPassword={setPassword}
              setUsername={setUsername}
            />
          )}
          exact
          path="/setup"
        />
        <Route
          component={(props) => (
            <Tracking {...props} username={username} password={password} />
          )}
          exact
          path="/tracking"
        />
        <Route
          component={(props) => <Recommendation {...props} apiKey={apiKey} />}
          exact
          path="/recommendation"
        />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
