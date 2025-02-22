import { useEffect, useState } from "react";
import { IProduct } from "../models/IProduct";
import ProductsList from "./ProductList";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";

function App() {
    const [products, setProducts ] = useState<IProduct[]>([]);
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5045/api/products');
      const data = await response.json();
      setProducts(data);
    }

      useEffect(() => {
      fetchProducts();
    }, []);
  return (
    <>
    <CssBaseline/>
    <Header />
    <Container>
    <ProductsList products={products}/>
    </Container>
    </>
  )
}




export default App
