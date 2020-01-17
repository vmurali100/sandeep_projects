import React from "react";
import "./App.css";
import Form from "./Form";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./User";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Form} />
          <Route path="/user" component={User} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
