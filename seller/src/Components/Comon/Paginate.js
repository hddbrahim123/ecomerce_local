import React from "react";
import { Link } from "react-router-dom";

import { map } from "lodash";
import { useSelector } from "react-redux";

const Paginate = (props) => {

  const { pagination, onPageChange, onLengthPageChange } = props;
  const { pageNumber, length, totalPage } = pagination;
  const lengthPage = [10, 25, 50, 100];

  const arrayPages = (totalPages, pageNumber) => {
    let range = 5, start = 1;
    let paging = [];
    if (pageNumber < (range / 2) + 1 ) {
        start = 1;
    } else if (pageNumber >= (totalPages - (range / 2) )) {
        start = Math.floor(totalPages - range + 1);
    } else {
        start = (pageNumber - Math.floor(range / 2));
    }
    let end = ((start + range) - 1);
    if (end > totalPages) {
      end = totalPages;
    }
    for (let i = start; i <= end; i++) {
            paging.push(i);
    }
    return paging;
  }


  // const arrayPages = (totalPages, pageNumber) => {
  //   console.log({pageNumber, length, totalPages});
  //   var begin = pageNumber - 3;
  //   var end = pageNumber + 3;
  //   if (begin < 1) {
  //     begin = 1;
  //     end += (3 - pageNumber)
  //   }
  //   if (end > totalPages) {
  //     end = totalPages;
  //     begin -= (pageNumber + 3 - totalPage)
  //     if (begin < 1) {
  //       begin = 1;
  //     }
  //   }
  //   var array = [];
  //   for (var index = begin; index <= end; index++) {
  //     array.push(index);
  //   }
  //   console.log(array);
  //   return array;
  // }

  let pages = useSelector(() => arrayPages(totalPage, pageNumber));

  const handlePageClick = (newPage) => {
    if (newPage > 0 && newPage <= totalPage) {
      onPageChange(newPage);
    }
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
