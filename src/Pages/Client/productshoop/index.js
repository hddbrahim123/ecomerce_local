import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { getActiveCategories } from "../../../Core/ApiCore/Category";
import { getProductsViewClient } from "../../../Core/ApiCore/ProductClient";
import FilterCategory from "./FilterCategory";
import FilterPrice from "./FilterPrice";
import ProductCard from "./ProductCard";

import Paginate from "../../../Components/Comon/Paginate";
import { Link } from "react-router-dom";

const ProductsShop = (props) => {
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
    search:''
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

  // useEffect(() => {
  // }, []);
  const searchProducts = () =>{
    getProductsViewClient(filters).then((res) => {
      setProducts(res.list);
      setPagination({
        ...pagination,
        pageNumber: res.pageNumber,
        totalPage: res.totalPage,
      });
    });
  }
  useEffect(() => {
    //let category = props.match.params.category;
    
    getActiveCategories().then((res) => {
      setCategories(res);
    });
    searchProducts();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid pt-2 p-lg-4 p-lg-4">
        <div className="row">
          <div className="col-3">
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
          <div className="col-9">
            <div className="row">
              <form action="">
                <div className="input-group input-group-lg">
                  <input id="search" value={filters.search} onChange={(e)=>setFilters({...filters,search:e.target.value})} type="search" className="form-control mx-auto"/>
                  <div className="mx-2">
                      <Link onClick={searchProducts} to="#">
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABNtJREFUaEPtmjFv20YUx/+PKhCpqD9AU1hKJ2fr0HRqlhiVYC/xlCzx5iXemiGZWg/uFg/pZi/tJC/Z7CUOGdhLt2rpFk2tZCT5ADYqF6j5iidTAU3dkcfjyQJrcbEBko/vd+/d/969E+GaXXTNeDED/r9HfBbhIhH+cokX/j3HPSIsgPHF8G/sYkYXhHcEdDwPnT8PqFvkezbvFo7wfJNveoRHABYB3MzpxHsAhyFj9zgg+X/ilzXwwn2eOzvDYwCrjrxsV6vY6e7TiSN7SjNWwI0WLzJjkwhzLp1jxgkRNno+Hbq0G7eVG7jR4qcOo6rjavd82poEtDGwpPDgDJt0MVe111CYgH0G3n5SwclImCJBmyPgNoD7SUEbM0jYq97AlusUNwaut/hFGiwBOzeqaJs6KAP4zxlWGUMdUF+Evd5r2nAZaSPgepOf0YUSj13MOGLgua3KisoTIPbvaezv9gN67go6E1gECsAL1Qclqn/5tO3CmVstXk+J9hNXQpYKPJy3A7xSqXEYYuP4De25gB3ZmP+OVzwPm0mbot61GpZNp0uaT6nAjRb/JAKTNJAV2SgrvgZwm/li6SKCrK9vQej0XtORzildpJnhJLW1wFEF9Uox2kf9gL5XORyByrKVVXFJVbWlS9N6k39WzemQsWyrFSN/tcA6odJ9NE3YdNEMGdvHAe0k7+sGOyuzTKaXFrjRYonupUilfdAGWBxkxlY/oHbSWU1qv+/5tGwCpl/pFHekSAhDvEzeqlZxN004dHM+y0HPw8Pkzimq1X9Lvqt6Nst+/L4ywqrRlQqqH9DDLOMx6A6AXZmnkfPfAMO1/I5CF5S2601+qdhiKjMiy6/UOawSDV3q6cRLJ0gp6+3YWltv8ioRRAQ/XlLo6ETTBFoZYdXIhoy144AkaoWvRot/SUZapQ/zTb7jEeTZOLBRpuWaw40W/+F67sTtqUAAdHo+rcWf02lJz6evbEddGWEVcJGPaNL+0qBKNdUP6G7yWde+TA3YNEJTAy66HJgCZqU0Mz70A1qysSfvTEW0TJ01neum9tKAx2rZPMtSHgfSnr2yZalI4eEKVuxcWeFhW1q6hL3S0jIa3QMifB6HcLFbMR0UTUV22vPpW1MbquecbQ+LOJF8dyrbQ20DADjs+/TEJWDSlqZDelqtYqlom2ciLZ4igzG1Fo84HQnHAYDPkhBX3MT7UKvhQdHoatfhOFxam1bXorGJ8HyTH3uEddW7LndqmX3pSLH1jXjgUIoS2+basBFPeKo71ZBNRaWCNVdnyUbAAp3VvpFof1rDrmnayXT5e4BHuqjGI+0S2hg4ms/PVH3qhHNdIuyFjK7qMM0jLDBjJfMwLZHbrqCNgUfft+1O5pzXpyqhdAGdGzhKbzlvklOJMfXOCXbpcdn6MfCDZEYY4tdJQFsBj5aswQDrulPFvOBylFKrYXukAVE97xzaGngEFB13yu88FpO1twH0KQFt3bnyJKALA8ehxMHzc0j/WXrPstx8/NmSpCsR3sk8lIZdpYLfTZYa19BOgQ0iavWIS+hSAMsouYIuDbAr6FIBG0BnHpqXDjgFer/n049ZIlFKYAW0EazR9jBrxKZ5P1oGV/L8rKm0EbYd6Bmw7ciV5b1ZhMsSKVs/ZxG2HbmyvHftIvwfVOSxW1outL8AAAAASUVORK5CYII="/>
                      </Link>
                  </div>
                </div>
              </form>
            </div>
            <div className="row">
              {!isEmpty(products) &&
                products.map((product, i) => (
                  <div key={product.slug} className="col-3 p-0">
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
