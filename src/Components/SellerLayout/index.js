import React, { useState } from "react";
import { withRouter } from "react-router";
import Header from "./Header";

import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const SellerLayout = (props) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? "Fr"
  );
  let isOpen = useSelector((state) => state.Layout.leftMenu);

  return (
    <React.Fragment>
      <Header language={language} handleStoreLanguage={storeLanguageInLocalStorage} />
      <Sidebar language={language} />
      <main
        className={isOpen ? "content__page active__padding" : "content__page"}
      >
        {props.children}
      </main>
    </React.Fragment>
  );
  function storeLanguageInLocalStorage(language) {
    setLanguage(language)
    localStorage.setItem("language", language);
  }
};

export default withRouter(SellerLayout);
