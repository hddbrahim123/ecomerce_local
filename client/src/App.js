import React from "react";
import { HashRouter as Router , Switch} from "react-router-dom";

import './assets/scss/App.scss'
import './App.css'

//imports Layouts
import ClientLayout from "./Components/ClientLayout";
// import SellerLayout from "./Components/SellerLayout";
// import FullLayout from "./Components/FullLayout";
import Index from "./Pages/Client/Home"


//imports Routes
import { clientRoutes } from "./routes/allRouters";

//imports middleware
import ClientMiddleware from "./routes/middleware/ClientMiddleware";
// import SellerMiddleware from "./routes/middleware/SellerMiddleware";
// import AuthSellerMiddleware from "./routes/middleware/AuthSellerMiddleware";

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
              key={i+1}
              exact
            />
          ))}
          
          {/* {sellerRoutes.map((route , i)=>(
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
          ))} */}
          
          {/* <ClientMiddleware 
            component={clientRoutes[0].component}
            path={clientRoutes[0].path}
            layout={ClientLayout}
            key={1}
          /> */}
            
          <ClientMiddleware 
            component={Index}
            path='/'
            layout={ClientLayout}
            key={0}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
