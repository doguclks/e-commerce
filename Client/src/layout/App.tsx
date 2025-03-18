
import Header from "./Header";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import requests from "../api/request";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setCart } from "../features/cart/cartSlice";
function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requests.Cart.get()
      .then(cart => dispatch(setCart(cart)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  },[])

  if (loading) return <CircularProgress/>

  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    <CssBaseline/>
    <Header />
    <Container>
    <Outlet/>
    </Container>
    </>
  )
}




export default App
