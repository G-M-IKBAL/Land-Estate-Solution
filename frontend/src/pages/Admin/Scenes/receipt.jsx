import React, { useState, useEffect, Fragment, useRef } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Modal from '@mui/material/Modal';
import { Button, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import SendIcon from '@mui/icons-material/Send';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Header from "../components/Header";

import { DataGrid } from "@mui/x-data-grid";

import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";


import { tokens } from "../Themes";
import { textAlign } from "@mui/system";
import { getMonth } from "date-fns";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        variant: "h3",
        fontSize: 16,
        fontWeight: "bold"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        fontWeight: "bold"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





const Receipt = () => {
    const navigate = useNavigate();
    const userID = sessionStorage.getItem("userID")
    if (userID === '' || userID === null) {
        navigate('/login')
    }
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [rDate, setRDate] = useState()
    const [receiptsData, setReceiptsData] = useState([])
    const [loading, setLoading] = useState('True')
    const [projects, setProjects] = useState([])
    const [projects1, setProjects1] = useState([])

    const [receiptId, setReceiptId] = useState('')
    const [receiptSelected, setReceiptSelected] = useState([])


    // var projects = [
    //     // {
    //     //     "project": "Ghosia",
    //     //     "name": [
    //     //         "Ahsan",
    //     //         "Ahsan"
    //     //     ],
    //     //     "amount": [
    //     //         "200",
    //     //         "3652"
    //     //     ]
    //     // }
    // ]
    // var projects1 = []


    // Converting amount in numbers to words
    var th = ['', 'thousand', 'million', 'billion', 'trillion'];
    var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    function toWords(s) {
        s = s.toString();
        s = s.replace(/[\, ]/g, '');
        if (s != parseFloat(s)) return 'not a number';
        var x = s.indexOf('.');
        if (x == -1)
            x = s.length;
        if (x > 15)
            return 'too big';
        var n = s.split('');
        var str = '';
        var sk = 0;
        for (var i = 0; i < x; i++) {
            if ((x - i) % 3 == 2) {
                if (n[i] == '1') {
                    str += tn[Number(n[i + 1])] + ' ';
                    i++;
                    sk = 1;
                } else if (n[i] != 0) {
                    str += tw[n[i] - 2] + ' ';
                    sk = 1;
                }
            } else if (n[i] != 0) { // 0235
                str += dg[n[i]] + ' ';
                if ((x - i) % 3 == 0) str += 'hundred ';
                sk = 1;
            }
            if ((x - i) % 3 == 1) {
                if (sk)
                    str += th[(x - i - 1) / 3] + ' ';
                sk = 0;
            }
        }

        if (x != s.length) {
            var y = s.length;
            str += 'point ';
            for (var i = x + 1; i < y; i++)
                str += dg[n[i]] + ' ';
        }
        return str.replace(/\s+/g, ' ');
    }

    function convertToISO(date) {
        var getDate = new Date(date.toISOString().split('T')[0])
        getDate.setDate(getDate.getDate())   //changing here remove +1
        var isoDate = getDate.toISOString()
        return isoDate
    }


    // For Modal to display - Adding response to notification
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // For Initial Model
    const [open1, setOpen1] = React.useState(true);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const handleViewReport = (id) => {
        console.log('printing id');
        console.log(id);
        for (let i = 0; i < receiptsData.length; i++) {
            if (receiptsData[i]._id === id) {
                receiptSelected.push(receiptsData[i].to.name)
                receiptSelected.push(receiptsData[i].project.name)
                receiptSelected.push(receiptsData[i].date)
                receiptSelected.push(receiptsData[i].amount)
                receiptSelected.push(receiptsData[i].from.name)
            }

        }
        // setJsonReceiptSelected(receiptSelected)
        console.log(receiptSelected);
        handleOpen()
    }

    const handleDateSubmit = async () => {

        var isoDate = convertToISO(rDate)
        console.log(isoDate);
        projects.length = 0
        projects1.length = 0
        setLoading('True')
        const res = await fetch('http://localhost:8080/admin/getReceipts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // "date": "2022-12-11T19:00:00.000+00:00"
                "date": isoDate
            })
        });
        const dataF = await res;
        // var resD = [];
        // for (var i in dataF)
        //     resD.push(i)

        dataF.json().then((result) => {
            console.log(result)
            setReceiptsData(result)

            // Getting Projects Count
            for (let i = 0; i < result.length; i++) {
                if (projects1.indexOf(result[i].project.name) === -1) {

                    projects.push({ "project": result[i].project.name, "name": [result[i].from.name], "amount": [result[i].amount], "id": [result[i]._id] })
                    // projects.push([result[i].project.name, 1])
                    projects1.push(result[i].project.name)
                }
                else {
                    projects[projects1.indexOf(result[i].project.name)].name.push(result[i].from.name)
                    projects[projects1.indexOf(result[i].project.name)].amount.push(result[i].amount)
                    projects[projects1.indexOf(result[i].project.name)].id.push(result[i]._id)
                }
            }

            console.log(projects);
            setLoading('False')

        })
            .catch((err) => {
                console.log(err)
            })
    }

    if (loading === 'True') {


        return (




            <Modal
                open={open1}
                onClose={handleClose1}
            >


                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"



                >

                    <Box

                        // gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        // alignItems="center"
                        justifyContent="center"


                        position='absolute'
                        top='25%'
                        left='45%'
                        // transform='translate(-50%, -50%)'


                        sx={{

                            width: 400,
                            height: 300,
                            borderRadius: '16px',
                            boxShadow: 20

                        }}
                    >

                        <Typography
                            variant="h4"
                            color={colors.greenAccent[500]}
                            fontWeight="bold"
                            sx={{ mt: "20px", ml: "50px", justifyContent: "center", alignItems: "center" }}
                        >

                            Choose Date

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={rDate}
                                    onChange={(newValue) => {
                                        setRDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params}
                                        label="Date"

                                        sx={{ gridColumn: "span 3", width: "8cm", mt: "15%", ml: "9%" }}

                                        variant="filled"
                                        value={rDate}
                                        name="date"
                                    />
                                    }
                                />
                            </LocalizationProvider>
                        </Typography>





                        <Box display="flex" mt="30px" alignItems="center" >
                            <Button type="submit" color="secondary" variant="contained" sx={{ width: "3cm", mt: "65%", ml: "-150%" }}
                                onClick={handleDateSubmit} >


                                <SendIcon sx={{ color: colors.primary[500], fontSize: "26px" }} />

                            </Button>

                        </Box>

                        {/* <Button onClick={handleDateSubmit} color="secondary">Send</Button>  */}

                    </Box>



                </Box>
                {/* </Box> */}





                {/* </Box> */}






            </Modal>



            // <Box mb="20px" sx={{ pt: 4 }}>
            //     <Box display="flex" justifyContent="center">



            //         <LocalizationProvider dateAdapter={AdapterDateFns}>
            //             <DatePicker
            //                 value={rDate}
            //                 onChange={(newValue) => {
            //                     setRDate(newValue);
            //                     handleDateSubmit()
            //                 }}
            //                 renderInput={(params) => <TextField {...params}
            //                     label="Date"
            //                     sx={{ gridColumn: "span 4" }}
            //                     variant="filled"
            //                     value={rDate}
            //                     name="date"
            //                 />
            //                 }
            //             />
            //         </LocalizationProvider>

            //     </Box>

            //     <h3>Loading ...</h3>
            // </Box>
        )
    }

    return (
        <Box mb="20px" sx={{ pt: 4 }}>
            <Header title="Receipts" subtitle="Receipts of Sales" />
            <Box display="flex" justifyContent="center">





                <Modal
                    open={open}
                    onClose={handleClose}>


                    <div ref={componentRef}>

                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            width: '50%',
                            height: '50%',
                        }}
                        >
                            {/* <Button onClick={handlePrint} color="secondary" className="exclude">Print</Button> */}

                            <LocalPrintshopIcon onClick={handlePrint} sx={{ color: colors.greenAccent[500], fontSize: "26px" }} />


                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                <h3>Rent Receipt</h3>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                <table border={3} cellPadding={10}>
                                    <tr>
                                        <td>Receipt no</td>
                                        <td>11445</td>
                                    </tr>
                                </table>
                                <table border={3} cellPadding={10}>
                                    <tr>
                                        <td>Date</td>
                                        <td>{receiptSelected[2]}</td>
                                    </tr>
                                </table>
                            </Box>

                            <Box>
                                <hr />
                                <p style={{ borderBottom: '1px solid', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
                                    Received the below mentioned amount with thanks from, <p style={{ display: 'inline-block', margin: '4px' }}><i><b>{receiptSelected[0]}</b></i></p> sum of
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                    <span style={{ border: '1px solid', padding: '10px' }}>Rs. {receiptSelected[3]} </span>
                                </div>
                                <p style={{ borderBottom: '1px solid', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', textAlign: 'center' }}>
                                    Rupees {toWords(parseInt(receiptSelected[3]))} Only
                                </p>
                                <p style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', textAlign: 'center' }}>
                                    against the payment of rent for the rental property located at <i><b><u>{receiptSelected[1]}</u></b></i> with the property number as <i><b><u>P-112</u></b></i>
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                    <span style={{ padding: '10px' }}>Director: <u>Ali Haider</u></span>
                                </div>
                            </Box>

                        </Box>

                    </div>

                </Modal>

                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={rDate}
                        onChange={(newValue) => {
                            setRDate(newValue);
                            handleDateSubmit()
                        }}
                        renderInput={(params) => <TextField {...params}
                            label="Date"
                            sx={{ gridColumn: "span 4" }}
                            variant="filled"
                            value={rDate}
                            name="date"
                        />
                        }
                    />
                </LocalizationProvider> */}


            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"


            >

                <Box
                    gridColumn="span 8"
                    gridRow="span 4"
                    backgroundColor={colors.primary[400]}
                    sx={{ borderRadius: '16px', boxShadow: 20, ml: "10%", mt: "5%", width: "25cm" }}
                >
                    <Box
                        mt="50px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"



                    >





                        <Box>
                        </Box>
                    </Box>

                    <Box height="400px" m="-20px 0 0 0" sx={{ marginBottom: 5 }}>
                        <Box>
                            <Table>
                                <TableHead>
                                    <StyledTableRow >
                                        <TableCell sx={{ variant: "h1" }} variant="h1" >Project</TableCell>
                                        <TableCell sx={{ variant: "h1" }} variant="h1">Name</TableCell>
                                        <TableCell sx={{ variant: "h1" }} variant="h1">Amount</TableCell>



                                        <TableCell> View</TableCell>
                                    </StyledTableRow>
                                </TableHead>

                                <TableBody>
                                    {projects.map(item => (

                                        <Fragment>
                                            <StyledTableRow>
                                                <StyledTableCell rowSpan={item.name.length + 1}>
                                                    {item.project}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            {item.name.map((detail, index) => (
                                                <StyledTableRow>
                                                    <StyledTableCell>{detail}</StyledTableCell>
                                                    <StyledTableCell>{item.amount[index]}</StyledTableCell>
                                                    {/* <TableCell>{item.id[index]}</TableCell> */}

                                                    <StyledTableCell>


                                                        <VisibilityIcon onClick={evnt => { handleViewReport(item.id[index]) }} sx={{ color: colors.greenAccent[500], fontSize: "26px" }} />


                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}

                                        </Fragment>
                                    ))}
                                </TableBody>


                            </Table>



                        </Box>
                    </Box>

                </Box>


            </Box>


        </Box>
    );

};

export default Receipt;