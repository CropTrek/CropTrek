import React, {FC, ChangeEvent, useState, useEffect} from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes, {string} from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ProductFormUpdate from './ProductFormUpdate'
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
import {CryptoProduct, CryptoProductStatus} from "./crypto_product";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from "./BulkActions";
import "core-js/features/array/includes";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import jsPDF from 'jspdf';
import {Image} from "react-feather";
import {Button} from "reactstrap";

interface RecentProductsTableProps {
    className?: string;
    cryptoProducts: CryptoProduct[];
    deleteB;
    handleEditClick;
}

interface Filters {
    status?: CryptoProductStatus;
}

function getStatusLabel(cryptoProductStatus: CryptoProductStatus) {
    const map: any = {
        completed: { text: 'Completed', color: 'green' },
        pending: { text: 'Pending', color: 'orange' },
        failed: { text: 'Failed', color: 'red' },
    };

    const status = map[cryptoProductStatus];
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
    cryptoProducts: CryptoProduct[],
    filters: Filters
): CryptoProduct[] => {
    return cryptoProducts.filter((cryptoProduct) => {
        let matches = true;

        if (filters.status === "InStock" && cryptoProduct.countInStock !==0 ) {
            matches = false;
        }
         else if (filters.status === "notInStock"&& cryptoProduct.countInStock !==0 ) {
            matches = false;
        }

        return matches;
    });
};

const applyPagination = (
        cryptoProducts: CryptoProduct[],
    page: number,
    limit: number
): CryptoProduct[] => {
    return cryptoProducts.slice(page * limit, page * limit + limit);
};

