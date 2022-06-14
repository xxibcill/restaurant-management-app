import React ,{useState} from 'react'
import {FormControl ,FormHelperText ,Select ,MenuItem ,Button ,InputBase ,InputLabel ,Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { FormikHelpers as FormikActions } from 'formik';
import Unit from './Unit';

type FormBoxProps = {
    children?: JSX.Element|JSX.Element[]
}; /* use `interface` if exporting so that consumers can extend */
  
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

const style = {
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxShadow: 3,
    p: 5
};

const currencies = [
    {
      value: 'gram',
      label: 'g',
    },
    {
      value: 'ml',
      label: 'ml',
    },
    {
      value: 'kg',
      label: 'kg',
    },
    {
      value: 'litre',
      label: 'litre',
    },
];

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

const ValidateIngredientTypeSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    category: Yup.string()
        .required('Required'),
    yieldRatio: Yup.number()
        .moreThan(0,"Value must be a  between 0 and 1")
        .max(1,"Value must be a between 0 and 1")
        .required('Required'),
    amountInSTDUnit: Yup.number()
        .moreThan(0,"Value must be more than 0")
        .required('Required'),
    stdUnit: Yup.string()
        .required('Required'),
    expireTimeDuration: Yup.number()
        .moreThan(0,"Value must be more than 0")
        .required('Required'),
});

interface FormValues {
    name: string;
    category: string;
    yieldRatio: number;
    amountInSTDUnit: number;
    stdUnit: string;
    expireTimeDuration: number
}

type FormikSubmitHandler<V> = (value: FormValues, actions: FormikActions<V>) => void;


  // Easiest way to declare a Function Component; return type is inferred.
const CreateIngredientTypeFormBox = ({children}: FormBoxProps): JSX.Element => {

    const [unitSelected, setUnit] = useState('ml');

    const handleSubmit: FormikSubmitHandler<FormValues>  = async (values, formikBag) => {
        formikBag.setSubmitting(true);
        console.log(JSON.stringify(values, null, 2));

        axios({
            method: 'post',
            url: 'http://localhost:8080/createIngredient',
            data: {
                "name" : values.name,
                "category" : values.category,
                "yieldRatio" : values.yieldRatio,
                "stdUnit" : values.stdUnit,
                "amountInSTDUnit" : values.amountInSTDUnit,
                "expireTimeDuration" : values.expireTimeDuration
            }
        })
        .then(response=>{
            console.log(response.data);
            formikBag.setSubmitting(false);
        })
    };

    return(
        <ThemeProvider theme={theme}>
            <Formik
                initialValues={{
                    name: "",
                    category: "",
                    yieldRatio: 0,
                    amountInSTDUnit: 0,
                    stdUnit: "ml",
                    expireTimeDuration: 0
                }}
                validationSchema={ValidateIngredientTypeSchema}
                onSubmit={handleSubmit}
            >
                {({ values,isSubmitting }) => (
                    <Form>
                        <pre>{`${JSON.stringify(values, null, 2)}  ${isSubmitting}`}</pre>
                        <Box sx={style}>
                            <Typography sx={{fontSize : 25}} variant="h1" component="h1" gutterBottom>
                                create IngredientType
                            </Typography>
                            <FormControl color='success' variant="standard">
                                <InputLabel shrink htmlFor="name">Name</InputLabel>
                                <Field type="text" name="name" as={BootstrapInput} />
                                <ErrorMessage name="name">
                                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                                </ErrorMessage>
                            </FormControl>

                            <FormControl variant="standard" sx={{marginTop:5}}>
                                <InputLabel shrink htmlFor="category">Category</InputLabel>
                                <Field type="text" name="category" as={BootstrapInput} />
                                <ErrorMessage name="category">
                                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                                </ErrorMessage>
                            </FormControl>
                                
                            <FormControl variant="standard" sx={{marginTop:5}}>
                                <InputLabel shrink htmlFor="yieldRatio">Yield</InputLabel>
                                <Field type="number" name="yieldRatio" as={BootstrapInput} />
                                <ErrorMessage name="yieldRatio">
                                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                                </ErrorMessage>
                            </FormControl>

                            <Box sx={{marginTop:5}}>
                                <FormControl variant="standard" >
                                    <InputLabel shrink htmlFor="amountInSTDUnit">Amount</InputLabel>
                                    <Field type="number" name="amountInSTDUnit" as={BootstrapInput} />
                                    <ErrorMessage name="amountInSTDUnit">
                                        {msg => <FormHelperText error>{msg}</FormHelperText>}
                                    </ErrorMessage>
                                </FormControl>

                                <Field
                                    name="stdUnit"
                                    sx={{marginTop: 3,marginLeft: 3,height:40}}
                                    as={Select}
                                >
                                    {Unit.map((option) => (
                                        <MenuItem key={option} value={option}>
                                        {option}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Box>

                            <FormControl variant="standard" sx={{marginTop:5}}>
                                <InputLabel shrink htmlFor="expireTimeDuration" >Expire Time Duration</InputLabel>
                                <Field type="number" name="expireTimeDuration" as={BootstrapInput} />
                                <ErrorMessage name="expireTimeDuration">
                                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                                </ErrorMessage>
                                <FormHelperText id="etd-helper-text">How long this Ingredient last in Days</FormHelperText>
                            </FormControl>

                            <Button disabled={isSubmitting} type='submit' sx={{width:100,marginTop:4}} variant="contained">Submit</Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </ThemeProvider>
    )
  };

export default CreateIngredientTypeFormBox;