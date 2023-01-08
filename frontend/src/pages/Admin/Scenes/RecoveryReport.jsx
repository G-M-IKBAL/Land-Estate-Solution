import React, { useState, useEffect } from "react"

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../Themes";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../components/Header";
import { GridToolbar } from "@mui/x-data-grid";
import Modal from '@mui/material/Modal';
import { Button, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';


const RecoveryReport = () => {

    const navigate = useNavigate();
    const userID = sessionStorage.getItem("userID")
    if (userID === '' || userID === null)
    {
      navigate('/login')
    }

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [reportData, setReportData] = useState([])
    const [flag, setFlag] = useState(0)
    var dataArray = []

    const [recoveryDate, setRecoveryDate] = useState()

    // For Modal to display - Adding response to notification
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function convertToISO(date)
    {
        var getDate = new Date(date.toISOString().split('T')[0])
        getDate.setDate(getDate.getDate())
        var isoDate = getDate.toISOString()
        return isoDate
    }

    useEffect(() => {
        // const dataFetch = async () => {
        //     
        // };
        
        // dataFetch();

    }, []);

    const handleGetRecoveryReport = async() => {
        setReportData([])
        var isoDate = convertToISO(recoveryDate)
        console.log(isoDate);
        const res = await fetch('http://localhost:8080/admin/getRecoveryReport', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "date": isoDate
                })
            });
            const dataF = await res;
            dataF.json().then((result) => {
                // console.log(result);
                for (let i = 0; i < result.length; i += 1) {
                    let dataJson = {}
                    dataJson.id = i + 1
                    dataJson.name = result[i].clientInfo.name
                    dataJson.plotNo = result[i].propInfo.plotNumber
                    dataJson.amountReceived = result[i].receivedAmount
                    dataJson.amountLeft = result[i].leftAmount
                    dataJson.amountShort = result[i].shortAmount
                    dataJson.contact = result[i].clientInfo.contact
                    // dataArray = Object.assign({selected: false}, dataJson)
                    dataArray.push(dataJson)
                }
                // console.log(dataArray);
                // dataArray.json().then((r) => {
                setReportData(dataArray)
                console.log(reportData);
                setFlag(1)
                // })
            })
                .catch((err) => {
                    console.log(err)
                })
            // setData(dataF)
    }

    const columns = [
        { field: "id", headerName: "ID", type: "number" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "plotNo",
            headerName: "Plot No",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "amountReceived",
            type: "number",
            headerName: "Amount Received",
            flex: 1,
        },
        {
            field: "amountLeft",
            type: "number",
            headerName: "Amount Left",
            flex: 1,
        },
        {
            field: "amountShort",
            type: "number",
            headerName: "Amount Short",
            flex: 1,
        },
        {
            field: "contact",
            headerName: "Contact",
            flex: 1,
        }
    ];

    if (flag === 0)
        return (
            <Modal
                open={open}
                onClose={handleClose}
            >
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
                }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={recoveryDate}
                            onChange={(newValue) => {
                                setRecoveryDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params}
                                label="Date"
                                sx={{ gridColumn: "span 8" }}
                                variant="filled"
                                value={recoveryDate}
                                name="date"
                            />
                            }
                        />
                    </LocalizationProvider>
                    <Button onClick={handleGetRecoveryReport} color="secondary">Send</Button>

                </Box>
            </Modal>
        )

    return (
        <Box mb="20px" sx={{ pt: 2 }}>

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Recovery Report" subtitle="Recovery Report" />
            </Box>

            <Box
                m="40px 0 0 0"
                height="75vh"

                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid display="flex" justifyContent="space-between" alignItems="center" rows={reportData} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );



}

export default RecoveryReport