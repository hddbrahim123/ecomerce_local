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
      <div className="pagination" style={{position:'relative'}}>
        <select
          className={`input-sm`}
          id="length"
          onChange={(e) => onLengthPageChange ? onLengthPageChange(e.target.value):console.log()}
          value={length}>
          {lengthPage.map((e, i) => (
            <option key={i} value={e}>{e}</option>
          ))}
        </select>
        <ul style={{position:'absolute',top:'0px',right:'10px'}}>
          <li><a className={pageNumber === 1 ? 'disabled':'disabled'} onClick={() => handlePageClick(1)}>‹‹</a></li>
          <li><a className={pageNumber === 1 ? 'disabled':'disabled'} onClick={() => handlePageClick(pageNumber - 1)}>‹</a></li>
          {map(pages, (item, i) => (
            <li key={i}><a style={item === pageNumber ? {background: 'darkgray'}:{}} className={ item === pageNumber ? 'active' : ''} onClick={() => handlePageClick(item)}>{item}</a></li>
          ))}
          <li><a className={pageNumber >= totalPage ? 'disabled':'disabled'} onClick={() => handlePageClick(pageNumber + 1)}>›</a></li>
          <li><a className={pageNumber >= totalPage ? 'disabled':'disabled'} onClick={() => handlePageClick(totalPage)}>››</a></li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Paginate;
