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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Modal from '@mui/material/Modal';
import { Button, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';


const MonthlyReport = () => {

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
    const [projectData, setProjectData] = useState([])
    var dataArray = []

    const [dailyDate, setDailyDate] = useState()
    const [town, setTown] = useState('')

    // For Modal to display - Adding response to notification
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function convertToISO(date)
    {
        var getDate = new Date(date.toISOString().split('T')[0])
        getDate.setDate(getDate.getDate() + 1)
        var isoDate = getDate.toISOString()
        return isoDate
    }

    useEffect(() => {
        const dataFetch = async () => {
            const res = await fetch('http://localhost:8080/admin/getProjects', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                })
            });
            const dataF = await res;
            dataF.json().then((result) => {
                // console.log(result)
                setProjectData(result)
                // console.log(projectData);
            })
                .catch((err) => {
                    console.log(err)
                })

        };

        dataFetch();

    }, []);

    const handleGetMonthlyReport = async () => {
        // var isoDate = convertToISO(dailyDate)
        console.log(dailyDate.getMonth());
        console.log(dailyDate.getFullYear());
        console.log(town);
        const res = await fetch('http://localhost:8080/admin/getMonthlyReport', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "month": dailyDate.getMonth()+1,
                "year": dailyDate.getFullYear(),
                "projectId": town
                // "month": 12,
                // "year": 2022,
                // "projectId": "63a904ea7e13603b22de0129"
            })
        });
        const dataF = await res;
        dataF.json().then((result) => {
            // console.log(result);
            for (let i = 0; i < result.length; i += 1) {
                let dataJson = {}
                dataJson.id = i + 1
                dataJson.name = result[i].c_id.name
                dataJson.plotNo = result[i].propertyId.plotNumber
                dataJson.amountReceived = result[i].amount
                dataJson.date = result[i].date
                dataJson.contact = result[i].c_id.contact
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

    // useEffect(() => {
    //     const dataFetch = async () => {
    //         const res = await fetch('http://localhost:8080/admin/getMonthlyReport', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 "month": 12,
    //                 "year": 2022,
    //                 "projectId": "63a904ea7e13603b22de0129"
    //             })
    //         });
    //         const dataF = await res;
    //         dataF.json().then((result) => {
    //             // console.log(result);
    //             for (let i = 0; i < result.length; i += 1) {
    //                 let dataJson = {}
    //                 dataJson.id = i + 1
    //                 dataJson.name = result[i].c_id.name
    //                 dataJson.plotNo = result[i].propertyId.plotNumber
    //                 dataJson.amountReceived = result[i].amount
    //                 dataJson.date = result[i].date
    //                 dataJson.contact = result[i].c_id.contact
    //                 // dataArray = Object.assign({selected: false}, dataJson)
    //                 dataArray.push(dataJson)
    //             }
    //             // console.log(dataArray);
    //             // dataArray.json().then((r) => {
    //             setReportData(dataArray)
    //             console.log(reportData);
    //             setFlag(1)
    //             // })
    //         })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //         // setData(dataF)
    //     };

    //     dataFetch();

    // }, []);

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
            field: "date",
            headerName: "Date",
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
                            inputFormat="yyyy-MM"
                            views={['year', 'month']}
                            value={dailyDate}
                            onChange={(newValue) => {
                                setDailyDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params}
                                label="Date"
                                sx={{ gridColumn: "span 4" }}
                                variant="filled"
                                value={dailyDate}
                                name="date"
                            />
                            }
                        />
                    </LocalizationProvider>
                    <InputLabel id="town-label">Town</InputLabel>
                    <Select
                        labelId="town-label"
                        id="town-select"
                        value={town}
                        label="Town"
                        onChange={(event) => { setTown(event.target.value) }}
                    >
                        {projectData.map(item => (
                            <MenuItem value={item._id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                    <Button onClick={handleGetMonthlyReport} color="secondary">Send</Button>

                </Box>
            </Modal>
        )

    return (
        <Box mb="20px" sx={{ pt: 2 }}>

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Monthly Report" subtitle="Monthly Report" />
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

export default MonthlyReport