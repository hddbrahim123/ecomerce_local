import React from "react";

const OrdreFilter = ({ orderStatus, status, handleChangeFilter }) => {
  return (
    <div className="row">
      <div className="form-group">
        <label htmlFor="status" className="">
          Status : {" "}
        </label>
        <select id="status" value={status} className="" onChange={handleChangeFilter}>
          <option value=""></option>
          {orderStatus &&
            orderStatus.map((e, i) => <option value={e.id}>{e.name}</option>)}
        </select>
      </div>
    </div>
  );
};

export default OrdreFilter;
