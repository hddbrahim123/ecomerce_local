import React from "react"
import { withRouter } from "react-router-dom"

const FullLayout = (props)=>{
 return (
   <React.Fragment>
      {props.children}
   </React.Fragment>
 )
}

export default withRouter(FullLayout)
