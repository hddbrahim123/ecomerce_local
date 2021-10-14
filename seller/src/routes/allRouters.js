
//imports Seller Pages
// import Dashboard from "../Pages/Seller"
import SellerLogin from "../Pages/Seller/Authentication/SellerLogin"
import Category from "../Pages/Seller/category"
import CreateCateory from "../Pages/Seller/category/Create"
import Orders from "../Pages/Seller/Order"
import OrderView from "../Pages/Seller/Order/OrderView"
import Products from "../Pages/Seller/Products"
import FormProduct from "../Pages/Seller/Products/FormProduct"
import Slides from "../Pages/Seller/Slide"
import FormSlide from "../Pages/Seller/Slide/FormSlide"

const sellerRoutes = [
  { path:'/', component: Products },  
  { path:'/seller', component: Products },
    
    { path:'/seller/categories' , component: Category },
    { path:'/seller/categories/create' , component: CreateCateory },
    { path:'/seller/categories/edit/:id' , component: CreateCateory },


    { path:'/seller/products' , component: Products },
    { path:'/seller/products/create' , component: FormProduct },
    { path:'/seller/product/edit/:slug' , component: FormProduct },
    
    { path:'/seller/orders' , component: Orders },
    { path:'/seller/order/:orderNumber' , component: OrderView },

    { path:'/seller/slide/create' , component: FormSlide },
    { path:'/seller/slide/edit/:id' , component: FormSlide },
    { path:'/seller/slides' , component: Slides },
    
]
  const authSeller = [
  { path:'/seller/login' , component: SellerLogin },
]

export { sellerRoutes , authSeller}