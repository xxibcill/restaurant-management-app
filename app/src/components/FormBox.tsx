import React ,{useState} from 'react'
import {FormControl ,FormHelperText ,Select ,MenuItem ,SelectChangeEvent ,Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { orange } from '@mui/material/colors';
import axios from 'axios'

type FormBoxProps = {
    children?: JSX.Element|JSX.Element[]
}; /* use `interface` if exporting so that consumers can extend */
  
// declare module '@mui/material/styles' {
//     interface Theme {
//       status: {
//         danger: string;
//       };
//     }
//     // allow configuration using `createTheme`
//     interface ThemeOptions {
//       status?: {
//         danger?: string;
//       };
//     }
//   }

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
    width: 600,
    height: 600,
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxShadow: 3,
    p: 5
} as const;

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

  // Easiest way to declare a Function Component; return type is inferred.
const FormBox = ({children}: FormBoxProps): JSX.Element => {

    const [unitSelected, setUnit] = useState('ml');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [yieldRatio, setYieldRatio] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [etd, setETD] = useState<number>(0);

    const handleUnitSelect = (event: SelectChangeEvent) => {
        setUnit(event.target.value as string);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }; 

    const handleYieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYieldRatio(Number(event.target.value));
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const handleETDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setETD(Number(event.target.value));
    };

    

    const  handleSubmitClick = async () => {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/createIngredient',
            data: {
                "name" : name,
                "category" : category,
                "yeildRatio" : yieldRatio,
                "stdUnit" : unitSelected,
                "amountInSTDUnit" : amount,
                "expireTimeDuration" : etd
            }
        })
        console.log(response.data);
        
    };

    return(
        <Box sx={style}>
            <ThemeProvider theme={theme}>

                <FormControl color='success' variant="standard">
                    <InputLabel shrink htmlFor="Name">Name</InputLabel>
                    <BootstrapInput id="Name" onChange={handleNameChange}/>
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>

                <FormControl variant="standard" sx={{marginTop:5}}>
                    <InputLabel shrink htmlFor="category">Category</InputLabel>
                    <BootstrapInput onChange={handleCategoryChange} id="category" />
                </FormControl>
                    
                <FormControl variant="standard" sx={{marginTop:5}}>
                    <InputLabel shrink htmlFor="yield">Yield</InputLabel>
                    <BootstrapInput onChange={handleYieldChange} id="yield" type='number' />
                </FormControl>

                <Box sx={{marginTop:5}}>
                    <FormControl variant="standard" >
                        <InputLabel shrink htmlFor="amount">
                        Amount
                        </InputLabel>
                        <BootstrapInput onChange={handleAmountChange} id="amount" type='number' />
                    </FormControl>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={unitSelected}
                        label="Age"
                        onChange={handleUnitSelect}
                        sx={{marginTop: 3,marginLeft: 3,height:40}}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                <FormControl variant="standard" sx={{marginTop:5}}>
                    <InputLabel shrink htmlFor="etd" >
                    Expire Time Duration
                    </InputLabel>
                    <BootstrapInput onChange={handleETDChange} id="etd" type='number' />
                    <FormHelperText id="etd-helper-text">How long this Ingredient last in Days</FormHelperText>
                </FormControl>

            </ThemeProvider>

            <Button onClick={handleSubmitClick} sx={{width:100,marginTop:4}} variant="contained">Submit</Button>
            
        </Box>
    )
  };

export default FormBox;