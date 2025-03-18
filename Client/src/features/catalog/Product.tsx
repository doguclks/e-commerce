import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../models/IProduct"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { currencyTRY } from "../../utils/formatCurrencty";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart } from "../cart/cartSlice";
import { toast } from "react-toastify";


interface Props {
  product : IProduct;
}
export default function Product({product} : Props){
  const { status } = useAppSelector((state) => state.cart); 
  const dispatch = useAppDispatch();
  const handleAddItemToCart = (productId : number) => {
    dispatch(addItemToCart({productId}));
    toast.success("Item added to cart");
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
            loading = {status === "loadingAddItem" + product.id}
            onClick={() => handleAddItemToCart(product.id)}
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