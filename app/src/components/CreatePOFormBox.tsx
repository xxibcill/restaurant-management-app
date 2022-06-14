import React ,{useEffect, useState} from 'react'
import {FormControl ,FormHelperText ,Button ,InputLabel ,Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { getIngredientTypeList , simpleHash } from "./utils"
import ResponsiveDatePickers from './ResponsiveDatePickers'
import AddIngredientInPO from './AddIngredientInPO';
import BootstrapInput from './BootstrapInput';
import {Ingredient,IngredientType} from '../global/types'
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

const CreatePOFormBox = ({children}: FormBoxProps): JSX.Element => {

    const [ingredients,setIngredients] = useState<Ingredient[]>([]);
    const [date,setDate] = useState<Date>(new Date());
    const [totalDiscount,setTotalDiscount] = useState<number>(0);
    const [ingredientTypeList,setIngredientTypeList] = useState<IngredientType[]>([{
        id : 1,
        name: "Milk",
        category: "Daily",  
        yieldRatio: 1,
        stdUnit: "ml",
        amountInSTDUnit: 1000,
        expireTimeDuration : 21 
    }]);
    
    const [isSubmitting,setIsSubmitting] = useState<boolean>(false);

    useEffect( () => {
        getIngredientTypeList().then((data)=>{
            setIngredientTypeList(data)
        })
    },[])

    const calculateTotalPrice = ():number => {
        let sum = 0;
        ingredients.forEach((item) => {sum = sum + (item.amountInSTDUnit*item.pricePerUnit)})
        return sum;
    }

    const preprocessRequestBody = () => {
        return ({
            hash: simpleHash(new Date().toISOString()),
            date: new Date().toISOString(),
            discount: totalDiscount,
            totalPrice: calculateTotalPrice(),
            ingredients
        })
    } 

    const handleSubmit = () => {
        console.log('submit');

        axios({
            method: 'post',
            url: 'http://localhost:8080/createPO',
            data: preprocessRequestBody()
        })
        .then((res)=>{
            console.log(res);
        })
    };

    const handleDateChange = (value:Date) => {
        setDate(value)
    }

    const handleDiscountChange = (evt:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTotalDiscount(Number(evt.target.value))
    }

    const handleAddIngredient = (ingredient:Ingredient) => {
        setIngredients([
            ...ingredients,
            ingredient
        ])
    }

    return(
        <ThemeProvider theme={theme}>
            <Box sx={style}>
                <Typography sx={{fontSize : 25,marginBottom:3}} variant="h1" component="h1" gutterBottom>
                    please fill out Purchasing Order
                </Typography>
                <FormControl color='success' variant="standard">
                    <ResponsiveDatePickers value={date} handleChange={handleDateChange} label="Purchased Date" name="date" />
                </FormControl>

                <IngredientList ingredientTypeList={ingredientTypeList} ingredients={ingredients}/>

                {/* <AddIngredientInPO ingredientTypeList={ingredientTypeList} addIngredient={handleAddIngredient} /> */}
                
                <FormControl color='success' variant="standard" sx={{marginTop:3}}>
                    <InputLabel shrink htmlFor="totalDiscount">total discount</InputLabel>
                    <BootstrapInput onChange={handleDiscountChange} type="number" name="totalDiscount" />
                </FormControl>
                    
                <Button onClick={handleSubmit} disabled={isSubmitting} sx={{width:100,marginTop:4}} variant="contained">Submit</Button>
            </Box>
        </ThemeProvider>
    )
  };

export default CreatePOFormBox;