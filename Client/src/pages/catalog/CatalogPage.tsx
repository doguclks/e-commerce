import { useEffect, useState } from 'react'
import ProductsList from './ProductList'
import { IProduct } from '../../models/IProduct';
import { CircularProgress } from '@mui/material';
import requests from '../../api/request';


function CatalogPage() {
    const [products, setProducts ] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts =  () => {
        requests.Catalog.list()
        .then(data => setProducts(data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <CircularProgress/>
    if (!products) return <h5>Products not found...</h5>
  return (
    <>
    <ProductsList products={products}/>
    </>
  )
}

export default CatalogPage