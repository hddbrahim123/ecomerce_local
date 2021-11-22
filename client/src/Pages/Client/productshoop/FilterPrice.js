import React from "react";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import dictionary from "../../../Core/dictionary"

const FilterPrice = ({ language,handleFilters }) => {
  const onUpdate = (value) => {
    handleFilters(value);
  };
  const content = dictionary.product[language]
  return (
    <React.Fragment>
      <div className="my-4 pt-0">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="font-size-14 mb-4">{content.titlePrice}</h5>
            <br />
            <Nouislider
              range={{ min: 0, max: 10000 }}
              tooltips={true}
              start={[0, 10000]}
              connect
              onSlide={onUpdate}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterPrice;
