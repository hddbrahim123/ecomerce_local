import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { getActiveCategories } from "../../../Core/ApiCore/Category";
import { getProductsViewClient } from "../../../Core/ApiCore/ProductClient";
import FilterCategory from "./FilterCategory";
import FilterPrice from "./FilterPrice";
import ProductCard from "./ProductCard";

import Paginate from "../../../Components/Comon/Paginate";

const ProductsShop = () => {
  const [language] = useState(
    localStorage.getItem("language") ?? "Fr"
  );
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  //State Pagination
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalPage: 1,
  });

  const [filters, setFilters] = useState({
    pageNumber: 1,
    length: 12,
    categories: [],
    price: [],
  });

  //Handle Page click
  const onPageChange = (newPage) => {
    setFilters({
      ...filters,
      pageNumber: newPage,
    });
  };

  const handleFilters = (data, filterBy) => {
    setFilters({
      ...filters,
      [filterBy]: data,
    });
    console.log("shop : ", data, filterBy);
  };

  useEffect(() => {
    getActiveCategories().then((res) => {
      setCategories(res);
      console.log(res);
    });
  }, []);
  useEffect(() => {
    getProductsViewClient(filters).then((res) => {
      setProducts(res.list);

      setPagination({
        ...pagination,
        pageNumber: res.pageNumber,
        totalPage: res.totalPage,
      });

      console.log(res);
    });
  }, [filters]);

  return (
    <React.Fragment>
      <div className="container-fluid pt-2 p-lg-4">
        <div className="row">
          <div className="col-lg-3">
            <div className="card my-2 shadow-sm">
              <div className="card-body">
                <FilterCategory
                  categories={categories}
                  handleFilters={(data) => handleFilters(data, "categories")}
                />
              </div>
            </div>
            <div className="card my-2 shadow-sm">
              <div className="card-body">
                <FilterPrice language={language}
                  handleFilters={(data) => handleFilters(data, "price")}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              {!isEmpty(products) &&
                products.map((product, i) => (
                  <div key={product.slug} className="col-lg-3 p-0">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
            <Paginate
              pagination={pagination}
              onPageChange={onPageChange}
              className="justify-content-center"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductsShop;
