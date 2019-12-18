import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./views/HomePage";
import LogInSignUp from "./views/LogInSignUp";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LogInSignUp} />
        <Route exact path="/signup" component={LogInSignUp} />
        <Route exact path="/profile" component={() => "Profile page"} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
};

export default App;
