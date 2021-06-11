import React from 'react'
import Arrivals from './Arrivals'
import Collection from './Collection'
import Featured from './Featured'
import Home from './Home'
import Offer from './Offer'

const index = ()=>{
    return (
        <React.Fragment>
            <Home />
            <Featured />
            <Collection />
            <Arrivals />
            <Offer />
        </React.Fragment>
    )
}

export default index
