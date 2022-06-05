// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {FormControl ,FormHelperText ,Select ,MenuItem ,SelectChangeEvent ,Button ,InputBase ,InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha, styled } from '@mui/material/styles';
import * as Yup from "yup";

const theme = createTheme({
    palette: {
        primary: {
          light: '#757ce8',
          main: '#3f50b5',
          dark: '#002884',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff7961',
          main: '#f44336',
          dark: '#ba000d',
          contrastText: '#000',
        },
    },
});

const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.success.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.success,
      },
    },
}));

const TestFormik = (): JSX.Element => {
        return (
            <div>
                <h1>Any place in your app!</h1>
                <Formik
                    initialValues={{ name: '', email: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true);
                            console.log(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                    }}
                >
                {({ isSubmitting }) => (
                    <Form>
                        <FormControl color='success' variant="standard">
                            <InputLabel shrink htmlFor="name">Name</InputLabel>
                            <Field type="text" name="name" as={BootstrapInput} />
                            <ErrorMessage name="name">
                                {msg => <FormHelperText error>{msg}</FormHelperText>}
                            </ErrorMessage>
                        </FormControl>
                        <FormControl color='success' variant="standard">
                            <InputLabel shrink htmlFor="email">Email</InputLabel>
                            <Field type="email" name="email" as={BootstrapInput} />
                            <ErrorMessage name="email">
                                {msg => <FormHelperText error>{msg}</FormHelperText>}
                            </ErrorMessage>
                        </FormControl>
                        <Button disabled={isSubmitting} type='submit' sx={{width:100,marginTop:4}} variant="contained">Submit</Button>
                    </Form>
                )}
                </Formik>
            </div>
        )
    };

export default TestFormik;