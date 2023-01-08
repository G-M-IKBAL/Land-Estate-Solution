import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../Themes";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FitScreen } from "@mui/icons-material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BadgeIcon from '@mui/icons-material/Badge';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CottageIcon from '@mui/icons-material/Cottage';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// import Property_Booking from "./Registrations/Property_Booking";

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SyncIcon from '@mui/icons-material/Sync';
import logo from './profile.png'


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  // const userID = sessionStorage.getItem("userID")
  // if (userID === '' || userID === null) {
  //   return (
  //     <>
  //     </>
  //   )
  // }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <div style={{ float: "left", backgroundColor: colors.primary[400] }}>
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed} style={{ minHeight: '100vh' }} >
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>

                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={logo}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >

                    Mohiuddin

                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    Admin
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/home"
                icon={<CottageIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "5px 0 5px 2px" }}
              >
                Data
              </Typography>

              <Item
                title="Team"
                to="/team"
                icon={<Diversity3Icon />}
                selected={selected}
                setSelected={setSelected}
              />
              {/* <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
              {/* <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "5px 0 5px 2px" }}
              >
                Registration
              </Typography>

              <Item
                title="Client"
                to="/client_registration"
                icon={<PersonAddIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Employee "
                to="/employee_registration"
                icon={<BadgeIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Investore"
                to="/investore_registration"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Property"
                to="/property_booking"
                icon={<ApartmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Project"
                to="/addProject"
                icon={<MapsHomeWorkIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
  
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "5px 0 5px 2px" }}
              >
                Appointments
              </Typography>

              <Item
                title="calender"
                to="/calender"
                icon={<PermContactCalendarIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "5px 0 5px 2px" }}
              >
                Receipts
              </Typography>

              <Item
                title="Receipts"
                to="/viewReceipts"
                icon={<ReceiptIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "5px 0 5px 2px" }}
              >
                Reports
              </Typography>

              <Item
                title="Daily Report"
                to="/dailyReport"
                icon={<AssessmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Monthly Report"
                to="/monthlyReport"
                icon={<SummarizeIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Recovery Report"
                to="/recoveryReport"
                icon={<SyncIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>

    </div>
  );
};

export default Sidebar;
