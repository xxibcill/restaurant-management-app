import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import {FormControl ,FormHelperText ,Select ,MenuItem ,SelectChangeEvent ,Button ,InputBase ,InputLabel } from '@mui/material';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

export const FormikErr = ():JSX.Element => {
    return (
        <div>
            <h1>Signup</h1>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                <Form>
                <Field name="name"/>
                <ErrorMessage name="name">
                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                </ErrorMessage>
                <Field name="email" type="email" />
                <ErrorMessage name="email" />
                <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
        )}
