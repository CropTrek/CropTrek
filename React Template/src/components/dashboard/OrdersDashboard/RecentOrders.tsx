import { Card } from '@mui/material';
import { CryptoOrder } from './crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OrderStatus from "../../../../pages/chartsOrders/OrdersStatus";
function RecentOrders() {

    const [showOrders, setShowOrders] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/api/orders');

            setShowOrders(result.data)
            console.log("Hi mouna, orders: " + JSON.stringify(result.data))
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

    const handleDeleteOrder=async (orderId: string)=> {


        if (window.confirm(' Are you sure you want to delete')) {
            try {
                await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
                toast.success('Order deleted', { autoClose: 5000 });

                // Filtrez le tableau cryptoOrders pour supprimer l'order avec l'id orderId
                const updatedCryptoOrders = showOrders.filter(order => order._id !== orderId);
                // Mettre à jour le state cryptoOrders
                setShowOrders(updatedCryptoOrders);

            } catch (error) {
                console.error(error);
                toast.error('An error occurred while deleting the order');
            }
        }


    }

    return (
<>



        <Card>



            <RecentOrdersTable cryptoOrders={showOrders} deleteB={handleDeleteOrder}/>
        </Card>
</>
    );
}

export default RecentOrders;
