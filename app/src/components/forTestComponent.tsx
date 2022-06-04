import React from 'react'
import {Button, TextField, MenuItem, Box} from '@mui/material';
import FormBox from './FormBox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Demo from './Demo'
import { orange } from '@mui/material/colors';

type FormBoxProps = {
    children?: JSX.Element|JSX.Element[]
};

const rootBoxStyle = {
    width: "100vw",
    height: "100vh",
    bgolor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

  
const ForTestComponent = ({children}: FormBoxProps): JSX.Element => {

    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    const currencies = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ];

    return(
        <Box sx={rootBoxStyle}>
            <FormBox></FormBox>
            {/* </FormBox>
            <TextField 
                id="name-field" 
                label="Name" 
                variant="outlined"
                sx={{
                    width: 300,
                    color: "#463243"
                }}
                
            />
            <TextField
                id="ingredient-select"
                select
                label="Select"
                value={currency}
                onChange={handleChange}
                helperText="Please select your currency"
                sx={{m:2}}
            >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <Button sx={{width:100}} variant="contained">Submit</Button> */}
        </Box>
    );
  };

export default ForTestComponent;