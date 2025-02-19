import { useEffect, useState } from "react";
import { IProduct } from "../models/IProduct";
import ProductsList from "./ProductList";
import Header from "./header";

function App() {
    const [products, setProducts ] = useState<IProduct[]>([]);
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5045/api/products');
      const data = await response.json();
      setProducts(data);
    }
    const addProduct = async () => {
       setProducts([...products, {
          id : Date.now(),
          name : `Iphone ${products.length + 1}`,
          description : "The best phone ever",
          price : 1000,
          isActive : true,
          stock : 10
       }
       ]);}
  
    useEffect(() => {
      fetchProducts();
    }, []);
  return (
    <>
    <Header products={products}/>
    <ProductsList products={products} addProductClick ={addProduct}/>
    </>
  )
}




export default App
