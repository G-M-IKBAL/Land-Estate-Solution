import { Box, Button, TextField, useTheme, Grid } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React from "react";
import { tokens } from "../../Themes";
import { useNavigate } from 'react-router-dom';

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const checkoutSchema = yup.object().shape({

  name: yup.string().required("required"),
  location: yup.string().required("required"),
  area: yup.number().required("required"),
  commersialPlots: yup.number().required("required"),
  residentialPlots: yup.number().required("required"),

});


const initialValues = {

  name: "",
  location: "",
  area: "",
  commersialPlots: "",
  residentialPlots: ""

};


const Project = () => {

  const navigate = useNavigate();
  const userID = sessionStorage.getItem("userID")
  if (userID === '' || userID === null)
  {
    navigate('/login')
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    const register = async () => {
      const res = await fetch('http://localhost:8080/admin/registerProject', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name,
          location: values.location,
          supervisorId: userID
        })
      });
      if (res.status === 404) {
        alert('Unsucessfull')
      }
      else {
        alert('Project Added')
      }
    };

    register();
  };

  return (

    <Box>

      <Box mb="20px" sx={{ pt: 2 }} display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Project Registration" subtitle="Add New Project" />
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

              mt="25px"
              p="0 30px"
              display="flex"
              justifyContent="center"
              alignItems="center"
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

                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                      }}

                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        sx={{ gridColumn: "span 28", marginTop: 8 }}

                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        error={!!touched.location && !!errors.location}
                        helperText={touched.location && errors.location}
                        sx={{ gridColumn: "span 28" }}

                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Totall Area"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.area}
                        name="area"
                        error={!!touched.area && !!errors.area}
                        helperText={touched.area && errors.area}
                        sx={{ gridColumn: "span 28" }}

                      />

                      <TextField

                        fullWidth
                        variant="filled"
                        type="numer"
                        label="Number of Commersial Plots"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.commersialPlots}
                        name="commersialPlots"
                        error={!!touched.commersialPlots && !!errors.commersialPlots}
                        helperText={touched.commersialPlots && errors.commersialPlots}
                        sx={{ gridColumn: "span 28" }}

                      /> <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Number of Residentials Plots"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.residentialPlots}
                        name="residentialPlots"
                        error={!!touched.residentialPlots && !!errors.residentialPlots}
                        helperText={touched.residentialPlots && errors.residentialPlots}
                        sx={{ gridColumn: "span 28" }}

                      />



                    </Box>

                    <Box
                      sx={{ pt: 2 }}
                    />

                    <Box display="flex" justifyContent="center" mt="20px" alignItems="center" >
                      <Button type="submit" color="secondary" variant="contained" sx={{ width: "5cm" }} >
                        Add New Project
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

export default Project;