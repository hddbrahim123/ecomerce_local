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
    console.log(array);
    console.log("pageNumber:" + pageNumber + ", end: " + end + ", totalPages:" + totalPages);
    return array;
  }

  const { pagination, onPageChange, onLengthPageChange } = props;
  const { pageNumber, length, totalPage } = pagination;
  const lengthPage = [10, 25, 50, 100];

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
