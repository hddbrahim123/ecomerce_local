import React, { useState } from "react";
import { withRouter } from "react-router";

// import Footer from "./Footer";
// import Header from "./header";

import Header2 from "./Header2";
import Main2 from "./Main2";
import Footer2 from "./Footer2";

const ClientLayout = (props) => {

  const [language] = useState(
    localStorage.getItem("language") ?? "Fr"
  );

  document.head.innerHTML = `<meta charset="utf-8">
	<title>ETNT Shopping</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="title" content="ETNT Shopping" />
	<meta name="description" content="ETNT Shopping" />
	<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
	<meta name="author" content="">
	<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
	<link rel="stylesheet" href="css/bootstrap.min.css" media="screen" />
	<link href="css/base.css" rel="stylesheet" media="screen" />
	<link href="css/bootstrap-responsive.min.css" rel="stylesheet">
	<link href="css/font-awesome.css" rel="stylesheet" type="text/css">
	<link href="js/prettify.css" rel="stylesheet">
	<link rel="shortcut icon" href="images/ico/favicon.ico">
	<style type="text/css" id="enject"></style>`;

  return (
    <div>
      <Header2 language={language} />
      <Main2 language={language} {...props} />
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
