import React from "react";
import { Link } from "react-router-dom";

const baseSiteUrl = window.location.origin.toString() + "/#";

function Main2(props) {
  const {totalQty, solde, history} = props;
  // let categoryId = 0;
  // let url = window.location.hash.split('/');
  // if (url.length == 3) {
  //   categoryId = url[2];
  // }
  // const goToProducts = (categoryId) => {
	// 	window.location=(`${baseSiteUrl}/products/${categoryId}/`);
	// 	window.location.reload();
	// }
  return (
    <div id="mainBody">
      <div className="container">
        <div className="row">
          
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Main2;
