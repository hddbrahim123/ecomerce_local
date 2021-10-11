import React, { useEffect, useState } from "react";

//Import toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import {
  createCategory,
  getCategories,
  getCategory,
  removeCategory,
  updateCategory,
} from "../../../Core/ApiCore/Category";
import dictionary from "../../../Core/dictionary";
import ModalConfirmation from "../../../Components/Comon/ModalConfirmation";
import CategorySelecter from "../Products/CategorySelecter";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

const CreateCateory = (props) => {
  const [language] = useState(
    localStorage.getItem("language") ?? dictionary.defaultLanguage
  );
  const messages = dictionary.messages[language];
  const content = dictionary.category[language];
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [category, setCategory] = useState({
    name: "",
    icon: "",
    active: true,
    parentId: undefined,
  });

  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
    icon: "",
    active: true,
    parentId: undefined,
  });

  const [isOpen, setIsOpen] = useState(false);
  //handle Product
  const handleCategory = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCategory({ ...category, [e.target.id]: value });
  };
  const handleSelectedCategory = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSelectedCategory({ ...selectedCategory, [e.target.id]: value });
  };

  const onCategoryChange = (c) => {
    if (!isEmpty(c)) {
      setSelectedCategory(c);
    } else {
      setSelectedCategory({
        name: "",
        icon: "",
        active: true,
        parentId: undefined,
      });
    }
    if (c.parentId === category.id) {
      console.log("rwina");
    }
    category.parentId = c.id;
    setCategory({ ...category, parentId: c.id });
  };

  //Submit category
  const SubmitCategory = (e) => {
    // e.preventDefault();

    if (category.id) {
      updateCategory(category).then((res) => {
        if (res && res.success) {
          toastr.options.progressBar = true;
          toastr.success(messages.categoryUpdatedSuccess, "");
          //props.history.push("/seller/categories");
          getCategories(false).then((res) => {
            if (res && res.length) {
              setCategories([...res]);
              if (selectedCategories.length) {
                let tab = [];
                let children = res;
                selectedCategories.forEach((c) => {
                  let cat = children.find((e) => e.id === c.id);
                  if (cat) {
                    tab[tab.length] = cat;
                    if (cat.children) {
                      children = cat.children;
                    }
                  }
                });
                setSelectedCategories(tab);
              }
            }
          });
        } else {
          toastr.error(res?.message ?? "error");
        }
      });
    } else {
      createCategory(category).then((res) => {
        if (res && res.success) {
          toastr.options.progressBar = true;
          toastr.success(messages.categoryInsertedSuccess, "");
          setCategory({
            name: "",
            icon: "",
            active: category.active,
            parentId: selectedCategory.id,
          });
          //props.history.push("/seller/categories");
          getCategories(false).then((res) => {
            if (res && res.length) {
              setCategories([...res]);
              if (selectedCategories.length) {
                let tab = [];
                let children = res;
                selectedCategories.forEach((c) => {
                  let cat = children.find((e) => e.id === c.id);
                  if (cat) {
                    tab[tab.length] = cat;
                    if (cat.children) {
                      children = cat.children;
                    }
                  }
                });
                setSelectedCategories(tab);
              }
            }
          });
        } else {
          toastr.error(res?.message ?? "error");
        }
      });
    }
  };

  const Remove = () => {
    if (!isEmpty(selectedCategory) && selectedCategory.id) {
      removeCategory(selectedCategory.id).then((res) => {
        if (res && res.success) {
          toastr.options.progressBar = true;
          toastr.success(messages.categoryDeletedSuccess, "");
          setSelectedCategory({
            name: "",
            active: true,
            parentId: undefined,
          });
        } else {
          toastr.options.progressBar = true;
          toastr.error(messages.categoryDeletedFailed, "");
        }
        getCategories(false).then((res) => {
          if (res && res.length) {
            setCategories([...res]);
            if (selectedCategories.length) {
              let tab = [];
              let children = res;
              selectedCategories.forEach((c) => {
                let cat = children.find((e) => e.id === c.id);
                if (cat) {
                  tab[tab.length] = cat;
                  if (cat.children) {
                    children = cat.children;
                  }
                }
              });
              setSelectedCategories(tab);
            }
          }
        });
      });
    }
  };

  // const confirmerUpdateSelectedCategory = ()=>{
  //   if (!selectedCategory.name) {
  //     toastr.error("SVP, Entrez nom categorie !");
  //     return false;
  //   }
  //   return true;
  // }

  const confirmerSubmitCategory = () => {
    if (!category.name) {
      toastr.error("SVP, Entrez nom categorie !");
      return false;
    }
    if (category.id) {
      if (category.id === category.parentId) {
        toastr.error("SVP, Sellectioner un autre père categorie !");
        return false;
      }
    }
    return true;
  };

  const UpdateSelectedCategory = () => {
    updateCategory(selectedCategory).then((res) => {
      if (res && res.success) {
        toastr.options.progressBar = true;
        toastr.success(messages.categoryUpdatedSuccess, "");
        //props.history.push("/seller/categories");
        if (selectedCategory.id === category.id) {
          setCategory({ ...selectedCategory });
        }
        getCategories(false).then((res) => {
          if (res && res.length) {
            setCategories([...res]);
            if (selectedCategories.length) {
              let tab = [];
              let children = res;
              selectedCategories.forEach((c) => {
                let cat = children.find((e) => e.id === c.id);
                if (cat) {
                  tab[tab.length] = cat;
                  if (cat.children) {
                    children = cat.children;
                  }
                }
              });
              setSelectedCategories(tab);
            }
          }
        });
      } else {
        toastr.error(res?.message ?? "error");
      }
    });
  };

  const editCategory = () => {
    if (!isEmpty(selectedCategory)) {
      setCategory({ ...selectedCategory });
      if (selectedCategory.parentId) {
        let cat = selectedCategories.find(c => c.id === selectedCategory.parentId);
        setSelectedCategory(cat);
      }else{
        setSelectedCategory({
          name: "",
          icon: "",
          active: true,
          parentId: undefined,
        });
      }
    }
  };

  useEffect(() => {
    let categoryId = props.match.params.id;
    if (categoryId > 0) {
      getCategory(categoryId).then((res) => {
        console.log(res);
        if (res) {
          setCategory(res);
        }
      });
    }
    getCategories(false).then((res) => {
      if (res && res.length) {
        setCategories([...res]);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div>
        <ModalConfirmation
          isOpen={isOpen}
          toggle={() => setIsOpen(!isOpen)}
          title={
            category.id
              ? content.titleUpdateCategory
              : content.titleSaveCategory
          }
          message={
            category.id
              ? content.UpdateCategoryMessageConfirmation
              : content.SaveCategoryMessageConfirmation
          }
          buttonTextProcess={content.buttonSaveCategoryText}
          buttonTextClose={content.buttonClose}
          handleProcess={() => {
            SubmitCategory();
            setIsOpen(!isOpen);
          }}
        />
        <div className="row">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="mb-3">
                        <label htmlFor="name">
                          {content.labelCategoryName}
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={category.name}
                          className="form-control"
                          onChange={handleCategory}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="icon">Icon</label>
                        <input
                          id="icon"
                          type="text"
                          value={category.icon ?? ""}
                          className="form-control"
                          onChange={handleCategory}
                        />
                      </div>
                    </div>
                    <div className="col-3 " style={{ marginTop: "35px" }}>
                      <div className="form-check ">
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
                      <Link
                        to="#"
                        onClick={editCategory}
                        className="text-success"
                      >
                        <i className="bx bx-edit"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn btn-primary form-control"
                        disabled={!category.name}
                        onClick={() => {
                          if (confirmerSubmitCategory()) {
                            setIsOpen(!isOpen);
                          }
                        }}
                      >
                        {category.id
                          ? content.buttonUpdateCategoryText
                          : content.buttonCreateCategoryText}
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 mt-3 mb-2" style={{ textDecoration: "underline" }}>
                      Categorie père
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-9">
                      <div className="mb-3">
                        <label htmlFor="name">
                          {content.labelCategoryName}
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={selectedCategory.name}
                          className="form-control"
                          onChange={handleSelectedCategory}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="icon">Icon</label>
                        <input
                          id="icon"
                          type="text"
                          value={selectedCategory.icon ?? ""}
                          className="form-control"
                          onChange={handleSelectedCategory}
                        />
                      </div>
                    </div>
                    <div className="col-3 " style={{ marginTop: "35px" }}>
                      <div className="form-check ">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="active"
                          value={selectedCategory.active}
                          onChange={handleSelectedCategory}
                          checked={selectedCategory.active}
                        />
                        <label className="form-check-label" htmlFor="active">
                          {content.labelActive}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button
                        disabled={
                          !selectedCategory.name || !selectedCategory.id
                        }
                        className="btn btn-primary form-control"
                        onClick={() => {
                          UpdateSelectedCategory();
                        }}
                      >
                        {content.buttonUpdateCategoryText}
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        disabled={
                          !selectedCategory.name ||
                          !selectedCategory.id ||
                          selectedCategory.countProducts
                        }
                        className="btn btn-danger form-control"
                        onClick={() => {
                          Remove();
                        }}
                      >
                        {content.buttonRemoveCategoryText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-12">
            <CategorySelecter
              categories={categories}
              selectCategory={onCategoryChange}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateCateory;
