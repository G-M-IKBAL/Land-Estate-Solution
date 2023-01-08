import { Box, Button, TextField, Select, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { tokens } from "../../Themes";
import { useNavigate } from 'react-router-dom';

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const checkoutSchema = yup.object().shape({

  // project: yup.string().required("required"),
  // date: yup.date().required("required"),
  // type: yup.string().required("required"),
  // number: yup.number().required("required"),
  // price: yup.number().required("required"),
  // area: yup.number().required("required"),
  // amount: yup.string().required("required"),
  // duration: yup.number().required("required"),
  // rent: yup.number().required("required")
  project: yup.string(),
  date: yup.date(),
  type: yup.string(),
  number: yup.number(),
  price: yup.number(),
  area: yup.number(),
  amount: yup.string(),
  duration: yup.number(),
  rent: yup.number()

});

const initialValues = {

  project: "",
  date: "",
  type: "",
  price: "",
  area: 0,
  amount: "",
  duration: "",
  rent: "",
  client: "",
  advance: "",
  number: ""
};


const Property_Booking = () => {
  const navigate = useNavigate();
  const userID = sessionStorage.getItem("userID")
  if (userID === '' || userID === null)
  {
    navigate('/login')
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [names, setNames] = useState([])
  const [clientNames, setClientNames] = useState([])

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
        setNames(result)
      })
        .catch((err) => {
          console.log(err)
        })
      const res1 = await fetch('http://localhost:8080/admin/getClients', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      });
      const dataF1 = await res1;
      dataF1.json().then((result) => {
        setClientNames(result)
      })
        .catch((err) => {
          console.log(err)
        })

    };

    dataFetch();

  }, []);

  const plot_type = [
    'Commercial',
    'Residential'
  ];

  const isNonMobile = useMediaQuery("(min-width:600px)");


  const { readOnly } = true;
  const [value, setValue] = useState(null);
  const [area, setarea] = useState(0)
  const [rent, setrent] = useState(0)

  function convertToISO(date) {
    var getDate = new Date(date.toISOString().split('T')[0])
    getDate.setDate(getDate.getDate() + 1)
    var isoDate = getDate.toISOString()
    return isoDate
  }

  const handleFormSubmit = (values) => {
    // value contains the date 
    // and values contain the all date of property
    const register = async () => {
      const res = await fetch('http://localhost:8080/admin/registerProperty', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eid: "63b94d0a8276d6b0478c057a",
          cid: values.client,
          tid: values.project,
          ptype: values.type,
          plotno: values.number,
          rate: values.price,
          area: values.area,
          total: values.amount,
          duration: values.duration,
          rent: values.rent,
          date: convertToISO(value),
          advance: values.advance
        })
      });
      if (res.status === 404) {
        alert('Unsucessfull')
      }
      else {
        alert('Property Added')
      }
    };

    register();
  };

  return (

    <Box>
      <Box mb="20px" sx={{ pt: 2 }} display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Property" subtitle="Create a New User Profile" />
      </Box>


      <div style={{ margin: 50 }}>

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"

        >


          <Box
            gridColumn="span 12"
            gridRow="span 5"
            backgroundColor={colors.primary[400]}
            sx={{ borderRadius: '16px', boxShadow: 20 }}
          >

            <Box

              mt="70px"
              ml="70px"
              p="0 30px"
              display="flex"
              justifyContent="left"
              alignItems="left"
            >

              <Formik

                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>

                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}
                    >


                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Project"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        select
                        value={values.project}
                        name="project"
                        error={!!touched.project && !!errors.project}
                        helperText={touched.project && errors.project}
                        sx={{ gridColumn: "span 16" }}

                      >
                        {names.map(item => (
                          <MenuItem value={item._id}>{item.name}</MenuItem>
                        ))}

                      </TextField>

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Choose Client"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        select
                        value={values.client}
                        name="client"
                        error={!!touched.client && !!errors.client}
                        helperText={touched.client && errors.client}
                        sx={{ gridColumn: "span 16" }}

                      >
                        {clientNames.map(item => (
                          <MenuItem value={item._id}>{item.name}</MenuItem>
                        ))}

                      </TextField>



                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Plot Type"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        select
                        value={values.type}
                        name="type"
                        error={!!touched.type && !!errors.type}
                        helperText={touched.type && errors.type}
                        sx={{ gridColumn: "span 16" }}

                      >
                        {plot_type.map((name) => (<MenuItem key={name} value={name}> {name} </MenuItem> // data type object
                        ))}

                      </TextField>

                      <TextField



                        fullWidth
                        variant="filled"
                        type="number"
                        label="Plot Number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.number}
                        name="number"
                        error={!!touched.number && !!errors.number}
                        helperText={touched.number && errors.number}
                        sx={{ gridColumn: "span 16" }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Rate per merla"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.price}
                        setprice={value}
                        name="price"
                        error={!!touched.price && !!errors.price}
                        helperText={touched.price && errors.price}
                        sx={{ gridColumn: "span 16" }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Area"
                        onBlur={handleBlur}

                        value={values.area}
                        onChange={handleChange}


                        name="area"
                        error={!!touched.area && !!errors.area}
                        helperText={touched.area && errors.area}
                        sx={{ gridColumn: "span 16" }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Total Amount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.amount}
                        name="amount"
                        error={!!touched.amount && !!errors.amount}
                        helperText={touched.amount && errors.amount}
                        sx={{ gridColumn: "span 16" }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Advance"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.advance}
                        name="advance"
                        error={!!touched.advance && !!errors.advance}
                        helperText={touched.advance && errors.advance}
                        sx={{ gridColumn: "span 16" }}

                      >
                      </TextField>



                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Totall Duration in Monthes"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.duration}
                        name="duration"
                        error={!!touched.duration && !!errors.duration}
                        helperText={touched.duration && errors.duration}
                        sx={{ gridColumn: "span 32" }}
                      />


                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Rent Per Month"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.rent}
                        name="rent"
                        error={!!touched.rent && !!errors.rent}
                        helperText={touched.rent && errors.rent}
                        sx={{ gridColumn: "span 32" }}
                      />


                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params}
                            label="Date"

                            sx={{ gridColumn: "span 32" }}
                            variant="filled"
                            value={values.date}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="date"
                            error={!!touched.date && !!errors.date}
                            helperText={touched.date && errors.date}


                          />
                          }
                        />
                      </LocalizationProvider>

                    </Box>

                    <Box
                      sx={{ pt: 2 }}
                    />

                    <Box display="flex" justifyContent="center" mt="20px" alignItems="center" >
                      <Button type="submit" color="secondary" variant="contained" sx={{ width: "5cm" }} >
                        Book Property
                      </Button>

                    </Box>


                  </form>
                )}
              </Formik>


            </Box>
          </Box>
        </Box>
      </div>


    </Box>
  );

}

export default Property_Booking