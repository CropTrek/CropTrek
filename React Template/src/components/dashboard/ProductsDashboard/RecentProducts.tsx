import { Card } from '@mui/material';
import { CryptoProduct } from './crypto_product';
import RecentProductsTable from './RecentProductsTable';
import { subDays } from 'date-fns';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OrderStatus from "../../../../pages/chartsOrders/OrdersStatus";
import ProductFormUpdate from "./ProductFormUpdate"
function RecentProducts() {

    const [showProducts, setShowProducts] = useState([]);
    useEffect(() => {



        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/api/products/Products/NotFiltered');

            setShowProducts(result.data.products)
            console.log("Hi mouna, orders: " + JSON.stringify(result.data.products))
        };
        fetchData()
    },[])
    // const cryptoOrders: CryptoOrder[] = [
    //     {
    //         id: '1',
    //         orderDetails: 'Fiat Deposit',
    //         orderDate: new Date().getTime(),
    //         status: 'completed',
    //         orderID: 'VUVX709ET7BY',
    //         sourceName: 'Bank Account',
    //         sourceDesc: '*** 1111',
    //         amountCrypto: 34.4565,
    //         amount: 56787,
    //         cryptoCurrency: 'ETH',
    //         currency: '$'
    //     },


    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleEditClick =async (product) => {
        setSelectedProduct(product);
        setShowEditForm(true);

    }


    const handleDeleteOrder=async (orderId: string)=> {


        if (window.confirm(' Are you sure you want to delete')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${orderId}`);
                toast.success('Product deleted', { autoClose: 5000 });

                const updatedCryptoOrders = showProducts.filter(order => order._id !== orderId);

                setShowProducts(updatedCryptoOrders);

            } catch (error) {
                console.error(error);
                toast.error('An error occurred while deleting the product');
            }
        }


    }
    const handleFormCance2=async ()=>{
        setShowEditForm(false)
        const res=  await axios.get(`http://localhost:5000/api/products//Products/NotFiltered`);




        setShowProducts(res.data.products);
    }
    return (
<>



        <Card>



            <RecentProductsTable cryptoProducts={showProducts} deleteB={handleDeleteOrder}  handleEditClick={handleEditClick}/>
            {showEditForm ? (
                <ProductFormUpdate product={selectedProduct} onCancel={handleFormCance2} defaultValues={selectedProduct} />
            ) : null}
        </Card>
</>
    );
}

export default RecentProducts;
