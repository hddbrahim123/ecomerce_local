import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { isEmpty } from "lodash";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import Dashboard from "..";
import {
  getProductsSeller,
  RemoveProduct,
} from "../../../Core/ApiCore/ProductSeller";

import Paginate from "../../../Components/Comon/Paginate";
import Breadcrumb from "../../../Components/Comon/Breadcrumb";
import dictionary from "../../../Core/dictionary";
//Import toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import ModalConfirmation from "../../../Components/Comon/ModalConfirmation";

const Products = (props) => {
  const [language] = useState(
    localStorage.getItem("language") ?? dictionary.defaultLanguage
  );
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
  });

  //Handle Page click
  const onPageChange = (newPage) => {
    setFilters({
      ...filters,
      pageNumber: newPage,
    });
  };

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

  useEffect(() => {
    getProductsSeller(filters).then((res) => {
      console.log(res);
      if (res && res.list) {
        setProducts(res.list);
        setPagination({
          ...pagination,
          pageNumber: res.pageNumber,
          totalPage: res.totalPage,
        });
      }
    });
  }, [filters]);

  return (
    <React.Fragment>
      <Dashboard props />
      <div className="container-fluid">
        <Breadcrumb
          item={content.titleDashboard}
          link="/seller"
          title={content.titleProducts}
        />
        <div className="row">
          <div className="col-md-3 ">
            <Link to="/seller/products/create" className="pull-rigth">{content.buttonNewProduct}</Link>
          </div>
        </div>
        <ModalConfirmation 
          isOpen={isOpen} 
          toggle={()=>setIsOpen(!isOpen)}
          title="RemoveProduct" 
          message="RemoveProductMessageConfirmation" 
          buttonTextProcess="buttonRemoveProduct" 
          buttonTextClose="buttonClose" 
          handleProcess={deleteProduct} 
        />

        <div className="row">
          <div className="table-rep-plugin ">
            <div
              className="table-responsive mb-0"
              data-pattern="priority-columns"
            >
              <Table className="table custom__table  table-nowrap align-middle table-borderless">
                <Thead className="table-light">
                  <Tr>
                    <Th className="text-muted">{content.titleImage}</Th>
                    <Th className="text-muted" data-priority="3">
                      {content.titleQuantity}
                    </Th>
                    <Th className="text-muted" data-priority="3">
                      {content.titlePrice}
                    </Th>
                    <Th className="text-muted" data-priority="3">
                      {content.titleStatus}
                    </Th>
                    <Th className="text-muted" data-priority="3">
                      {content.titleView}
                    </Th>
                    <Th className="text-muted" data-priority="6">
                      {content.titleActions}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {!isEmpty(products) &&
                    products.map((product, i) => (
                      <Tr key={i}>
                        <Th className="d-flex">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="avatar__lg"
                          />
                          <h5 className="mx-3 text-capitalize">
                            <Link
                              to={"/seller/product/edit/" + product.slug}
                              className="text-dark"
                            >
                              {product.name}
                            </Link>
                          </h5>
                        </Th>
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
                                `/seller/product/${product.slug}`
                              );
                            }}
                          >
                            {content.buttonDetailsText}
                          </button>
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
                              onClick={() => deleteProduct(product.slug)}
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
            className="justify-content-end"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Products;
