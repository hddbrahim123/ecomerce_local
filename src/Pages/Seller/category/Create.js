import React, { useEffect, useState } from "react";

//Import toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import * as _ from "lodash";
import { createCategory, getCategory, updateCategory } from "../../../Core/ApiCore/Category";
import dictionary from '../../../Core/dictionary';
import ModalConfirmation from "../../../Components/Comon/ModalConfirmation";

const CreateCateory = (props) => {
  const [language] = useState(localStorage.getItem('language') ?? dictionary.defaultLanguage)
  const messages = dictionary.messages[language]
  const content = dictionary.category[language]
  const [category, setCategory] = useState({
    name: "",
    active: true,
  });

  const [isOpen, setIsOpen] = useState(false);
  //handle Product
  const handleCategory = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCategory({ ...category, [e.target.id]: value });
  };

  //Submit category
  const SubmitCategory = (e) => {
    // e.preventDefault();
    if (category.id) {
      updateCategory(category).then((res) => {
        if (res.success) {
          toastr.options.progressBar = true;
          toastr.success(messages.categoryInsertedSuccess, "");
          props.history.push("/seller/categories");
        } else {
          toastr.error(res.message);
        }
      })
    } else {
      createCategory(category).then((res) => {
        if (res.success) {
          toastr.options.progressBar = true;
          toastr.success(messages.categoryInsertedSuccess, "");
          props.history.push("/seller/categories");
        } else {
          toastr.error(res.message);
        }
      })
    }
  }

  useEffect(() => {
    let categoryId = props.match.params.id;
    if (categoryId > 0) {
      getCategory(categoryId).then((res) => {
        console.log(res);
        if (res) {
          setCategory(res)
        }
      });
    }
  }, []);

  return (
    <React.Fragment>
      <div>
      <ModalConfirmation 
          isOpen={isOpen} 
          toggle={()=>setIsOpen(!isOpen)}
          title={category.id ? content.titleUpdateCategory : content.titleSaveCategory}
          message={category.id ? content.UpdateCategoryMessageConfirmation : content.SaveCategoryMessageConfirmation}
          buttonTextProcess={content.buttonSaveCategoryText}
          buttonTextClose={content.buttonClose}
          handleProcess={()=>{ SubmitCategory(); setIsOpen(!isOpen);}}
        />
        <div className="row">
          <form onSubmit={(e)=>{e.preventDefault();setIsOpen(!isOpen);}}>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label htmlFor="name">{content.labelCategoryName}</label>
                        <input
                          id="name"
                          type="text"
                          value={category.name}
                          className="form-control"
                          onChange={handleCategory}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="active"
                          value={category.active}
                          onChange={handleCategory}
                          checked={category.active}
                        />
                        <label className="form-check-label" htmlFor="active">
                          {content.labelActive}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div xl="12" sm="12">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        {category.id ? content.buttonUpdateCategoryText : content.buttonCreateCategoryText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateCateory;
