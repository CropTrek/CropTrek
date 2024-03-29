import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, styled } from '@mui/material';
import OrderStatus from "../../../../pages/chartsOrders/OrdersStatus";
const PageTitle = styled(Box)(
    ({ theme }) => `
        padding: ${theme.spacing(4)};
`
);

interface PageTitleWrapperProps {
    children?: ReactNode;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
    return (
        <PageTitle className="MuiPageTitle-wrapper">
            <Container maxWidth="lg">

                <OrderStatus/>
                <br/>
                <br/>
                <br/>
                {children}</Container>
        </PageTitle>
    );
};

PageTitleWrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
