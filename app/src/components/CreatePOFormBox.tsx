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
import { IngredientInMenuForm, IngredientType } from './../global/types';
import IngredientFormBox from './IngredientFormBox'
import { getIngredientTypeList } from "./utils"
import ResponsiveDatePickers from './ResponsiveDatePickers'
import AddIngredientInPO from './AddIngredientInPO';
import BootstrapInput from './BootstrapInput';
import {Ingredient} from '../global/types'
import IngredientList from './IngredientList'


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
    width: 'auto',
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxShadow: 3,
    p: 5
};

const ValidateIngredientTypeSchema = Yup.object().shape({
    date: Yup.string()
        .required('Required'),
    ingredientID:  Yup.array()
        .of(
            Yup.number()
        ),
    amountInSTDUnit: Yup.array()
        .of(
            Yup.number()
        ),
    pricePerUnit: Yup.array()
        .of(
            Yup.number()
            .moreThan(0,"must be greater than 0")
        ),

});

interface FormValues {
    date: Date;
    ingredientTypeID: number[]
    amountInSTDUnit: number[]
    pricePerUnit: number[]
    expiredDate: Date[]
}

type FormikSubmitHandler<V> = (value: FormValues, actions: FormikActions<V>) => void;

const CreatePOFormBox = ({children}: FormBoxProps): JSX.Element => {

    const [ingredients,setIngredients] = useState<Ingredient[]>([]);
    const [value,setValue] = useState<Date>(new Date());
    const [ingredientTypeList,setIngredientTypeList] = useState<IngredientType[]>([{
        id : 1,
        name: "Milk",
        category: "Daily",  
        yieldRatio: 1,
        stdUnit: "ml",
        amountInSTDUnit: 1000,
        expireTimeDuration : 21 
    }]);

    useEffect( () => {
        getIngredientTypeList().then((data)=>{
            setIngredientTypeList(data)
        })
    },[])

    const handleSubmit: FormikSubmitHandler<FormValues>  = async (values, formikBag) => {
        formikBag.setSubmitting(true);
        console.log(JSON.stringify(values, null, 2));
        // await new Promise((resolve) => {
        //     setTimeout(resolve, 1000);
        // });
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/createMenu',
            data: values
        })
        console.log(response.data);
        formikBag.setSubmitting(false);
    };

    const handleDateChange = (value:Date) => {
        setValue(value)
    }

    const handleAddIngredient = (ingredient:Ingredient) => {
        setIngredients([
            ...ingredients,
            ingredient
        ])
    }

    return(
        <ThemeProvider theme={theme}>
            <Formik
                initialValues={{
                    date : new Date(),
                    ingredientTypeID: [1],
                    amountInSTDUnit: [0],
                    pricePerUnit: [0],
                    expiredDate: [new Date()]
                }}
                // validationSchema={ValidateIngredientTypeSchema}
                onSubmit={handleSubmit}
            >
                {({ values,isSubmitting}) => (
                    <Form>
                        <pre>{`${JSON.stringify(value, null, 2)} \n${isSubmitting}`}</pre>
                        <Box sx={style}>
                            <Typography sx={{fontSize : 25,marginBottom:3}} variant="h1" component="h1" gutterBottom>
                                please fill out Purchasing Order
                            </Typography>
                            <FormControl color='success' variant="standard">
                                <ResponsiveDatePickers value={value} handleChange={handleDateChange} label="Purchased Date" name="date" />
                                <ErrorMessage name="name">
                                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                                </ErrorMessage>
                            </FormControl>

                            <IngredientList ingredientTypeList={ingredientTypeList} ingredients={ingredients}/>

                            <AddIngredientInPO ingredientTypeList={ingredientTypeList} addIngredient={handleAddIngredient} />
                            
                            {/* {
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
                            } */}

                            <FormControl color='success' variant="standard" sx={{marginTop:3}}>
                                <InputLabel shrink htmlFor="totalDiscount">total discount</InputLabel>
                                <Field type="number" name="totalDiscount" as={BootstrapInput} />
                                <ErrorMessage name="totalDiscount">
                                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                                </ErrorMessage>
                            </FormControl>
                                
                            <Button disabled={isSubmitting} type='submit' sx={{width:100,marginTop:4}} variant="contained">Submit</Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </ThemeProvider>
    )
  };

export default CreatePOFormBox;