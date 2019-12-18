import React from "react";
import { Switch, Route } from "react-router-dom";

import ViewContextProvider from "./utils/ViewsContextProvider";
import HomePage from "./views/HomePage";
//import Authorization from "./views/Authorization";
import LogIn from "./views/LogIn";
import SignUp from "./views/SignUp";

const App = () => {
  return (
    <div className="App">
      <ViewContextProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/profile" component={() => "Profile page"} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </ViewContextProvider>
    </div>
  );
};

export default App;
