import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { isEmpty } from "lodash";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import {
  DownProduct,
  getProductsSeller,
  RemoveProduct,
  UpProduct,
} from "../../../Core/ApiCore/ProductSeller";

import Paginate from "../../../Components/Comon/Paginate";
import Breadcrumb from "../../../Components/Comon/Breadcrumb";
import dictionary from "../../../Core/dictionary";
//Import toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import ModalConfirmation from "../../../Components/Comon/ModalConfirmation";
import Search from "./Search";
import { getCategories } from "../../../Core/ApiCore/Category";
import { API_URL } from "../../../config";

const Products = (props) => {
  const [language] = useState(
    localStorage.getItem("language") ?? dictionary.defaultLanguage
  );

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const content = dictionary.product[language];
  const messages = dictionary.messages[language];
  //State Pagination
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalPage: 1,
  });
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    pageNumber: 1,
    length: 10,
    search:'',
    categoryId:undefined
  });

  //Handle Page click
  const onPageChange = (newPage) => {
    pagination.pageNumber = newPage;
    setPagination({
      ...pagination,
      pageNumber: newPage
    });
    filters.pageNumber = newPage;
    setFilters({
      ...filters,
      pageNumber: newPage,
    });
    searchProducts(filters);
  };

  const onLengthPageChange =(length)=>{
    filters.length = length;
    setFilters({
      ...filters,
      length: length,
    });
    pagination.length = length;
    setPagination({...pagination, length: length});
    searchProducts(filters);
  }
  
  const handleChange = (e) =>{
    let value = e.target.id === 'categoryId' ? e.target.value === '' ? undefined : e.target.value : e.target.value;
    setFilters({...filters, [e.target.id]: value})
  }
  
  const searchProducts = (filters) =>
  {
    getProductsSeller(filters).then((res) => 
    {
      if (res && res.list) {
        setProducts(res.list);
        setPagination({
          ...pagination,
          pageNumber: res.pageNumber,
          totalPage: res.totalPage,
          totalCount: res.totalCount
        })
      }
    })
  }
  
  const Up = (product) =>{
    UpProduct(product.slug).then((res)=>{searchProducts(filters)})
  }

  const Down = (product) =>{
    DownProduct(product.slug).then((res)=>{searchProducts(filters)})
  }

  const [slug, setSlug] = useState("")

  const deleteProduct = (slug) => {
    RemoveProduct(slug).then((res) => {
      if (res.success) {
        let productList = products;
        productList = productList.filter((product) => product.slug !== slug);
        setProducts(productList);

        toastr.options.progressBar = true;
        toastr.success(messages.removeProductSuccess, "");
      } else {
        toastr.options.progressBar = true;
        toastr.error(messages.removeProductError, "");
      }
    });
  };
  const urlImage = (product) =>{
    return `${API_URL}User/Image?slug=${product.slug}&file=${product.image}`;
  }
  useEffect(() => {
    getCategories(false)
      .then(res=>{
        if (res) {
          setCategories(res)
        }
      })
      searchProducts(filters)
      //OrderProducts(true)
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Breadcrumb
          item={content.titleDashboard}
          link="/seller"
          title={content.titleProducts}
        />
        <Search categories={categories} filters={filters} handleChange={handleChange} searchProducts={()=>searchProducts(filters)} />
        <div className="row">
          <div className="col-md-3 ">
            <Link to="/seller/products/create" className="pull-rigth">{content.buttonNewProduct}</Link>
          </div>
        </div>
        <ModalConfirmation 
          isOpen={isOpen} 
          toggle={()=>setIsOpen(!isOpen)}
          title={content.titleRemoveProduct}
          message={content.RemoveProductMessageConfirmation}
          buttonTextProcess={content.buttonRemoveProductText}
          buttonTextClose={content.buttonClose} 
          handleProcess={()=>{ deleteProduct(slug); setIsOpen(!isOpen);}} 
        />
        <div className="row" key={1}>
          <p>{!isEmpty(products) ? `résultat : ${pagination.totalCount} produit(s)`:"aucun résultat"} </p>
          {!isEmpty(products) && <Paginate
            pagination={pagination}
            onPageChange={onPageChange}
            onLengthPageChange={onLengthPageChange}
            className="justify-content-left"
            />}
        </div>
        <div className="row" key={2}>
          <div className="table-rep-plugin ">
            <div
              className="table-responsive mb-0"
              data-pattern="priority-columns"
            >
              <Table className="table custom__table  table-nowrap align-middle table-borderless">
                <Thead className="table-light">
                  <Tr>
                    <Th key={1} className="text-muted">{content.titleImage}</Th>
                    <Th>Categorie</Th>
                    <Th key={8} className="text-muted">Position</Th>
                    <Th key={2} className="text-muted" data-priority="3">
                      {content.titleQuantity}
                    </Th>
                    <Th key={3} className="text-muted" data-priority="3">
                      {content.titlePrice}
                    </Th>
                    <Th key={4} className="text-muted" data-priority="3">
                      {content.titleStatus}
                    </Th>
                    <Th key={5} className="text-muted" data-priority="3">
                      {content.titleView}
                    </Th>
                    <Th key={6} className="text-muted" data-priority="3">
                    </Th>
                    <Th key={7} className="text-muted" data-priority="6">
                      {content.titleActions}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {!isEmpty(products) &&
                    products.map((product, i) => (
                      <Tr key={i}>
                        <Td className="d-flex">
                          <img
                            src={urlImage(product)}
                            alt={product.name}
                            className="avatar__lg"
                            height="100px"
                          />
                          <h5 className="mx-3 text-capitalize">
                            <Link
                              target="_blank"
                              to={"/product/" + product.slug}
                              className="text-dark"
                            >
                              {product.name}
                            </Link>
                          </h5>
                        </Td>
                        <Td>{product.category}</Td>
                        <Td>{product.position}</Td>
                        <Td>{product.quantity}</Td>
                        <Td>{product.newPrice}</Td>
                        <Td>
                          {product.active ? (
                            <span className="badge bg-primary">
                              {content.active}
                            </span>
                          ) : (
                            <span className="badge bg-danger">
                              {content.inActive}
                            </span>
                          )}
                        </Td>
                        <Td>
                          <button
                            className="btn-sm btn-primary btn-rounded"
                            onClick={() => {
                              props.history.push(
                                `/#/product/${product.slug}`
                              );
                            }}
                          >
                            {content.buttonDetailsText}
                          </button>
                        </Td>
                        <Td>
                          <div>
                            <Link onClick={()=>{ Down(product); }} to="#">
                              <i className='bx bxs-chevron-up'></i>
                            </Link>
                            <Link onClick={()=>{ Up(product); }} to="#">
                              <i className='bx bxs-chevron-down'></i>
                            </Link>
                          </div>
                        </Td>
                        <Td>
                          <div className="d-flex gap-3">
                            <Link
                              onClick={() =>
                                props.history.push(
                                  `/seller/product/edit/${product.slug}`
                                )
                              }
                              to="#"
                              className="text-success fw-bold"
                            >
                              <i className="bx bx-edit"></i>
                            </Link>
                            <Link
                              to="#"
                              onClick={()=>
                              {
                                setSlug(product.slug);
                                setIsOpen(!isOpen);
                              }}
                              className="text-danger fw-bold"
                            >
                              <i className="bx bx-trash"></i>
                            </Link>
                          </div>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </div>
          </div>
          <Paginate
            pagination={pagination}
            onPageChange={onPageChange}
            onLengthPageChange={onLengthPageChange}
            className="justify-content-end"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Products;
