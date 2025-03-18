import { useEffect, useState } from 'react'
import ProductsList from './ProductList'
import { IProduct } from '../../models/IProduct';
import { CircularProgress } from '@mui/material';
import requests from '../../api/request';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProducts, selectAllProducts } from './catalogSlice';


function CatalogPage() {
    
    const products = useAppSelector(selectAllProducts);
    const {status, isLoaded } = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!isLoaded)
        dispatch(fetchProducts());
    }, [isLoaded]);

    if (status === "loading") return <CircularProgress/>
    if (!products) return <h5>Products not found...</h5>
  return (
    <>
    <ProductsList products={products}/>
    </>
  )
}

export default CatalogPage