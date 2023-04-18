import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const ProductChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('http://localhost:5000/api/products/Products/NotFiltered');
            const addresses = data.products.map((product) => product.user.adresse);

            const counts = {};
            addresses.forEach((address) => {
                counts[address] = counts[address] ? counts[address] + 1 : 1;
            });

            const chartData = {
                labels: Object.keys(counts),
                datasets: [
                    {
                        label: 'Number of products',
                        data: Object.values(counts),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            };

            setChartData(chartData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartData) {
            const ctx = document.getElementById('product-chart');
            new Chart(ctx, {
                type: 'bar', // Change the chart type to "bar"
                data: chartData,
                options: {
                    scales: {
                        yAxes: [{ ticks: { beginAtZero: true } }],
                    },
                },
            });
        }
    }, [chartData]);

    return (
        <div className="chart-container">
            <canvas id="product-chart"></canvas>
        </div>
    );
};

export default ProductChart;
