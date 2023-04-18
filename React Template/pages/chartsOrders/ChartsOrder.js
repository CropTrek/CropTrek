import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const ChartsOrder = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/orders');
            const data = await response.json();

            const labels = data.map(order => `${order._id} - ${order.user.name}`);
            const dataValues = data.map(order => order.totalPrice); // extract total prices as data values
            const namesUser = data.map(order => order.user.name);

            const maxTotal = Math.max(...dataValues); // find the highest total
            const backgroundColors = dataValues.map(total => (total === maxTotal ? 'rgba(255, 159, 64, 0.2)' : 'rgba(75, 192, 192, 0.2)')); // color the highest total in orange


            const chartData = {
               labels: labels,

                datasets: [
                    {
                        label: 'Total',
                        data: dataValues,
                        backgroundColor: backgroundColors,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'User Names',
                        data: namesUser,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                ],
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    height: 100,
                    width: 100,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Orders Chart',
                            font: {
                                size: 16,
                            },
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            };
            setChartData(chartData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const ctx = document.getElementById('ordersChart');
        let chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {

                responsive: true,
                height: 100,
                width: 100,
                plugins: {
                    title: {
                        display: true,
                        text: 'Orders Chart',
                        font: {
                            size: 16,
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            chart.destroy();
        };
    }, [chartData]);

    return (
        <div>
            <canvas id="ordersChart"  style={{maxHeight: "800"}}></canvas>
        </div>
    );
};

export default ChartsOrder;
