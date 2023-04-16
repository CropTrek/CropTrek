import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const ChartRevByMonth = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/products');

            const data = await response.json();

            const revenuesByYearAndMonth = {};


            data.forEach(order => {
                if (order.isPaid) {
                    const year = new Date(order.createdAt).getFullYear();
                    const month = new Date(order.createdAt).getMonth() + 1;
                    if (revenuesByYearAndMonth[year]) {
                        if (revenuesByYearAndMonth[year][month]) {
                            revenuesByYearAndMonth[year][month] += order.totalPrice;
                        } else {
                            revenuesByYearAndMonth[year][month] = order.totalPrice;
                        }
                    } else {
                        revenuesByYearAndMonth[year] = {};
                        revenuesByYearAndMonth[year][month] = order.totalPrice;
                    }
                }
            });


            const revenuesByYear = {};
            Object.entries(revenuesByYearAndMonth).forEach(([year, revenuesByMonth]) => {
                const labels = Object.keys(revenuesByMonth).map(month => `Month ${month}`);
                const dataValues = Object.values(revenuesByMonth);

                revenuesByYear[year] = {
                    labels,
                    dataValues,
                };
            });

            const chartData = {
                labels: Object.keys(revenuesByYear).map(year => `Year ${year}`),
                datasets: Object.entries(revenuesByYear).map(([year, { labels, dataValues }]) => ({
                    label: `Total Revenue - ${year}`,
                    data: dataValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                })),
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    height: 100,
                    width: 100,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Total Revenue by Month of each year',
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


    return (
        <div>
            <canvas id="ordersChart3" style={{ maxHeight: "800" }}></canvas>
        </div>
    );
};

export default ChartRevByMonth;
