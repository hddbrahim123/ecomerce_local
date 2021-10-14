import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";

import "./assets/scss/App.scss";

import SellerLayout from "./Components/SellerLayout";
import FullLayout from "./Components/FullLayout";

//imports Routes
import { authSeller, sellerRoutes } from "./routes/allRouters";

//imports middleware
import SellerMiddleware from "./routes/middleware/SellerMiddleware";
import AuthSellerMiddleware from "./routes/middleware/AuthSellerMiddleware";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {sellerRoutes.map((route, i) => (
            <SellerMiddleware
              component={route.component}
              path={route.path}
              layout={SellerLayout}
              key={i}
              exact
            />
          ))}
          {authSeller.map((route, i) => (
            <AuthSellerMiddleware
              component={route.component}
              path={route.path}
              layout={FullLayout}
              key={i}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
