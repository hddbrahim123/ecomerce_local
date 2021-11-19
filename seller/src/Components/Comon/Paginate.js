import React from "react";
import { Link } from "react-router-dom";

import { map } from "lodash";
import { useSelector } from "react-redux";

const Paginate = (props) => {

  const arrayPages = (totalPages, pageNumber) => {
    var begin = pageNumber - 3;
    var end = pageNumber + 3;
    if (begin < 1) {
      begin = 1;
      end += (3 - pageNumber)
    }
    if (end > totalPages) {
      end = totalPages;
      begin -= (pageNumber + 3 - totalPage)
      if (begin < 1) {
        begin = 1;
      }
    }

    var array = [];
    for (var index = begin; index <= end; index++) {
      array.push(index);
    }
    //console.log(array);
    //console.log("pageNumber:" + pageNumber + ", end: " + end + ", totalPages:" + totalPages);
    return array;
  }

  const { pagination, onPageChange, onLengthPageChange } = props;
  const { pageNumber, length, totalPage } = pagination;
  const lengthPage = [10, 25, 50, 100];

  let pages = useSelector(() => arrayPages(totalPage, pageNumber));

  const handlePageClick = (newPage) => {
    onPageChange(newPage);
    //setPages(arrayPages(totalPage, newPage));
    //pages
  };

  return (
    <React.Fragment>
      <div className="col-3">
        <select
          className={`pagination mt-4 justify-content-center`}
          id="length"
          onChange={(e) => onLengthPageChange ? onLengthPageChange(e.target.value):console.log()}
          value={length}>
          {lengthPage.map((e, i) => (
            <option key={i} value={e}>{e}</option>
          ))}
        </select>
      </div>
      <div className="col-9">
        <nav aria-label="Page navigation example">
          <ul className={`pagination mt-2 mb-5 pb-1 justify-content-left`}>
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
