import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../Themes";
import { mockBarData, mockTransactions, mocProjects } from "../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../components/Header";
import LineChart from "../components/LineChart";
import Piechart from "../components/Piechart"
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
import Card from "../components/Cards";
import ProgressCircle from "../components/Progress";
import BarChart from "../components/BarChart";
import React, { useState, useEffect } from 'react'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import mocNoti from '../data/mockData'

import { mockPieData as data } from "../data/mockData";
import { mockBarData as dataBarChart } from "../data/mockData";
import { mockLineData as dataLineChart } from "../data/mockData";
import { colors as colors } from "../data/mockData";
import { useNavigate } from 'react-router-dom';
import AddCardIcon from '@mui/icons-material/AddCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import MovingIcon from '@mui/icons-material/Moving';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';


const Dashboard = () => {
  
  const navigate = useNavigate();
  const userID = sessionStorage.getItem("userID")
  if (userID === '' || userID === null)
  {
    navigate('/login')
  }


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [incomeArray, setIncomeArray] = useState([])
  const [expenseArray, setExpenseArray] = useState([])
  const [investment, setInvestment] = useState(20000)

  const [projectData, setProjectData] = useState([])
  const [projectInvestment, setProjectInvestment] = useState(10000)

  const [pieData, setPieData] = useState([])
  const [revenueGenerated, setRevenueGenerated] = useState(0)
  const [yearRevenue, setYearRevenue] = useState(0)


  const [barData, setBarData] = useState([])

  const [lineData, setLineData] = useState([])
  
  const [isDataLoaded, setIsDataLoaded] = useState(false)


  useEffect(() => {
    const dataFetch = async () => {
      const resIncome = await fetch('http://localhost:8080/admin/getIncomeStats', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      });
      const incomeData = await resIncome.json();
      const resExpense = await fetch('http://localhost:8080/admin/getExpenseStats', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      });
      const expenseData = await resExpense.json();
      const resProj = await fetch('http://localhost:8080/admin/getProjectsStats', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      });
      const projData = await resProj.json();
      const resBar = await fetch('http://localhost:8080/admin/getProjectsStatsMonthly', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      });
      const projectBarData = await resBar.json();
      const resLine = await fetch('http://localhost:8080/admin/getProjectWiseStatsMonthly', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      });
      const projectLineData = await resLine.json();

      setIncomeArray(incomeData)
      setExpenseArray(expenseData)
      setProjectData(projData)
      setLineData(projectLineData)

      setIsDataLoaded(true)

      console.log('Printing Income');
      console.log(incomeData);
      console.log('Printing Expense');
      console.log(expenseData);
      console.log('Printing Project Data');
      console.log(projData);
      console.log('Printing Bar Data');
      console.log(projectBarData);

      var tempPieData = []
      var totalIncome = 0
      for (let i = 0; i < projData.length; i++)
      {
        let newJson = {}
        newJson.id = projData[i].name
        newJson.label = projData[i].name
        newJson.value = projData[i].income
        tempPieData.push(newJson)
        totalIncome += projData[i].income
      }
      
      setRevenueGenerated(totalIncome)
      setPieData(tempPieData)
      setBarData(projectBarData)

      // Setting Year Revenue for Bar Char
      var totalYearReveneu = 0
      for (let i = 0; i < projectBarData.length; i++)
      {
        totalYearReveneu += projectBarData[i].amount
      }
      setYearRevenue(totalYearReveneu)

      console.log('Pie Data Up');
      console.log(pieData);

    };

    dataFetch();

  }, []);



  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    width: 280,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: colors.blueAccent[500],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: colors.greenAccent[400]
    },
  }));

  if (!isDataLoaded)
    return (
      <h1>Loading</h1>
    )

  return (
    <Box m="20px" >

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      </Box>

      <Box
        sx={{
          pt: 2
        }}
      />

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >


        {/* ROW 1 */}
        <Box

          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: '16px',
            boxShadow: 20
          }}
        >

          <Card
            title={Intl.NumberFormat('en-US').format(incomeArray[0].totalAmount)}
            subtitle="Revenue"
            progress={(incomeArray[0].totalAmount / investment)}
            increase={((incomeArray[0].totalAmount / investment) * 100).toPrecision(3).toString() + '%'}
            icon={
              <AccountBalanceWalletIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
 
 
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '16px', boxShadow: 20 }}
        >
          <Card
            title={Intl.NumberFormat('en-US').format(expenseArray[0].totalAmount)}
            subtitle="Expense"
            progress={(expenseArray[0].totalAmount / incomeArray[0].totalAmount)}
            increase={((expenseArray[0].totalAmount / incomeArray[0].totalAmount) * 100).toPrecision(3).toString() + '%'}
            icon={
              <MoneyOffIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '16px', boxShadow: 20 }}
        >

          <Card
            title={Intl.NumberFormat('en-US').format((incomeArray[0].totalAmount - expenseArray[0].totalAmount))}
            subtitle="Profit / Loss"
            progress={((incomeArray[0].totalAmount - expenseArray[0].totalAmount) / investment)}
            increase={(((incomeArray[0].totalAmount - expenseArray[0].totalAmount) / investment) * 100).toPrecision(3).toString() + '%'}
            icon={
              <MovingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '16px', boxShadow: 20 }}
        >

          <Card
            title="1,000,000"
            subtitle="Investment"
            progress="0.75"
            increase="+15%"
            icon={
              <AddBusinessIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}




        {/* Pie Chart */}

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          sx={{ borderRadius: '16px', boxShadow: 20 }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {Intl.NumberFormat('en-US').format(revenueGenerated)}
              </Typography>
            </Box>
            <Box>
            </Box>
          </Box>
          <Box height="400px" m="-20px 0 0 0" sx={{ marginBottom: 5 }}>
            <Piechart dataGiven={pieData} />
          </Box>
        </Box>





        {/* /////////////////////  progress bars  */}

        {/* Box Start */}
        <Box
          gridColumn="span 4"
          gridRow="span 6"
          overflow="auto"
          sx={{ boxShadow: 20, borderRadius: '16px', p: 1.4, margin: 0 }}
        >
          {projectData.map((item, index, row) => (

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              backgroundColor={colors.primary[400]}
              // borderBottom={`15px solid ${colors.primary[400]}`}
              // sx={ (index+1) === row.length?  { borderRadius: '16px', boxShadow: 20 } :  { borderRadius: '16px', marginBottom: 4.1, boxShadow: 20 }}
              sx={{ borderRadius: '16px', margin: 1.4, boxShadow: 20 }}
              // colors={colors.primary[400]}
              p="15px"
            >

              <Typography
                color={colors.greenAccent[500]}
                variant="h4"
                fontWeight="600"
              >
                {item.name}

                <Box sx={{ pt: 1.5 }} />

                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Revenue: {Intl.NumberFormat('en-US').format(item.income)}
                  <Box sx={{ pt: 1 }} />
                  <BorderLinearProgress variant="determinate" value={(item.income / projectInvestment)*100} />
                </Typography>
                <br></br>

                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Expense: {Intl.NumberFormat('en-US').format(item.expense)}
                  <Box sx={{ pt: 1 }} />
                  <BorderLinearProgress variant="determinate" value={(item.expense / item.income)*100} />
                </Typography>
                <br></br>

                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Profit / Loss: {Intl.NumberFormat('en-US').format(item.income - item.expense)}
                  <Box sx={{ pt: 1 }} />
                  <BorderLinearProgress variant="determinate" value={(item.income - item.expense) / projectInvestment * 100} />
                </Typography>
                <br></br>

                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Investment: {Intl.NumberFormat('en-US').format(projectInvestment)}

                  <BorderLinearProgress variant="determinate" value={50} />
                </Typography>
              </Typography>
            </Box>
          ))}

        </Box>

        {/* barChart */}

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          sx={{ borderRadius: '16px', boxShadow: 20 }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {Intl.NumberFormat('en-US').format(yearRevenue)}
              </Typography>
            </Box>
          </Box>
          <Box height="400px" m="-20px 0 0 0">
            <BarChart dataGiven={barData} />
          </Box>
        </Box>

        {/* Box End */}

        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{ borderRadius: '16px', boxShadow: 20 }}

        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[400]}`}
            colors={colors.grey[100]}
            p="15px"
          >

            <Typography
              color={colors.greenAccent[500]}
              variant="h4"
              fontWeight="600"
            >
              Projects1 Details

              <Box sx={{ pt: 1.5 }} />

              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Income
                <Box sx={{ pt: 1 }} />
                <BorderLinearProgress variant="determinate" value={50} />
              </Typography>
              <br></br>

              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Expense
                <Box sx={{ pt: 1 }} />
                <BorderLinearProgress variant="determinate" value={65} />
              </Typography>
              <br></br>

              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Cash in hand
                <Box sx={{ pt: 1 }} />
                <BorderLinearProgress variant="determinate" value={80} />
              </Typography>
              <br></br>

              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Income

                <BorderLinearProgress variant="determinate" value={50} />
              </Typography>

            </Typography>

          </Box>
        </Box> */}











        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{ borderRadius: '16px', boxShadow: 20 }}

        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[400]}`}
            colors={colors.grey[100]}
            p="15px"
          >

            <Typography
              color={colors.greenAccent[500]}
              variant="h4"
              fontWeight="600"
            >
              Projects1 Details

              <Box sx={{ pt: 1.5 }} />

              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Income
                <Box sx={{ pt: 1 }} />
                <BorderLinearProgress variant="determinate" value={50} />
              </Typography>
              <br></br>

              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Expense
                <Box sx={{ pt: 1 }} />
                <BorderLinearProgress variant="determinate" value={65} />
              </Typography>
              <br></br>

              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Cash in hand
                <Box sx={{ pt: 1 }} />
                <BorderLinearProgress variant="determinate" value={80} />
              </Typography>
              <br></br>

              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Income

                <BorderLinearProgress variant="determinate" value={50} />
              </Typography>
            </Typography>
          </Box>
        </Box> */}


        {/* Cmapagn Circle */}


        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{ borderRadius: '16px', boxShadow: 20 }}
        >
          <Typography variant="h5" fontWeight="600">
            Investments
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {Intl.NumberFormat('en-US').format(568000)}
            </Typography>
            <Typography
            fontStyle={"italic"}
            fontSize={12}
            >It only includes the investments from other investors and the amount shown is for the whole business</Typography>
          </Box>
        </Box>


        {/* Line chart */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{ borderRadius: '16px', boxShadow: 20 }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue From All Projects
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {Intl.NumberFormat('en-US').format(yearRevenue)}
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart dataGiven={lineData} />
          </Box>
        </Box>






      </Box>
    </Box>


  );

}

export default Dashboard
