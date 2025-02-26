import { createBrowserRouter, Navigate } from "react-router-dom"
import App from "../components/App"
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import ContactPage from "../pages/ContactPage"
import CatalogPage from "../pages/catalog/CatalogPage"
import ProductDetailsPage from "../pages/catalog/ProductDetailsPage"
import ErrorPage from "../pages/catalog/ErrorPage"
import ServerError from "../errors/ServerError"
import NotFound from "../errors/NotFound"


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            { path: "", element: <HomePage/> },
            { path: "about", element: <AboutPage/> },    
            { path: "contact", element: <ContactPage/> },    
            { path: "catalog", element: <CatalogPage/> },    
            { path: "error", element: <ErrorPage/> },    
            { path: "catalog/:id", element: <ProductDetailsPage/> },
            { path: "server-error", element: <ServerError/> },    
            { path: "not-found", element: <NotFound/> },    
            { path: "*", element: <Navigate to="/not-found"/> },    
    ]
    }
    ])
