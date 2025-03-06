import { useEffect, useState } from 'react'
import { CircularProgress, Divider, Grid2, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { IProduct } from '../../models/IProduct';
import requests from '../../api/request';
import NotFound from '../../errors/NotFound';
import LoadingButton from '@mui/lab/LoadingButton';
import { AddShoppingCart } from '@mui/icons-material';
import { useCartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { currencyTRY } from '../../utils/formatCurrencty';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCart } from '../cart/cartSlice';
function ProductDetailsPage() {

  const {cart} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const {id} = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>();
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const item = cart?.cartItems.find(item => item.productId === product?.id);
  const getProductById = async () => {
    id && requests.Catalog.details(parseInt(id))
    .then(data => setProduct(data))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }
  useEffect(() => {
    getProductById();
  }, [id])

  function handleAddItem(productId : number)
  {
    setIsAdded(true);
    requests.Cart.addItem(productId)
    .then(cart => {
      dispatch(setCart(cart));
      toast.success("Item added to cart");
    })
    .catch(error => console.log(error))
    .finally(() => setIsAdded(false));
  }
  if (loading) return <CircularProgress/>
  if (!product) return <NotFound/>

  return (
    <>
    <Grid2 container spacing={6}>
      <Grid2 size={{xl: 3, lg: 4 , md: 5 ,sm : 6 , xs : 12}}>
        <img src={`http://localhost:5045/images/${product.imageUrl}`} alt={product.name} style={{width: "100%"}}/>
      </Grid2>
      <Grid2 size={{xl: 9, lg: 8 , md: 7 ,sm : 6 , xs : 12}}>
        <Typography variant="h2">{product.name}</Typography>
        <Divider sx={{mb: 2}}/>
        <Typography variant="h4" color='secondary.dark'>{currencyTRY.format(product.price)}</Typography>
        <TableContainer>
          <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>Stock</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" spacing={2} sx={{mt: 2 , alignItems: "center" }}>
          <LoadingButton 
          variant = "outlined"
           loadingPosition = "start"
           startIcon={<AddShoppingCart/>}
           loading = {isAdded}
           onClick={() => handleAddItem(product.id)}
           >Add to Cart</LoadingButton>
           {
            item?.quantity! > 0 && (
              <Typography variant='body2'>In Cart : {item?.quantity}</Typography>
            )
           }
        </Stack>
      </Grid2>
      </Grid2>

    </>
  )
}

export default ProductDetailsPage