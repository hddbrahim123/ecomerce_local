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
import Products from "../Pages/Seller/Products"
import CreateProduct from "../Pages/Seller/Products/Create"
import SellerProductDetails from "../Pages/Seller/Products/ProductDetails"

const clientRoutes = [
    { path:'/' , component:Home},
    { path:'/products' , component: ProductsShop},
    { path:'/product/:slug' , component: ProductDetails},
    { path:'/products/cart' , component: ProductsCart},
]

const sellerRoutes = [
    { path:'/seller/dashboard' , component: Dashboard },
    
    { path:'/seller/categories' , component: Category },
    { path:'/seller/categories/create' , component: CreateCateory },


    { path:'/seller/products/create' , component: CreateProduct },
    { path:'/seller/products' , component: Products },
    { path:'/seller/product/:slug' , component: SellerProductDetails },

    { path:'/seller/orders' , component: Orders },

  { path: "/seller", exact: true, component: () => <Redirect to="/seller/dashboard" /> },

]
const authSeller = [
  { path:'/seller/login' , component: SellerLogin },
]

export { clientRoutes , sellerRoutes , authSeller}