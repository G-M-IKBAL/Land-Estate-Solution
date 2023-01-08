import { Box, Button, TextField, Select, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { tokens } from "../Themes";
import { date } from "yup/lib/locale";
import { useNavigate } from 'react-router-dom';

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const checkoutSchema = yup.object().shape({

  client: yup.string().required("required"),
  amount: yup.string().required("required"),
  project: yup.string().required("required"),
  date: yup.string()

});

const initialValues = {

  client: "",
  amount: "",
  project: "",
  date: ""



};


const Installmets = () => {
  const navigate = useNavigate();
  const userID = sessionStorage.getItem("userID")
  if (userID === '' || userID === null) {
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



  const isNonMobile = useMediaQuery("(min-width:600px)");


  const { readOnly } = true;
  const [value, setValue] = useState(null);
  const [area, setarea] = useState(0)
  const [price, setprice] = useState(0)

  function convertToISO(date) {
    var getDate = new Date(date.toISOString().split('T')[0])
    getDate.setDate(getDate.getDate() + 1)
    var isoDate = getDate.toISOString()
    return isoDate
  }

  const handleFormSubmit = (values) => {
    console.log(values);
    const register = async () => {
      const res = await fetch('http://localhost:8080/admin/installments', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: convertToISO(value),
          e_id: userID,
          c_id: values.client,
          amount: values.amount,
          p_id: values.project
        })
      });
      if (res.status === 404) {
        alert('Unsucessfull')
      }
      else {
        alert('Income Added')
      }
    };

    register();
  };

  return (

    <Box>
      <Box mb="20px" sx={{ pt: 2 }} display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Expense" subtitle="Add Expenses here if any" />
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
            gridRow="span 4"
            backgroundColor={colors.primary[400]}
            sx={{ borderRadius: '16px', boxShadow: 20 }}
          >

            <Box

              mt="90px"
              ml="20px"
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
                        sx={{ gridColumn: "span 33" }}
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
                        sx={{ gridColumn: "span 33" }}

                      >
                        {clientNames.map(item => (
                          <MenuItem value={item._id}>{item.name}</MenuItem>
                        ))}

                      </TextField>


                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Amount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="amount"
                        error={!!touched.amount && !!errors.amount}
                        helperText={touched.amount && errors.amount}
                        sx={{ gridColumn: "span 33" }}
                      />




                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params}
                            label="Date"

                            sx={{ gridColumn: "span 33" }}
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
                        Add Expense
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

export default Installmets;