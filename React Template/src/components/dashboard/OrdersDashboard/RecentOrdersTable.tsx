import React, {FC, ChangeEvent, useState, useEffect} from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes, {string} from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,
    Card,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    MenuItem,
    Typography,
    useTheme,
    CardHeader
} from '@mui/material';

import Label from "./Label";
import { CryptoOrder, CryptoOrderStatus} from "./crypto_order";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from "./BulkActions";
import "core-js/features/array/includes";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import jsPDF from 'jspdf';
import {Image} from "react-feather";

interface RecentOrdersTableProps {
    className?: string;
    cryptoOrders: CryptoOrder[];
    deleteB
}

interface Filters {
    status?: CryptoOrderStatus;
}

function getStatusLabel(cryptoOrderStatus: CryptoOrderStatus) {
    const map: any = {
        completed: { text: 'Completed', color: 'green' },
        pending: { text: 'Pending', color: 'orange' },
        failed: { text: 'Failed', color: 'red' },
    };

    const status = map[cryptoOrderStatus];
    if (!status) {
        return null;
    }

    const { text, color } = status;
    return (
        <span style={{ color }}>
      {text}
    </span>
    );
}


const applyFilters = (
        cryptoOrders: CryptoOrder[],
    filters: Filters
): CryptoOrder[] => {
    return cryptoOrders.filter((cryptoOrder) => {

        let matches = true;

        if (filters.status==="not paid" &&  cryptoOrder.isPaid === true) {
            matches = false;
        }
       else if (filters.status==="isPaid" &&  cryptoOrder.isPaid !== true) {
            matches = false;
        }

        return matches;
    });
};

