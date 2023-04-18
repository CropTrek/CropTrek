import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function TopSellingProducts() {
    const [topSellingProducts, setTopSellingProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/orders')
            .then(response => {
                const orderItems = response.data.flatMap(order => order.orderItems);
                const productQuantities = {};

                orderItems.forEach(orderItem => {
                    if (orderItem.product in productQuantities) {
                        productQuantities[orderItem.product] += orderItem.qty;
                    } else {
                        productQuantities[orderItem.product] = orderItem.qty;
                    }
                });

                const topSellingProducts = Object.entries(productQuantities)
                    .sort(([, qty1], [, qty2]) => qty2 - qty1)
                    .slice(0, 5);

                setTopSellingProducts(topSellingProducts);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        const canvas = document.getElementById('top-selling-products-chart');
        const ctx = canvas.getContext('2d');

        // Destroy previous chart
        if (window.topSellingProductsChart) {
            window.topSellingProductsChart.destroy();
        }

        // Create new chart
        const data = topSellingProducts.map(([productId, qty]) => qty);
        window.topSellingProductsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: topSellingProducts.map(([productId, qty]) => productId),
                datasets: [{
                    label: 'Top selling products',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, [topSellingProducts]);

    return (
        <div>
            <canvas  id="top-selling-products-chart"  ></canvas>
        </div>
    );
}

export default TopSellingProducts;
