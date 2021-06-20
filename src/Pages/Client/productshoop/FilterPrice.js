import React from 'react'

// RangeSlider
import Nouislider from "nouislider-react"
import "nouislider/distribute/nouislider.css"

const  FilterPrice = ({handleFilters})=>{



    const onUpdate = (value) => {
        handleFilters(value)
      }

    return (
        <React.Fragment>
            <div className="my-4 pt-3">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="font-size-14 mb-4">Price</h5>
                        <br />

                        <Nouislider
                            range={{ min: 0, max: 600 }}
                            tooltips={true}
                            start={[100, 500]}
                            connect
                            onSlide={onUpdate}
                        />
                    </div>
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default FilterPrice
