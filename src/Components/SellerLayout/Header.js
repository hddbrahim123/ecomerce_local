import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import avatar from '../../assets/icons/avatar-1.jpg'
import profile from '../../assets/icons/HDD.png'
import { toggleLeftmenu } from '../../store/layout/actions'

const Header = ()=>{

    let isOpen = useSelector(state => state.Layout.leftMenu)
    const dispatch = useDispatch()

    const [showProfileMenu , setShowProfileMenu] = useState(false)
    const toggleProfileMenu = ()=>setShowProfileMenu(!showProfileMenu)

    const logout = () => {
      localStorage.removeItem('JWT_SELLER')
    }

    return (
        <React.Fragment>
            <header className="head__main shadow-sm">
             <nav className="head">   
              <div className="head__toggle" onClick={()=> {dispatch(toggleLeftmenu(!isOpen))}}>
                <div className="head__brand">
                   <i className='bx bxs-disc nav__icon' ></i>
                   <span className="head__logo"><img src={profile} alt="name" width="100%"/></span>
                </div>

                {isOpen ? 
                    <i className='bx bx-x head__icon'></i>
                :
                    <i className='bx bx-menu-alt-left head__icon'></i>
                }
              </div>
              
              <div className="head__right">
                <div className="head__notification">
                  <div className="head__notification__toggle">
                    <i className="bx bx-bell bx-tada " />
                    <span >3</span>
                  </div>
                  

                   <div className="head__notification__collapse">
                    <div className="head__notification__content shadow">
                       <div className="head__notification__header d-flex justify-content-between">
                        <span>notification</span>
                        <Link to="#" className="head__notification__header__link">view all</Link>
                       </div> 
                       <div className="head__notification__body">
                         <Link className="d-flex align-items-center" to="#">
                            <div className="mr-3">
                                <div className="icon-circle bg-primary">
                                    <i className="bx bx-cart text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 12, 2019</div>
                                <span className="font-weight-bold">A new monthly report is ready to download!</span>
                            </div>
                         </Link>
                       </div>
                       <div className="head__notification__footer">
                       
                       </div>                        
                    </div> 
                   </div>
                </div>    

              <div className="head__profile" onClick={toggleProfileMenu}>
               <img src={avatar} alt="profile" className="head__avatar" />
               <span className="head__profile__name headprofile__icon">Hddbrahim</span>
               <i className='bx bx-down-arrow-alt head__profile__icon'></i>

               <div className={showProfileMenu ? "head__profile__collapse show__profile" : "head__profile__collapse"}>
                  <div className="head__profile__content shadow">
                        <ul>
                          <li><Link to="#" className="head__profile__link"><i className='bx bx-user head__profile__link__icon'></i>profile</Link> </li>
                          <li><Link to="#" className="head__profile__link"><i className='bx bx-log-out head__profile__link__icon' ></i>setting</Link> </li>
                          <hr/>
                          <li><Link to="#" onClick={logout} className="head__profile__link"><i className='bx bx-log-out head__profile__link__icon' ></i>log out</Link> </li>
                        </ul>   
                   </div> 
               </div>
               
              </div>
              </div>
             </nav>
            </header>
        </React.Fragment>
    )
}

export default Header
