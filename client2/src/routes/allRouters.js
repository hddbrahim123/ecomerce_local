
//imports Client Pages
import ProductDetails from "../Pages/Client/ProductDetails"
import ProductsCart from "../Pages/Client/productsCart"
import ProductsShop from "../Pages/Client/productshoop"

const clientRoutes = [
    { path:'/products/:category?/:search?', component: ProductsShop },
    { path:'/cart', component: ProductsCart },
    { path:'/product/:slug', component: ProductDetails }
]

export { clientRoutes }