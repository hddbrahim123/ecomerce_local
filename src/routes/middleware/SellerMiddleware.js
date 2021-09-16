import React from "react"
import { Route, Redirect } from "react-router-dom"
import { IsConnect } from "../../Core/ApiCore/Auth"
import isAuthSeller from "../../Core/helpers/isAuthSeller"

const connecte = () => {
  const { token } = isAuthSeller();
  if (token) {
    IsConnect(token).then((res) => {
      console.log(res);
      if (res && res.success) {
        return true;
      } else {
        localStorage.setItem("JWT_SELLER", '');
        window.location = "/#/seller/login";
        //props.history.push('/seller/login')
      }
    });
  }
  return true;
}

const SellerMiddleware = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
    <Route
    {...rest}
    render={props=>(
      connecte() ? (
        <Layout><Component {...props}  /></Layout>
        ):(
        <Redirect 
          to={{
            pathname:'/seller/login'
          }}
        />
      )
    )}
    />
)

export default SellerMiddleware
