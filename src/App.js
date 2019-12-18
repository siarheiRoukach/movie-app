import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./home/HomePage";
import LogInSignUp from "./logInSignUp/LogInSignUp";

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
