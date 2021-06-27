import React, { useState } from "react";
import { Link } from "react-router-dom";

import { map } from "lodash";

const Paginate = (props) => {
  const { pagination, onPageChange, className } = props;
  const { pageNumber, totalPage } = pagination;

  function arrayPages(totalPages, pageNumber) {
    var begin = pageNumber - 5;
    if (begin < 1) {
      begin = 1;
    }
    var end = begin + 10;
    if (end > totalPages) {
      end = totalPages;
    }
    var array = [];
    for (var index = begin; index <= end; index++) {
      array.push(index);
    }
    console.log(array);
    return array;
  }

  const [pages, setPages] = useState(arrayPages(totalPage, pageNumber));

  const handlePageClick = (newPage) => {
    onPageChange(newPage);
    setPages(arrayPages(totalPage, newPage));
  };

  return (
    <React.Fragment>
      <div className="col-lg-12">
        <nav aria-label="Page navigation example">
          <ul className={`pagination mt-2 mb-5 pb-1 ${className}`}>
            <li
              className={pageNumber === 1 ? "page-item disabled" : "page-item"}
            >
              <Link
                to="#"
                onClick={() => handlePageClick(1)}
                className="page-link pagination-rounded shadow-sm "
                href="#"
                aria-label="First"
              >
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            <li
              className={pageNumber === 1 ? "page-item disabled" : "page-item"}
            >
              <Link
                to="#"
                onClick={() => handlePageClick(pageNumber - 1)}
                className="page-link pagination-rounded shadow-sm "
                href="#"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            {map(pages, (item, i) => (
              <li key={i} className="page-item">
                <Link
                  to="#"
                  onClick={() => handlePageClick(item)}
                  className={
                    item === pageNumber
                      ? "page-link pagination-rounded active shadow-sm"
                      : "page-link pagination-rounded shadow-sm"
                  }
                >
                  {item}
                </Link>
              </li>
            ))}

            <li
              className={
                pageNumber >= totalPage ? "page-item disabled" : "page-item"
              }
            >
              <Link
                to="#"
                onClick={() => handlePageClick(pageNumber + 1)}
                className="page-link pagination-rounded shadow-sm"
                href="#"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
            <li
              className={
                pageNumber >= totalPage ? "page-item disabled" : "page-item"
              }
            >
              <Link
                to="#"
                onClick={() => handlePageClick(totalPage)}
                className="page-link pagination-rounded shadow-sm"
                href="#"
                aria-label="Last"
              >
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Paginate;
