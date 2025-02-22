import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../models/IProduct"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';


interface Props {
  product : IProduct;
}
export default function Product({product} : Props){
  
    return (
      <>
      <Card> 
        <CardMedia sx ={{height: 300 , backgroundSize: "contain"}} image = {`http://localhost:5045/images/${product.imageUrl}`}/>
        <CardContent>
          <Typography gutterBottom variant="h6" color ="text.secondary" component="h2">{product.name}</Typography>
          <Typography variant="body2" color ="secondary" component="p">{(product.price / 100).toFixed(2)} $</Typography>
        </CardContent>
        <CardActions>
          <Button variant = "outlined" size="small" color="primary" startIcon = {<AddShoppingCartIcon/>} >Add to Cart</Button> 
          <Button variant = "outlined" size="small" color="secondary" startIcon = {<SearchIcon/>} >View</Button>
        </CardActions>
      </Card>
      
      </>
    )
  }