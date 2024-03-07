import React, { useState } from "react";
import ReactDOM from "react-dom/client";
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
import Analytics from "./views/analytics";
import Improve from "./views/improve";

const App = () => {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [service, setService] = useState("openai"); // State to store the selected service

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
              setService={setService}
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
          component={(props) => (
            <Recommendation {...props} apiKey={apiKey} service={service} />
          )}
          exact
          path="/recommendation"
        />
        <Route component={Analytics} exact path="/analytics" />
        <Route component={(props) => (<Improve {...props} apiKey={apiKey} service={service} exact path="/improve" ></Improve>
          
        )} />

        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
