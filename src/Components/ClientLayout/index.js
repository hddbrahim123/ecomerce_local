import React, { useState } from "react";
import { withRouter } from "react-router";
// import Footer from './Footer'

import Header from "./header";

const ClientLayout = (props) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? "Fr"
  );

  return (
    <React.Fragment>
      <Header language={language} handleStoreLanguage={storeLanguageInLocalStorage} />
      <main id="page__topbar">{props.children}</main>
      {/* <Footer language={language} />             */}
    </React.Fragment>
  );

  function storeLanguageInLocalStorage(language) {
    setLanguage(language)
    localStorage.setItem("language", language)
    window.location.reload()
  }
};

export default withRouter(ClientLayout);
