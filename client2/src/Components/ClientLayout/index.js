import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

// import Footer from "./Footer";
// import Header from "./header";

import Header2 from "./Header2";
import Main2 from "./Main2";
import Footer2 from "./Footer2";
import { getCategories } from "../../Core/ApiCore/Category";
import { useSelector } from "react-redux";

const ClientLayout = (props) => {

  const [language] = useState(
    localStorage.getItem("language") ?? "Fr"
  );

  const totalQty = useSelector(state => state.Cart.totalQty);
	const solde = useSelector(state => state.Cart.solde);
  const [categories, setCategories] = useState([]);

  // document.head.innerHTML = `<meta charset="utf-8">
	// <title>ETNT Shopping</title>
	// <meta name="viewport" content="width=device-width, initial-scale=1.0">
	// <meta name="title" content="ETNT Shopping" />
	// <meta name="description" content="ETNT Shopping" />
	// <link rel="apple-touch-icon" href="logo192.png" />
	// <meta name="author" content="">
	// <link rel="manifest" href="manifest.json" />
	// <link rel="stylesheet" href="css/bootstrap.min.css" media="screen" />
	// <link href="css/base.css" rel="stylesheet" media="screen" />
	// <link href="css/bootstrap-responsive.min.css" rel="stylesheet">
	// <link href="css/font-awesome.css" rel="stylesheet" type="text/css">
	// <link href="js/prettify.css" rel="stylesheet">
	// <link rel="shortcut icon" href="images/ico/favicon.ico">
	// <style type="text/css" id="enject"></style>`;

  useEffect(() => {
    getCategories(true,true).then(res =>{
      if (res && res.length) {
        setCategories(res);
      } else {
        setCategories([]);
      }
    });
  }, [])

	const [filter, setFilter] = useState({
		search:'',
		categoryId:undefined
	})

  return (
    <div>
      <Header2 language={language} totalQty={totalQty} solde={solde} filter={filter} setFilter={setFilter} />
      <Main2 language={language} totalQty={totalQty} solde={solde} categories={categories}>{props.children}</Main2>
      <Footer2 language={language} />

      {/* <div className="container">
        <div className="row">
          <div className="col-24 col-md-12">
            <Header
              language={language}
              handleStoreLanguage={storeLanguageInLocalStorage}
            />
            <main id="page__topbar">{props.children}</main>
            <Footer language={language} />
          </div>
        </div>
      </div> */}
    </div>
  );

  // function storeLanguageInLocalStorage(language) {
  //   setLanguage(language);
  //   localStorage.setItem("language", language);
  //   window.location.reload();
  // }
};

export default withRouter(ClientLayout);
