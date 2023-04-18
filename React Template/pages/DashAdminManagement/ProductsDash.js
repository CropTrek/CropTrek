import Head from 'next/head';

import PageHeader  from "../../src/components/dashboard/OrdersDashboard/PageHeader";
import PageTitleWrapper  from "../../src/components/dashboard/ProductsDashboard/PageTitleWrapper";
import { Grid, Container } from '@mui/material';


import RecentOrders from "../../src/components/dashboard/OrdersDashboard/RecentOrders";
import Footer from "../../src/layouts/Footer";
import Header from "../../src/layouts/Header";
import FullLayout from "../../src/layouts/FullLayout";
import {Breadcrumb} from "reactstrap";
import ChartOrders from "../chartsOrders/ChartOrders";
import ChartsOrder from "../chartsOrders/ChartsOrder";
import OrderStatus from "../chartsOrders/OrdersStatus";
import ChartRevByMonth from "../chartsOrders/ChartRevByMonth";
import RecentProducts from "../../src/components/dashboard/ProductsDashboard/RecentProducts";
import TopSellingProducts from "../ChartsProducts/TopSellingProducts";
import ProductStatus from "../ChartsProducts/ProductStatus";
import ProductChart from "../ChartsProducts/ProductChart";
import AccessDach from "../AccessDach";
import {useEffect, useState} from "react";
const ChartWrapper = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
};
function ProductsDashPage() {
    const [connectedUser, setConnectedUser] = useState(null);
    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        setConnectedUser(profile);

    }, []);
    return (
        <>
            {!connectedUser || connectedUser.role !== "admin" && <AccessDach/> }
            {connectedUser &&
                <FullLayout>


                    <PageTitleWrapper>
                        <PageHeader/>
                    </PageTitleWrapper>
                    <Container maxWidth="lg">


                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            spacing={3}
                        >
                            <Grid item xs={12}>

                                <RecentProducts/>
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                        <div style={{flex: 1, width: '25.33%'}}>
                            <ProductStatus/>
                        </div>
                        <div style={{display: 'flex'}}>

                            <div style={{flex: 1, width: '33.33%'}}>
                                <TopSellingProducts/>
                            </div>
                            <div style={{flex: 1, width: '33.33%'}}>
                                <ProductChart/>
                            </div>
                        </div>


                    </Container>

                </FullLayout>
            }
        </>
    );
}



export default ProductsDashPage;
