import React from "react";
import { HashRouter as Router , Switch} from "react-router-dom";

import './assets/scss/App.scss'

//imports Layouts
import ClientLayout from "./Components/ClientLayout";
import SellerLayout from "./Components/SellerLayout";
import FullLayout from "./Components/FullLayout";


//imports Routes
import { authSeller, clientRoutes, sellerRoutes } from "./routes/allRouters";

//imports middleware
import SellerMiddleware from "./routes/middleware/SellerMiddleware";
import ClientMiddleware from "./routes/middleware/ClientMiddleware";
import AuthSellerMiddleware from "./routes/middleware/AuthSellerMiddleware";
import Home from "./Pages/Client/Home/Home";

const App = ()=>{

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {clientRoutes.map((route , i)=>(
            <ClientMiddleware 
              component={route.component}
              path={route.path}
              layout={ClientLayout}
              key={i}
              exact
            />
          ))}

          {sellerRoutes.map((route , i)=>(
            <SellerMiddleware 
              component={route.component}
              path={route.path}
              layout={SellerLayout}
              key={i}
              exact
            />
          ))}

          {authSeller.map((route , i)=>(
            <AuthSellerMiddleware
              component={route.component}
              path={route.path}
              layout={FullLayout}
              key={i}
              exact
            />
          ))}
          
          <ClientMiddleware 
              component={clientRoutes[0].component}
              path={clientRoutes[0].path}
              layout={ClientLayout}
              key={1}
            />
            
        </Switch>
      </Router>
    </React.Fragment>

  );
}

export default App;
