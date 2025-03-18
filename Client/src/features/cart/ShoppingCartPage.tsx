import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AddCircleOutline, Delete, RemoveCircleOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import CartSummary from './CartSummary';
import { currencyTRY } from '../../utils/formatCurrencty';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addItemToCart, deleteItemFromCart } from './cartSlice';

function ShoppingCartPage() {
  
    const {cart, status} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

 
    function handleGoToProductDetails(productId : number)
    {
      window.location.href = `/catalog/${productId}`
    }
    
    if (cart?.cartItems.length === 0) return <Alert severity = "warning">There is no item in the cart</Alert>
  return (
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.cartItems.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={`http://localhost:5045/images/${item.imageUrl}`} style={{height: 60, cursor: "pointer"}} onClick={() => handleGoToProductDetails(item.productId)}/>
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{currencyTRY.format(item.price)}</TableCell>
              <TableCell align="right">
                <LoadingButton loading={status === "loadingAddItem" + item.productId} 
                onClick={() => dispatch(addItemToCart({productId: item.productId}))}>
                <AddCircleOutline/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={status === 'loadingDeleteItem' + item.productId + "single"} onClick={() => dispatch(deleteItemFromCart({productId: item.productId, quantity: 1, key: "single"}))}>
                <RemoveCircleOutline/>
                </LoadingButton>
                </TableCell>
              <TableCell align="right">{currencyTRY.format( item.price * item.quantity)}</TableCell>
              <TableCell align="right">
                <LoadingButton color='error' loading={status === 'loadingDeleteItem' + item.productId + "all"} onClick={() => dispatch(deleteItemFromCart({productId: item.productId, quantity: item.quantity, key: "all"}))}>
                  <Delete/>
                </LoadingButton>
              </TableCell> 
            </TableRow>
          ))}
        <CartSummary/>
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default ShoppingCartPage