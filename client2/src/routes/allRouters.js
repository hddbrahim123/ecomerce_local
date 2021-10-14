
//imports Client Pages
import Index from "../Pages/Client/Home2"
import ProductDetails from "../Pages/Client/ProductDetails"
import ProductsCart from "../Pages/Client/productsCart"
import ProductsShop from "../Pages/Client/productshoop"

const clientRoutes = [
    { path:'/', component: Index },
    { path:'/products/:category?', component: ProductsShop },
    { path:'/cart', component: ProductsCart },
    { path:'/product/:slug', component: ProductDetails }
]

export { clientRoutes }