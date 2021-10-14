import React from "react";

const OrdreFilter = ({ orderStatus, filter, handleChangeFilter, search }) => {
  return (
    <div className="row">
      <div className="input-group input-group-sm">
        <label htmlFor="status" className="">
          Status : {" "}
        </label>
        <select id="status" value={filter.status} className=" mx-auto" onChange={handleChangeFilter}>
          <option value=""></option>
          {orderStatus &&
            orderStatus.map((e, i) => <option key={i} value={e.id}>{e.name}</option>)}
        </select>
        <input id="search" value={filter.search??''} onChange={handleChangeFilter} type="search" className="form-control mx-auto"/>
        <span className="mx-2" onClick={search}>
          <i className='bx bx-search-alt bx-flashing bx-sm' style={{color:'#1d5ee0'}} ></i>
        </span>
      </div>
    </div>
  );
};

export default OrdreFilter;
