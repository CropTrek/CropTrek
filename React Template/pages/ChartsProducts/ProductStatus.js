// import { useEffect, useState } from 'react';
// import axios from "axios";
//
// const ProductStatus = () => {
//     const [products, setProducts] = useState([]);
//
//     useEffect(() => {
//         const fetchProducts = async () => {
//             const result = await axios.get('http://localhost:5000/api/products/Products/NotFiltered');
//
//             setProducts(result.data.products)
//
//             console.log("Hi mouna, products: " + JSON.stringify(result.data.products))
//
//         };
//
//         fetchProducts();
//     }, []);
//
//     const inStockProducts = products.filter(product => product.countInStock!==0);
//     const outOfStockProducts = products.filter(product => product.countInStock===0);
//
//     return (
//         <div style={{maxWidth:"800px"}} >
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <div>
//                     <p style={{ fontSize: '24px' }}>Products in Stock</p>
//                     <p style={{ fontSize: '36px', color: 'green' }}>{                    inStockProducts.length}</p>
//                 </div>
//                 <div>
//                     <p style={{ fontSize: '24px' }}>Products out of Stock</p>
//                     <p style={{ fontSize: '36px', color: 'red' }}>{outOfStockProducts.length}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProductStatus;
import { useEffect, useState } from 'react';
import axios from "axios";
import { Doughnut } from 'react-chartjs-2';

const ProductStatus = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await axios.get('http://localhost:5000/api/products/Products/NotFiltered');

            setProducts(result.data.products)

            console.log("Hi mouna, products: " + JSON.stringify(result.data.products))

        };

        fetchProducts();
    }, []);

    const inStockProducts = products.filter(product => product.countInStock!==0);
    const outOfStockProducts = products.filter(product => product.countInStock===0);

    const data = {
        labels: ['In Stock', 'Out of Stock'],
        datasets: [
            {
                label: 'Product Status',
                data: [inStockProducts.length, outOfStockProducts.length],
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
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Doughnut data={data}  />
        </div>
    );
};

export default ProductStatus;
