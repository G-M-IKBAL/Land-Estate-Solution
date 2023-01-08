import React, { useState, useEffect } from "react";
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
import { useNavigate } from 'react-router-dom';



import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import Header from "./components/Header";
import { tokens } from "./Themes";


const Calendar = () => {

  const navigate = useNavigate();
  const userID = sessionStorage.getItem("userID")
  if (userID === '' || userID === null)
  {
    navigate('/login')
  }


  function convertToISO(date) {
    var getDate = new Date(date.toISOString().split('T')[0])
    getDate.setDate(getDate.getDate() + 1)
    var isoDate = getDate.toISOString()
    return isoDate
  }

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch('http://localhost:8080/admin/getEmployeeAppointments', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      });
      const dataF = await res;
      // var resD = [];
      // for (var i in dataF)
      //     resD.push(i)
      dataF.json().then((result) => {
        console.log(JSON.stringify(result))
        setCurrentEvents(result)
        
        setLoading(false)
      })
        .catch((err) => {
          console.log(err)
        })
      // setData(dataF)
    };

    dataFetch();

  }, []);

  const Events = [
    {
      // id: "12315",
      title: "All-day event",
      date: "2022-09-14",
    },
    {
      // id: "5123",
      title: "Timed event",
      date: "2022-12-05T19:00:00.000Z",
    }

  ]

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [eMsg, setEMsg] = useState()
  const [eDate, setEDate] = useState()
  const [eId, setEId] = useState()
  const [loading, setLoading] = useState(true)

  // For Modal to display - Adding response to notification
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  // const handleDateClick = (selected) => {
  //   const title = prompt("Please enter a new title for your event");
  //   const calendarApi = selected.view.calendar;
  //   calendarApi.unselect();


  //   if (title) {
  //     calendarApi.addEvent({
  //       id: `${selected.dateStr}-${title}`,
  //       title,
  //       start: selected.startStr,
  //       end: selected.endStr,
  //       allDay: selected.allDay,

  //     });

  //   }

  // };

  const handleEvents = (selected) => {
    var val = selected.event.date
    var val2 = val.toDateString()
    console.log(val2)
  }

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleAppointmentResponse = async () => {
    // console.log(eId);
    // // newD.getDate
    // console.log(newD.toLocaleDateString());

    // event.preventDefault();
    const res = await fetch('http://localhost:8080/admin/resolveAppointments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id": eId,
        "message": eMsg,
        "date": convertToISO(eDate)
      })
    });
    const dataF = await res;
    // var resD = [];
    // for (var i in dataF)
    //     resD.push(i)

    if (dataF.status === 200)
      alert('Response to Appointment - Success');
    else
      alert('Response to Appointment - UnSuccess');
  }

  const handleAppointmentToAdmin = async () => {
    // console.log(eId);
    // // newD.getDate
    // console.log(newD.toLocaleDateString());

    // event.preventDefault();
    const res = await fetch('http://localhost:8080/admin/appointmentBackToAdmin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id": eId
      })
    });
    const dataF = await res;
    // var resD = [];
    // for (var i in dataF)
    //     resD.push(i)

    if (dataF.status === 200)
      alert('Reffered To Admin - Success');
    else
      alert('Reffered To Admin - UnSuccess');
  }

  if (loading)
  return(
    <h1>Loading</h1>
  )

  return (
    <Box mb="20px" sx={{ pt: 4 }}>

      <Box mb="20px" sx={{ pt: 2 }} display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Client" subtitle="Create a New User Profile" />
      </Box>

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event._id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
                onClick={evnt => {
                  setEId(event._id)
                  handleOpen()
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.date, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Modal to display for adding response */}
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
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Response"
              value={eMsg}
              onChange={event => setEMsg(event.target.value)}
              name="name"
              sx={{ gridColumn: "span 4" }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={eDate}
                onChange={(newValue) => {
                  setEDate(newValue);
                }}
                renderInput={(params) => <TextField {...params}
                  label="Date"
                  sx={{ gridColumn: "span 4" }}
                  variant="filled"
                  value={eDate}
                  name="date"
                />
                }
              />
            </LocalizationProvider>
            <Button onClick={handleAppointmentResponse} color="secondary">Send</Button>
            <Button onClick={handleAppointmentToAdmin} color="secondary">Refer To Admin</Button>

          </Box>
        </Modal>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">


          <FullCalendar
            height="75vh"

            initialView="dayGridMonth"

            plugins={[

              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,listMonth",
            }}

            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // select={handleDateClick}


            // eventClick={handleEventClick}
            // eventsSet={(events) => setCurrentEvents(events)}
            // eventAdd={handleEvents}

            initialEvents={currentEvents}



          />


        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
