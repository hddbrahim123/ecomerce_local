import React from "react"
import { Route } from "react-router-dom"

const ClientMiddleware = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
    <Route basename="http://tsa5arli.xyz"
    {...rest}
    render={props=>(
            <Layout><Component {...props}  /></Layout>
        )}
    />
)

export default ClientMiddleware
