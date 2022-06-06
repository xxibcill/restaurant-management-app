import React ,{useState} from 'react'
import {FormControl ,FormHelperText ,Select ,MenuItem ,Button ,InputBase ,InputLabel ,Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Unit from './Unit.js'
import BootstrapInput from './BootstrapInput';
import { IngredientType } from './../global/types';

type FormBoxProps = {
    index:number
    ingredientTypeList:IngredientType[]
    stdUnit:string
    children?: JSX.Element|JSX.Element[]
}; /* use `interface` if exporting so that consumers can extend */

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 500,
    m:2
};

  // Easiest way to declare a Function Component; return type is inferred.
const CreateMenuFormBox = ({index,ingredientTypeList,stdUnit}: FormBoxProps): JSX.Element => {

    return(
        <Box sx={style}>
            <Typography sx={{fontSize : 25,marginBottom:3}} variant="subtitle1" component="div">
                {index+1}.
            </Typography>

            <FormControl color='success' variant="standard">
                <InputLabel shrink htmlFor={`ingredientID[${index}]`}>Name</InputLabel>
                <Field
                    name={`ingredientID[${index}]`}
                    sx={{marginTop: 3,marginLeft: 3,height:40}}
                    defaultValue={1}
                    as={Select}
                >
                    {ingredientTypeList.map((option) => (
                        <MenuItem key={option.name} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Field>
                <ErrorMessage name={`ingredientID[${index}]`}>
                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                </ErrorMessage>
            </FormControl>

            <FormControl variant="standard" >
                <InputLabel shrink htmlFor={`amountInSTDUnit[${index}]`}>Amount</InputLabel>
                <Field type="number" name={`amountInSTDUnit[${index}]`} sx={{width:"100px"}} as={BootstrapInput} />
                <ErrorMessage name={`amountInSTDUnit[${index}]`}>
                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                </ErrorMessage>
            </FormControl>
            
            <Typography sx={{fontSize : 25,marginBottom:3}} variant="subtitle1" component="div">
                {stdUnit}
            </Typography>
        </Box>
    )
  };

export default CreateMenuFormBox;