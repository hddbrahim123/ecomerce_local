import React, { useState } from "react";
import { withRouter } from "react-router";

import Footer from "./Footer";
import Header from "./header";

import Header2 from "./Header2";
import Main2 from "./Main2";
import Footer2 from "./Footer2";

const ClientLayout = (props) => {

  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? "Fr"
  );

  return (
    <div>
      {/* <Header2 language={language} />
      <Main2 language={language} {...props} />
      <Footer2 language={language} /> */}

      <div className="container">
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
      </div>
    </div>
  );

  function storeLanguageInLocalStorage(language) {
    setLanguage(language);
    localStorage.setItem("language", language);
    window.location.reload();
  }
};

export default withRouter(ClientLayout);
