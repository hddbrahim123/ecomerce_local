import React from "react"
import { Route, Redirect } from "react-router-dom"
import isAuthSeller from "../../Core/helpers/isAuthSeller"

const AuthSellerMiddleware = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
    <Route
    {...rest}
    render={props=>(
        !isAuthSeller() ? (
            <Layout><Component {...props}  /></Layout>
            ):(
            <Redirect 
              to={{
                pathname:'/seller'
              }}
            />
        )
    )} 
    />
)

export default AuthSellerMiddleware
