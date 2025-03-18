import { createBrowserRouter, Navigate } from "react-router-dom"
import HomePage from "../features/HomePage"
import AboutPage from "../features/AboutPage"
import ContactPage from "../features/ContactPage"
import CatalogPage from "../features/catalog/CatalogPage"
import ProductDetailsPage from "../features/catalog/ProductDetailsPage"
import ErrorPage from "../features/catalog/ErrorPage"
import ServerError from "../errors/ServerError"
import NotFound from "../errors/NotFound"
import ShoppingCartPage from "../features/cart/ShoppingCartPage"
import App from "../layout/App"


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            { path: "", element: <HomePage/> },
            { path: "about", element: <AboutPage/> },    
            { path: "contact", element: <ContactPage/> },    
            { path: "catalog", element: <CatalogPage/> },    
            { path: "cart", element: <ShoppingCartPage/> },    
            { path: "error", element: <ErrorPage/> },    
            { path: "catalog/:id", element: <ProductDetailsPage/> },
            { path: "server-error", element: <ServerError/> },    
            { path: "not-found", element: <NotFound/> },    
            { path: "*", element: <Navigate to="/not-found"/> },    
    ]
    }
    ])
