import React, { useEffect } from "react";
import { isConnect } from "../../Core/ApiCore/Auth";

const Dashboard = (props) => {
  useEffect(() => {
    isConnect().then((res) => {
      console.log(res);
      if (res && res.success) {
      } else {
        localStorage.setItem("JWT_SELLER", "");
        window.location = "/#/seller/login";
        //props.history.push('/seller/login')
      }
    });
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
