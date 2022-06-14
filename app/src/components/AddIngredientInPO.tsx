import { useState } from 'react';
import {Box ,Stack} from '@mui/material';
import {FormControl ,FormHelperText ,InputLabel ,MenuItem ,Select ,Button} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import BootstrapInput from './BootstrapInput';
import { styled } from '@mui/system';
import { IngredientType } from './../global/types';
import ResponsiveDatePickers from './ResponsiveDatePickers'
import {Ingredient} from '../global/types'

type AddIngredientInPOProps = {
  ingredientTypeList:IngredientType[]
  addIngredient: (ingredient:Ingredient) => void
}

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#D9D9D9",
  padding: theme.spacing(5),
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const AddIngredientInPO = ({addIngredient,ingredientTypeList}:AddIngredientInPOProps) => {

  const [ingredient,setIngredient] = useState<Ingredient>({
    ingredientType: 1,
    pricePerUnit: 0,
    amountInSTDUnit: 0,
    expiredDate: new Date() 
  });

  const handleIngredientTypeIDChange = (evt:SelectChangeEvent) => {
    setIngredient({
      ...ingredient,
      ingredientType: Number(evt.target.value) 
    });
  };

  const handlePriceChange = (evt:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setIngredient({
      ...ingredient,
      pricePerUnit: Number(evt.target.value) 
    });
  };

  const handleAmountChange = (evt:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setIngredient({
      ...ingredient,
      amountInSTDUnit: Number(evt.target.value) 
    });
  };

  const handleDateChange = (value:Date) => {
    setIngredient({
      ...ingredient,
      expiredDate: value
    });
  }

  const handleClickSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    addIngredient(ingredient)
  }

  return (
    <CustomBox>
      <Stack spacing={3}>
          <FormControl color='success' variant="standard">
            <InputLabel shrink htmlFor='ingredientTypeID'>Type</InputLabel>
            <Select
              name='ingredientTypeID' 
              sx={{marginTop: '5px'}}
              value={String(ingredient.ingredientType)}
              onChange={handleIngredientTypeIDChange}
            >
              {ingredientTypeList.map((option) => (
                  <MenuItem key={option.name} value={option.id}>
                      {option.name}
                  </MenuItem>
              ))}
            </Select>
        </FormControl>

        <FormControl color='success' variant="standard">
            <InputLabel shrink htmlFor='pricePerUnit'>Price</InputLabel>
            <BootstrapInput 
              type="text" 
              name='pricePerUnit'
              onChange={handlePriceChange}  />
        </FormControl>

        <FormControl color='success' variant="standard">
            <InputLabel shrink htmlFor='amountInSTDUnit'>Amount</InputLabel>
            <BootstrapInput 
              type="text" 
              name='amountInSTDUnit'
              onChange={handleAmountChange}  />
        </FormControl>

        <ResponsiveDatePickers value={ingredient.expiredDate} handleChange={handleDateChange} label="Expired Date" name='expiredDate' />

        <Box sx={{display:'flex',justifyContent:'center'}}>
          <Button onClick={handleClickSubmit} variant="contained">Add</Button>
        </Box>

      </Stack>
    </CustomBox>
  );
}

export default AddIngredientInPO;