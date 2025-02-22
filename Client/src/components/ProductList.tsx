import { Grid2 } from "@mui/material";
import { IProduct } from "../models/IProduct";
import Product from "./Product";

interface Props {
  products: IProduct[];
}
export default function ProductsList({products} : Props){ 
    return (
      <>
      <Grid2 container spacing={2}>
      {products.map((product: IProduct) => (
        <Grid2 size={{xs: 12, md: 4, lg: 3}}>
        <Product key = {product.id} product={product}/>  
      </Grid2>
      ))}
      </Grid2>
      </>
    )
  }             