import {useEffect ,useState} from 'react';
import {Box} from '@mui/material';
import IngredientList from './IngredientList'
import { Ingredient ,IngredientType } from './../global/types';
import { getIngredientTypeList } from "./utils"

const ingredients:Ingredient[] = [
    {
        ingredientType: 0,
        pricePerUnit: 0,
        amountInSTDUnit: 0,
        accuiredDate: new Date(),
        expiredDate: new Date() 
    }
]

const TestList = () => {

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

    return(
        <Box  sx={{ width: '100%'}}>
            <IngredientList ingredientTypeList={ingredientTypeList} ingredients={ingredients}/>
        </Box>
    )
}

export default TestList;