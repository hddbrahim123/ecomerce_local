import React from 'react'
import { withRouter } from 'react-router'
// import Footer from './Footer'

import Header from './header'

const ClientLayout = (props)=>{
    return (
        <React.Fragment>
            <Header />
            <main id="page__topbar">
                {props.children} 
            </main>
            {/* <Footer />             */}
        </React.Fragment>
    )
}

export default withRouter(ClientLayout)
