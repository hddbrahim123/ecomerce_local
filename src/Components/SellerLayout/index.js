import React from 'react'
import { withRouter } from 'react-router'
import Header from './Header'

import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'

const SellerLayout = (props)=>{

  let isOpen = useSelector(state => state.Layout.leftMenu)

    return (
        <React.Fragment >
          <Header />
          <Sidebar />
          <main className={ isOpen ? "content__page active__padding" : "content__page" }>
            {props.children} 
          </main>
        </React.Fragment>
    )
}

export default withRouter(SellerLayout)
