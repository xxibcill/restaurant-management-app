import React ,{useEffect, useState} from 'react'
import {FormControl ,FormHelperText ,Select ,MenuItem ,Button ,InputBase ,InputLabel ,Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { FormikHelpers as FormikActions } from 'formik';
import Unit from './Unit.js'
import { IngredientType } from './../global/types';
import IngredientFormBox from './IngredientFormBox'
import { getIngredientTypeList } from "./utils"

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
    salePrice: Yup.string()
        .required('Required'),
    ingredientID:  Yup.array()
        .of(
            Yup.number()
        ),
    amountInSTDUnit: Yup.array()
        .of(
            Yup.number()
        ),

});

interface FormValues {
    name: string;
    salePrice: number;
    ingredientID: number[]
    amountInSTDUnit: number[]
}

type FormikSubmitHandler<V> = (value: FormValues, actions: FormikActions<V>) => void;


  // Easiest way to declare a Function Component; return type is inferred.
const CreateMenuFormBox = ({children}: FormBoxProps): JSX.Element => {

    const [ingredientLength,setIngredientLength] = useState(1);
    const [ingredientTypeList,setIngredientTypeList] = useState<IngredientType[]>([{
        id : 1,
        name: "Milk",
        category: "Daily",  
        yieldRatio: 1,
        stdUnit: "ml",
        amountInSTDUnit: 1000,
        expireTimeDuration : 21 
    }]);

    const IngredientTypeMock: IngredientType[] = [
        {
            id : 1,
            name: "Milk",
            category: "Daily",  
            yieldRatio: 1,
            stdUnit: "ml",
            amountInSTDUnit: 1000,
            expireTimeDuration : 21 
        },
        {
            id : 2,
            name: "Strawberry",
            category: "Frozen",  
            yieldRatio: 1,
            stdUnit: "kg",
            amountInSTDUnit: 1,
            expireTimeDuration : 30 
        },
        {
            id : 3,
            name: "Strawberry Syrup",
            category: "Syrup",  
            yieldRatio: 1,
            stdUnit: "ml",
            amountInSTDUnit: 750,
            expireTimeDuration : 120 
        }
    ]

    useEffect(()=>{
        getIngredientTypeList();
    },[])

    const handleSubmit: FormikSubmitHandler<FormValues>  = async (values, formikBag) => {
        formikBag.setSubmitting(true);
        console.log(JSON.stringify(values, null, 2));

        // const response = await axios({
        //     method: 'post',
        //     url: 'http://localhost:8080/createMenu',
        //     data: values
        // })
        // console.log(response.data);
        formikBag.setSubmitting(false);
    };

    return(
        <ThemeProvider theme={theme}>
            <Formik
                initialValues={{
                    name : "test",
                    salePrice : 1123,
                    ingredientID: [1],
                    amountInSTDUnit: [0]
                }}
                validationSchema={ValidateIngredientTypeSchema}
                onSubmit={handleSubmit}
            >
                {({ values,isSubmitting}) => (
                    <Form>
                        <pre>{`${JSON.stringify(values, null, 2)} \n${isSubmitting}`}</pre>
                        <Box sx={style}>
                            <Typography sx={{fontSize : 25,marginBottom:3}} variant="h1" component="h1" gutterBottom>
                                create Menu Data
                            </Typography>
                            <FormControl color='success' variant="standard">
                                <InputLabel shrink htmlFor="name">Name</InputLabel>
                                <Field type="text" name="name" as={BootstrapInput} />
                                <ErrorMessage name="name">
                                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                                </ErrorMessage>
                            </FormControl>

                            <FormControl color='success' variant="standard" sx={{marginTop:3}}>
                                <InputLabel shrink htmlFor="salePrice">sale price</InputLabel>
                                <Field type="number" name="salePrice" as={BootstrapInput} />
                                <ErrorMessage name="salePrice">
                                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                                </ErrorMessage>
                            </FormControl>

                            <Button 
                                onClick={() => {setIngredientLength(ingredientLength+1); values.ingredientID.push(1);values.amountInSTDUnit.push(0);}}  
                                sx={{width:100,marginTop:4}} 
                                variant="contained"
                            >
                                    Add Ingredient
                            </Button>
                            
                            {
                                Array.from(Array(ingredientLength),(x,i)=>i).map(
                                    (i) => (
                                        <IngredientFormBox 
                                            key={i} 
                                            stdUnit={ingredientTypeList[values.ingredientID[i]-1].stdUnit ? ingredientTypeList[values.ingredientID[i]-1].stdUnit : ""} 
                                            ingredientTypeList={ingredientTypeList} 
                                            index={i} 
                                        />
                                    )
                                )
                            }
                                
                            <Button disabled={isSubmitting} type='submit' sx={{width:100,marginTop:4}} variant="contained">Submit</Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </ThemeProvider>
    )
  };

export default CreateMenuFormBox;