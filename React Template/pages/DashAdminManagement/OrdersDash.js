import Head from 'next/head';

import PageHeader  from "../../src/components/dashboard/OrdersDashboard/PageHeader";
import PageTitleWrapper  from "../../src/components/dashboard/OrdersDashboard/PageTitleWrapper";
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
const ChartWrapper = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
};
function OrdersDashPage() {
    return (
        <>
            <FullLayout>



            <PageTitleWrapper>
                <PageHeader />
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

                        <RecentOrders />
                    </Grid>
                </Grid>



                <ChartsOrder />
<ChartRevByMonth/>


            </Container>

            </FullLayout>
        </>
    );
}



export default OrdersDashPage;
