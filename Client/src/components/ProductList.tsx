import { IProduct } from "../models/IProduct";
import Product from "./Product";

export default function ProductsList(props : any){
    return (
      <>
      <h2>ProductList</h2>
      {props.products.map((product : IProduct) => (
        <Product key={product.id} products={product}/>
      ))}
      <button onClick={props.addProductClick}>Product Add</button>
      
      </>
    )
  }