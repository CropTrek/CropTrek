// import { useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';
//
// const OrderStatus = () => {
//     const [chartData, setChartData] = useState({});
//
//     useEffect(() => {
//         const fetchData = async () => {
//             // fetch data from the server and format it for the chart
//             const response = await fetch('http://localhost:5000/api/orders');
//             const data = await response.json();
//
//             const labels = ['Paid', 'Unpaid'];
//             const dataValues = [
//                 data.filter(order => order.isPaid).length, // number of paid orders
//                 data.filter(order => !order.isPaid).length, // number of unpaid orders
//             ];
//             const unpaidUsers = data.filter(order => !order.isPaid).map(order => order.user.name);
//
//             const chartData = {
//                 labels: labels,
//                 datasets: [
//                     {
//                         label: 'Order Status',
//                         data: dataValues,
//                         backgroundColor: [
//                             'rgba(75, 192, 192, 0.2)',
//                             'rgba(255, 99, 132, 0.2)',
//                         ],
//                         borderColor: [
//                             'rgba(75, 192, 192, 1)',
//                             'rgba(255, 99, 132, 1)',
//                         ],
//                         borderWidth: 1,
//                     },
//                 ],
//                 options: {
//                     maintainAspectRatio: false,
//                     responsive: true,
//                     height: 100,
//                     width: 100,
//                 },
//             };
//             setChartData(chartData);
//
//             console.log('Unpaid Users:', unpaidUsers); // print list of unpaid users
//         };
//
//         fetchData();
//     }, []);
//
//     useEffect(() => {
//         const ctx = document.getElementById('ordersStatus');
//         let chart = new Chart(ctx, {
//             type: 'bar',
//             data: chartData,
//             options: {
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: 'Orders Status',
//                         font: {
//                             size: 16,
//                         },
//                     },
//                 },
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                     },
//                 },
//             },
//         });
//
//         return () => {
//             chart.destroy();
//         };
//     }, [chartData]);
//     return (
//         <div>
//             <div style={{maxWidth:"300",maxHeight: "200"}}>
//                 <canvas id="ordersStatus"></canvas>
//             </div>
//         </div>
//     );
// };
//
// export default OrderStatus;

import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

const OrderStatus = () => {
    const [paidOrders, setPaidOrders] = useState(0);
    const [unpaidOrders, setUnpaidOrders] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/orders');
            const data = await response.json();

            const paidOrders = data.filter(order => order.isPaid).length;
            const unpaidOrders = data.filter(order => !order.isPaid).length;

            setPaidOrders(paidOrders);
            setUnpaidOrders(unpaidOrders);
        };

        fetchData();
    }, []);

    return (
        <div className="col-xl-7 col-lg-12">
            <div className="row pl-lg-70">
                <div style={{maxHeight:"100px"}}  className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-chart-item text-center mb-40 wow fadeInUp">

                        <div className="text">
                            <p style={{ color:"whitesmoke"}}><b>Paid <br/> Orders</b></p>
                            <p style={{fontSize:"50px", color:"whitesmoke"}}>{paidOrders}</p>
                        </div>
                    </div>
                </div>
                <div  style={{maxHeight:"100px" }} className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-chart-item text-center mb-40 wow fadeInDown">
                        <div className="text">
                            <p style={{ color:"whitesmoke"}}><b>Unpaid <br/>  Orders</b></p>
                            <p style={{fontSize:"50px", color:"whitesmoke"}}>{unpaidOrders}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderStatus;

