import { Box, IconButton, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ColorModeContext, tokens } from "./Themes";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from '@mui/material/Typography';
import { grey } from "@mui/material/colors";

import { mocNotifications } from "./data/mockData";

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import PowerSettingIcon from '@mui/icons-material/PowerSettingsNew'
import { useNavigate } from 'react-router-dom';

const Topbar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.setItem("userID", '');
    sessionStorage.setItem("userRole", '');
    navigate('/login')
  }


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? colors.primary[500] : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (


    <div style={{ float: "right" }}>



      <Box display="flex" justifyContent="space-between" p={2} >
        {/* SEARCH BAR */}
        {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

        {/* ICONS */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>



          <IconButton>

            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div >
                  <NotificationsOutlinedIcon variant="contained" {...bindTrigger(popupState)} />
                  <Popover
                    {...bindPopover(popupState)}

                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',

                    }}

                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',

                    }}
                  >


                    <Typography

                      sx={{
                        p: 10, marginTop: -8,

                        backgroundColor: theme.palette.mode === 'dark' ? colors.primary[400] : "#fff",
                      }}

                    >


                      <Box

                        //  mt="0px"
                        //  marginTop={-2}
                        marginBottom={-2}

                        p="0 30px"
                        //  display="flex"
                        //  justifyContent="space-between"
                        //  alignItems="flex-start"
                        sx={{ borderRadius: '16px', boxShadow: 20, backgroundColor: colors.grey[600] }}
                      >

                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          color={colors.greenAccent[600]}
                        >
                          Notification's
                        </Typography>
                      </Box>

                      {mocNotifications.map((Noti) => (

                        <Typography

                          variant="h1"
                          fontWeight="bold"
                          color={colors.grey[100]}
                          sx={{ marginTop: 5 }}
                        >

                          <Box sx={{ width: '100%', boxShadow: 20, borderRadius: '16px' }}>
                            <Stack spacing={1} >
                              <Item >{Noti.Notification}</Item>
                            </Stack>
                          </Box>

                        </Typography>

                      )
                      )}

                    </Typography>

                  </Popover>

                </div>
              )}
            </PopupState>

            {/* <NotificationsOutlinedIcon /> */}


          </IconButton>
          <IconButton>
            <PowerSettingIcon onClick={handleLogOut} />
          </IconButton>
        </Box>
      </Box>

    </div>
  );

};

export default Topbar;
