import React from 'react';
import { Formik } from 'formik';
import {
    Box,
    TextField,
    Button,
    Typography,
  } from "@mui/material";

function Home(){
    const validateForm = (formData) => {
        var errors = {};
        if (formData.name === "") errors.name = "Name is Required";
        if (formData.email === "") errors.email = "Email is Required";
        if (formData.city === "") errors.city = "City is Required";
        return errors;
      };
      const handleSubmit = (formData, { resetForm }) => {
        setTimeout(() => {
          console.log(formData);
          resetForm();
        }, 1000);
      };
    return(
    <div style={{ padding: "50px", color: 'black', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Registration Form
      </Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          city: "",
        }}
        validate={(formData) => validateForm(formData)}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>{touched.name && errors.name}</span>
            <br />
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>
              {touched.email && errors.email}
            </span>
            <br />
            <TextField
              id="city"
              label="City"
              variant="outlined"
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>{touched.city && errors.city}</span>
            <br /> <br />
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Register
            </Button>
            <Button variant="contained" type="button" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        )}
      </Formik>
    </div>
    );
}
export default Home;