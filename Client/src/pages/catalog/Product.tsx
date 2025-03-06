import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../models/IProduct"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { useState } from "react";
import requests from "../../api/request";
import { LoadingButton } from "@mui/lab";
import { useCartContext } from "../../context/CartContext";
import { currencyTRY } from "../../utils/formatCurrencty";
import { useAppDispatch } from "../../hooks/hooks";
import { setCart } from "../cart/cartSlice";


interface Props {
  product : IProduct;
}
export default function Product({product} : Props){
  
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  function handleAddItem(productId : number)
  {
    setLoading(true);
    requests.Cart.addItem(productId)
    .then(cart => dispatch(setCart(cart)))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }
    return (
      <>
      <Card> 
        <CardMedia sx ={{height: 300 , backgroundSize: "contain"}} image = {`http://localhost:5045/images/${product.imageUrl}`}/>
        <CardContent>
          <Typography gutterBottom variant="h6" color ="text.secondary" component="h2">{product.name}</Typography>
          <Typography variant="body2" color ="secondary" component="p">{currencyTRY.format(product.price)}</Typography>
        </CardContent>
        <CardActions>
          <LoadingButton 
            loading = {loading}
            onClick={() => handleAddItem(product.id)}
            loadingPosition="start"
            startIcon={<AddShoppingCartIcon/>}
            variant="outlined"
            size = "small"
          >Add to Cart
          </LoadingButton>
          <Button component = {Link} to={`/catalog/${product.id}`} variant = "outlined" size="small" color="secondary" startIcon = {<SearchIcon/>} >View</Button>
        </CardActions>
      </Card>
      
      </>
    )
  }