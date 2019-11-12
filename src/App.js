import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Jobs from "./Jobs";

function App() {
  return (
    <Router basename="/oferte-de-lucru-pole-emploi">
      <Route path="/:page?" component={Jobs} />
      <Route path="/:idAnunt" component={Job} />
    </Router>
  );
}
export default App;
