import { Redirect } from "react-router"

//imports Client Pages
import Home from "../Pages/Client/Home"
import ProductDetails from "../Pages/Client/ProductDetails"
import ProductsCart from "../Pages/Client/productsCart"
import ProductsShop from "../Pages/Client/productshoop"

//imports Seller Pages
import Dashboard from "../Pages/Seller"
import SellerLogin from "../Pages/Seller/Authentication/SellerLogin"
import Category from "../Pages/Seller/category"
import CreateCateory from "../Pages/Seller/category/Create"
import Orders from "../Pages/Seller/Order"
import OrderView from "../Pages/Seller/Order/OrderView"
import Products from "../Pages/Seller/Products"
import FormProduct from "../Pages/Seller/Products/FormProduct"
import SellerProductDetails from "../Pages/Seller/Products/ProductDetails"
import Slides from "../Pages/Seller/Slide"
import FormSlide from "../Pages/Seller/Slide/FormSlide"

const clientRoutes = [
    { path:'/' , component:Home},
    { path:'/products' , component: ProductsShop},
    { path:'/product/:slug' , component: ProductDetails},
    { path:'/cart' , component: ProductsCart},
]

const sellerRoutes = [
    { exact: true, path:'/seller', component: Products },
    
    { exact: true, path:'/seller/categories' , component: Category },
    { exact: true, path:'/seller/categories/create' , component: CreateCateory },
    { exact: true, path:'/seller/categories/edit/:id' , component: CreateCateory },


    { exact: true, path:'/seller/products' , component: Products },
    { exact: true, path:'/seller/product/:slug' , component: SellerProductDetails },
    { exact: true, path:'/seller/products/create' , component: FormProduct },
    { exact: true, path:'/seller/product/edit/:slug' , component: FormProduct },
    
    { exact: true, path:'/seller/orders' , component: Orders },
    { exact: true, path:'/seller/order/:orderNumber' , component: OrderView },

    { exact: true, path:'/seller/slide/create' , component: FormSlide },
    { exact: true, path:'/seller/slides' , component: Slides },
    
]
  const authSeller = [
  { exact: true, path:'/seller/login' , component: SellerLogin },
]

export { clientRoutes , sellerRoutes , authSeller}