const applyPagination = (
        cryptoOrders: CryptoOrder[],
    page: number,
    limit: number
): CryptoOrder[] => {
    return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders,deleteB } ) => {
    const [del, setDel] = useState(false);
    const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
        []
    );






    const selectedBulkActions = selectedCryptoOrders.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [filters, setFilters] = useState<Filters>({
        status: null
    });

    const statusOptions = [
        {
            id: 'all',
            name: 'All'
        },
        {
            id: 'isPaid',
            name: 'isPaid'
        },
        {
            id: 'not paid',
            name: 'not paid'
        }
    ];

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
        let value = null;

        if (e.target.value !== 'all') {
            value = e.target.value;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            status: value
        }));
    };

    const handleSelectAllCryptoOrders = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedCryptoOrders(
            event.target.checked
                ? cryptoOrders.map((cryptoOrder) => cryptoOrder._id)
                : []
        );
    };

    const handleSelectOneCryptoOrder = (
            _event: ChangeEvent<HTMLInputElement>,
        cryptoOrderId: string
): void => {
        if (!selectedCryptoOrders.includes(cryptoOrderId)) {
            setSelectedCryptoOrders((prevSelected) => [
                ...prevSelected,
                cryptoOrderId
            ]);
        } else {
            setSelectedCryptoOrders((prevSelected) =>
                prevSelected.filter((id) => id !== cryptoOrderId)
            );
        }
    };

    const handlePageChange = (_event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
    const paginatedCryptoOrders = applyPagination(
        filteredCryptoOrders,
        page,
        limit
    );
    const selectedSomeCryptoOrders =
        selectedCryptoOrders.length > 0 &&
        selectedCryptoOrders.length < cryptoOrders.length;
    const selectedAllCryptoOrders =
        selectedCryptoOrders.length === cryptoOrders.length;
    const theme = useTheme();
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };





    function generatePDF(cryptoOrder) {
        const doc = new jsPDF();
        const imgData = "../assets/images/logo/logo-1.png";
        doc.addImage(imgData, 'JPEG', 15, 15, 30, 30);        // Ajouter le logo en haut du PDF

        // doc.addImage(myImage, "jpg", 15, 15, 30, 30);

        // Ajouter le titre du document
        doc.setFontSize(20);
        doc.text("Commande N° " + cryptoOrder._id, 50, 30);

        // Ajouter les détails de la commande
        doc.setFontSize(12);
        doc.text("Nom d'utilisateur : " + cryptoOrder.user.name +" "+cryptoOrder.user.surname, 20, 50);
        doc.text("email : " + cryptoOrder.user.email , 20, 60);

        doc.text("ID de la commande : " + cryptoOrder._id, 20, 70);
        doc.text("Méthode de paiement : " + cryptoOrder.payementMethod, 20, 80);
        if(cryptoOrder.isPaid){
            doc.text("Payé : oui " +cryptoOrder.paidAt.toLocaleString("fr-FR",options) , 20, 90);
        }
        else{
            doc.text("Payé : non " , 20, 90);
        }

        doc.text("Montant : " + cryptoOrder.totalPrice + " DT " , 20, 100);
        doc.text("Taxes : " + cryptoOrder.taxPrice + " DT", 20, 110);
        doc.text("Frais d'expédition : " + cryptoOrder.shippingPrice + " DT", 20, 120);
      // Ajouter un espace de signature
        doc.line(20, 150, 100, 150); // ligne pour la signature
        doc.text("Signature", 20, 160); // texte pour la signature

        // Sauvegarder le PDF
        doc.save("commande_" + cryptoOrder._id + ".pdf");
    }


    return (
        <Card>
            {/*<h1>test</h1>*/}

            {/*<img src="../assets/images/logo/logo-1.png" alt="" />*/}

            <ToastContainer />
            {selectedBulkActions && (
                <Box flex={1} p={2}>
                    <BulkActions />
                </Box>
            )}
            {!selectedBulkActions && (
                <CardHeader
                    action={
                        <Box width={150}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.status || 'all'}
                                    onChange={handleStatusChange}
                                    label="Status"
                                    autoWidth
                                >
                                    {statusOptions.map((statusOption) => (
                                        <MenuItem key={statusOption.id} value={statusOption.id}>
                                            {statusOption.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    }
                    title="Recent Orders"
                />
            )}
            <Divider />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={selectedAllCryptoOrders}
                                    indeterminate={selectedSomeCryptoOrders}
                                    onChange={handleSelectAllCryptoOrders}
                                />
                            </TableCell>
                            <TableCell>Order Details</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCryptoOrders.map((cryptoOrder) => {
                            const isCryptoOrderSelected = selectedCryptoOrders.includes(
                                cryptoOrder._id
                            );
                            return (
                                <TableRow
                                    hover
                                    key={cryptoOrder._id}
                                    selected={isCryptoOrderSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isCryptoOrderSelected}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleSelectOneCryptoOrder(event, cryptoOrder._id)
                                            }
                                            value={isCryptoOrderSelected}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {cryptoOrder.orderDetails}

                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>


                                            <span style={{ color:"darkblue" , fontSize:"12px", fontWeight:"bold" }}>  user:  {cryptoOrder.user.name} {cryptoOrder.user.surname}
                                            <br/>

 email: <span>{cryptoOrder.user.email}</span> <br/>
<span>{new Date(cryptoOrder.createdAt).toLocaleString('fr-FR', options)}</span>


                                            </span>



                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                          <span>  {cryptoOrder._id}</span>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            <span>        {cryptoOrder.payementMethod}</span>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {cryptoOrder.sourceDesc}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {cryptoOrder.totalPrice}
                                            {cryptoOrder.cryptoCurrency}






                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {numeral(cryptoOrder.totalPrice).format(
                                                `${cryptoOrder.totalPrice}0,0.00`
                                            )}
                                                <p style={{color:"text.secondary", fontSize:"10px"}}  > Tax: {cryptoOrder.taxPrice}<br/>
                                          Shipping:    {cryptoOrder.shippingPrice}</p>
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        {cryptoOrder.isPaid  ? (
                                            <span style={{ color:"green" }}>
     isPaid <br/>
                                                <span style={{ color:"ActiveBorder" }}>{new Date(cryptoOrder.paidAt).toLocaleString('fr-FR', options)}</span>
    </span>
                                        ):(
                                            <span style={{ color:"red" }}>

                                     not paid
    </span>
                                       ) }
                                    </TableCell>
                                    <TableCell align="right">
                                        {/*<Tooltip title="Edit Order" arrow>*/}
                                        {/*    <IconButton*/}
                                        {/*        sx={{*/}
                                        {/*            '&:hover': {*/}
                                        {/*                background: theme.palette.primary.light*/}
                                        {/*            },*/}
                                        {/*            color: theme.palette.primary.main*/}
                                        {/*        }}*/}
                                        {/*        color="inherit"*/}
                                        {/*        size="small"*/}
                                        {/*    >*/}
                                        {/*        <EditTwoToneIcon fontSize="small" />*/}


                                        {/*    </IconButton>*/}
                                        {/*</Tooltip>*/}
                                        <Tooltip title="Delete Order" arrow>
                                            <IconButton
                                                onClick={() => deleteB(cryptoOrder._id)}
                                                sx={{
                                                    '&:hover': { background: theme.palette.error.light },
                                                    color: theme.palette.error.main
                                                }}
                                                color="inherit"
                                                size="small"
                                            >
                                                <DeleteTwoToneIcon fontSize="small" />
                                            </IconButton>

                                        </Tooltip>



                                        <Tooltip title="PDF Order" arrow>
                                            <IconButton
                                                onClick={() => generatePDF(cryptoOrder)} // replace generatePDF with your function that generates PDF for each order
                                                aria-label="generate PDF"
                                                color="primary"
                                            >
                                                <PictureAsPdfIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box p={2}>
                <TablePagination
                    component="div"
                    count={filteredCryptoOrders.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                />
            </Box>
        </Card>
    );
};

RecentOrdersTable.propTypes = {
    cryptoOrders: PropTypes.array.isRequired,
    deleteB:PropTypes.func.isRequired,
};

RecentOrdersTable.defaultProps = {
    cryptoOrders: [],
    deleteB:function (){}

};

export default RecentOrdersTable;
