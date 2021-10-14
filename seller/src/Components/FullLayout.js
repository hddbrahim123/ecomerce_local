import React from "react";
import { withRouter } from "react-router-dom";

const FullLayout = (props) => {
  return <div>{props.children}</div>;
};

export default withRouter(FullLayout);
