import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AddCircleOutline, Delete, RemoveCircleOutline } from '@mui/icons-material';
import { useCartContext } from '../../context/CartContext';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import requests from '../../api/request';

function ShoppingCartPage() {
  
    const { cart,setCart} = useCartContext();
    const [loading, setLoading]  = useState(false);

    function handleAddItem(productId : number) 
    {
      setLoading(true);
      requests.Cart.addItem(productId)
        .then(cart => setCart(cart))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }   
    function handleDeleteItem(productId: number, quantity = 1)
    {
      setLoading(true);
      requests.Cart.deleteItem(productId, quantity)
        .then(cart => setCart(cart))
        .catch(error => console.log(error))
        .finally(() => setLoading(false)); 
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
                <img src={`http://localhost:5045/images/${item.imageUrl}`} style={{height: 60}} />
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.price} $</TableCell>
              <TableCell align="right">
                <LoadingButton loading={loading} onClick={() => handleAddItem(item.productId)}>
                <AddCircleOutline/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={loading} onClick={() => handleDeleteItem(item.productId)}>
                <RemoveCircleOutline/>
                </LoadingButton>
                
                </TableCell>
              <TableCell align="right">{item.price * item.quantity} $</TableCell>
              <TableCell align="right">
                <LoadingButton color='error' loading={loading} onClick={() => handleDeleteItem(item.productId,item.quantity)}>
                  <Delete/>
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ShoppingCartPage