const RecentProductsTable: FC<RecentProductsTableProps> = ({ cryptoProducts,deleteB ,handleEditClick} ) => {





    const [del, setDel] = useState(false);
    const [selectedCryptoProducts, setSelectedCryptoProducts] = useState<string[]>(
        []
    );






    const selectedBulkActions = selectedCryptoProducts.length > 0;
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
            id: 'inStock',
            name: 'inStock'
        },
        {
            id: 'notInStock',
            name: 'notInStock'
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

    const handleSelectAllCryptoProducts = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedCryptoProducts(
            event.target.checked
                ? cryptoProducts.map((cryptoOrder) => cryptoOrder._id)
                : []
        );
    };

    const handleSelectOneCryptoProduct = (
            _event: ChangeEvent<HTMLInputElement>,
        cryptoProductId: string
): void => {
        if (!selectedCryptoProducts.includes(cryptoProductId)) {
            setSelectedCryptoProducts((prevSelected) => [
                ...prevSelected,
                cryptoProductId
            ]);
        } else {
            setSelectedCryptoProducts((prevSelected) =>
                prevSelected.filter((id) => id !== cryptoProductId)
            );
        }
    };

    const handlePageChange = (_event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const filteredCryptoProducts = applyFilters(cryptoProducts, filters);
    const paginatedCryptoOrders = applyPagination(
        filteredCryptoProducts,
        page,
        limit
    );
    const selectedSomeCryptoProducts =
        selectedCryptoProducts.length > 0 &&
        selectedCryptoProducts.length < cryptoProducts.length;
    const selectedAllCryptoProducts =
        selectedCryptoProducts.length === cryptoProducts.length;
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
        doc.text("Produit N° " + cryptoOrder._id, 50, 30);

        // Ajouter les détails de la commande
        doc.setFontSize(12);
        doc.text("Nom d'utilisateur : " + cryptoOrder.user.name +" "+cryptoOrder.user.surname, 20, 50);
        doc.text("email : " + cryptoOrder.user.email , 20, 60);

        doc.text("ID du produit : " + cryptoOrder._id, 20, 70);
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
                    title=" Products Management"
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
                                    checked={selectedAllCryptoProducts}
                                    indeterminate={selectedSomeCryptoProducts}
                                    onChange={handleSelectAllCryptoProducts}
                                />
                            </TableCell>
                            <TableCell>Product Details</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>User</TableCell>

                            <TableCell align="right">Price</TableCell>

                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCryptoOrders.map((cryptoProduct) => {
                            const isCryptoProductSelected = selectedCryptoProducts.includes(
                                cryptoProduct._id
                            );
                            return (
                                <TableRow
                                    hover
                                    key={cryptoProduct._id}
                                    selected={isCryptoProductSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isCryptoProductSelected}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleSelectOneCryptoProduct(event, cryptoProduct._id)
                                            }
                                            value={isCryptoProductSelected}
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
                                            {cryptoProduct.name} <br/>
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {cryptoProduct.description}
                                            </Typography>

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
                                          <span>  {cryptoProduct._id}</span>
                                        </Typography>
                                    </TableCell>



                                    <TableCell align="right">
                                        {cryptoProduct.countInStock  ? (
                                            <span style={{ color:"green" }}>
     inStock<br/>
                                                <span style={{ color:"ActiveBorder" }}>{cryptoProduct.countInStock}</span>
    </span>
                                        ):(
                                            <span style={{ color:"red" }}>

                                     notInStock<br/>
                                                                                                <span style={{ color:"ActiveBorder" }}>{cryptoProduct.countInStock}</span>

    </span>
                                        ) }
                                    </TableCell>



                                        <TableCell>
                                        <Typography variant="body2" color="text.secondary" noWrap>


                                            <span style={{ color:"darkblue" , fontSize:"12px", fontWeight:"bold" }}>  user:  {cryptoProduct.user.name} {cryptoProduct.user.surname}
                                                <br/>

 email: <span>{cryptoProduct.user.email}</span> <br/>
                                                 adress: <span>{cryptoProduct.user.adresse}</span> <br/>

                                                {/*<span>{new Date(cryptoProduct.createdAt).toLocaleString('fr-FR', options)}</span>*/}


                                            </span>



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
                                            {cryptoProduct.price} DT







                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {numeral(cryptoProduct.price).format(
                                                `${cryptoProduct.price}0,0.00`
                                            )}

                                        </Typography>
                                    </TableCell>
    {/*                                <TableCell align="right">*/}
    {/*                                    {cryptoOrder.isPaid  ? (*/}
    {/*                                        <span style={{ color:"green" }}>*/}
    {/* isPaid <br/>*/}
    {/*                                            <span style={{ color:"ActiveBorder" }}>{new Date(cryptoOrder.paidAt).toLocaleString('fr-FR', options)}</span>*/}
    {/*</span>*/}
    {/*                                    ):(*/}
    {/*                                        <span style={{ color:"red" }}>*/}

    {/*                                 not paid*/}
    {/*</span>*/}
    {/*                                   ) }*/}
    {/*                                </TableCell>*/}
                                    <TableCell align="right">
                                        <Tooltip title="Edit Order" arrow>
                                            <IconButton
                                                onClick={() => handleEditClick(cryptoProduct)}
                                                sx={{
                                                    '&:hover': {
                                                        background: theme.palette.primary.light
                                                    },
                                                    color: theme.palette.primary.main
                                                }}
                                                color="inherit"
                                                size="small"
                                            >
                                                <EditTwoToneIcon fontSize="small" />


                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Order" arrow>
                                            <IconButton
                                                onClick={() => deleteB(cryptoProduct._id)}
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
                                                onClick={() => generatePDF(cryptoProduct)} // replace generatePDF with your function that generates PDF for each order
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
                    count={filteredCryptoProducts.length}
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

RecentProductsTable.propTypes = {
    cryptoProducts: PropTypes.array.isRequired,
    deleteB:PropTypes.func.isRequired,
    handleEditClick:PropTypes.func.isRequired
};

RecentProductsTable.defaultProps = {
    cryptoProducts: [],
    deleteB:function (){},
    handleEditClick:function(){}

};

export default RecentProductsTable;
