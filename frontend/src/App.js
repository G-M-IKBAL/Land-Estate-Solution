import './App.css'
import React, { useState } from 'react'
//import Login from './pages/login'
// import Employee from './pages/E_dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

import { ColorModeContext, useMode } from './pages/Admin/Themes'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { Route, Routes } from 'react-router-dom'
import Topbar from './pages/Admin/Scenes/Topbar'
import Dashboard from './pages/Admin/Scenes/Dashboard'
import Sidebar from './pages/Admin/Scenes/Sidebar'
import Team from './pages/Admin/Scenes/team'
import Client_registration from './pages/Admin/Scenes/Registrations/clientRgistration'
import Employee_registration from './pages/Admin/Scenes/Registrations/Employee_registration'
import Investore_registration from './pages/Admin/Scenes/Registrations/Investore_registration'
import Property_Booking from './pages/Admin/Scenes/Registrations/Property_Booking'
import Calender from './pages/Admin/Scenes/calender.jsx'
import Chart from './pages/Admin/Scenes/BarChart'
import Pie from './pages/Admin/Scenes/PieChart'
import Line from './pages/Admin/Scenes/LineChart'
import Receipt from './pages/Admin/Scenes/receipt.jsx'
import DailyReport from './pages/Admin/Scenes/DailyReport'
import MonthlyReport from './pages/Admin/Scenes/MonthlyReport'
import RecoveryReport from './pages/Admin/Scenes/RecoveryReport'
import Login from './pages/Sign-In/login'

import Employee_Topbar from './pages/Employee/Topbar'
import Employee_Sidebar from './pages/Employee/Sidebar'

import EmployeeCR from './pages/Employee/Registrations/clientRgistration'
import EmployeePB from './pages/Employee/Registrations/Property_Booking'
import Expenses from './pages/Employee/Registrations/Expenses'
import Installmets from './pages/Employee/Registrations/instalments'
import Project from './pages/Admin/Scenes/Registrations/Project'
import Calendar from './pages/Employee/calender'
import Model3D from './pages/Admin/Scenes/Modeling'

function App() {
  const [theme, colorMode] = useMode()
  const [isSidebar, setIsSidebar] = useState(true)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>

        <AdminRoutes />
        <EmployeeRoutes />

      </ThemeProvider>
    </ColorModeContext.Provider>

    //   <Router>

    // {/* <Routes>
    // <Route path="/login" element={<Login/>}/>
    // </Routes> */}

    // <Routes>
    // <Route path="/" element={<Employee/>}/>
    // </Routes>
    //      </Router>
  )
}

function AdminRoutes() {
  if (sessionStorage.getItem("userRole") === 'admin') {
    return (
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/client_registration" element={<Client_registration />} />
            <Route path="/employee_registration" element={<Employee_registration />} />
            <Route path="/investore_registration" element={<Investore_registration />} />
            <Route path="/property_booking" element={<Property_Booking />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/viewReceipts" element={<Receipt />} />
            <Route path="/dailyReport" element={<DailyReport />} />
            <Route path="/monthlyReport" element={<MonthlyReport />} />
            <Route path="/recoveryReport" element={<RecoveryReport />} />
            <Route path="/addProject" element={<Project />} />
            {/* <Route path="/model" element={<Model3D />} /> */}
          </Routes>
        </main>
      </div>
    )
  }
}

function EmployeeRoutes() {
  if (sessionStorage.getItem("userRole") === 'Employee') {
    return (
      <div className="app">
        <Employee_Sidebar />
        <main className="content">
          <Employee_Topbar />
          <Routes>
            <Route path="/employeeCR" element={<EmployeeCR />} />
            <Route path="/employeePB" element={<EmployeePB />} />
            <Route path="/expense" element={<Expenses />} />
            <Route path="/income" element={<Installmets />} />
            <Route path="/dailyReport" element={<DailyReport />} />
            <Route path="/appointment" element={<Calendar />} />
          </Routes>
        </main>
      </div>
    )
  }
}

export default App
