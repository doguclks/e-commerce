import { TableCell, TableContainer, TableRow } from "@mui/material";
import { useCartContext } from "../../context/CartContext";
import { currencyTRY } from "../../utils/formatCurrencty";

export default function CartSummary()
{
    const {cart} = useCartContext();
    const subTotal = cart?.cartItems.reduce((subTotal, item) => subTotal + item.quantity * item.price, 0) ?? 0;
    const tax = subTotal * 0.2;
    const total = subTotal + tax;
    return (
        <>
            <TableRow>
                <TableCell align="right" colSpan={5}>Subtotal</TableCell>
                <TableCell align="right">{currencyTRY.format(subTotal)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>Tax (%20)</TableCell>
                <TableCell align="right">{currencyTRY.format(tax)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>Total </TableCell>
                <TableCell align="right">{currencyTRY.format(total)}</TableCell>
            </TableRow>
        </>
    )
}