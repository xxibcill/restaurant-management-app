import * as React from 'react';
import {TextField ,Stack ,InputLabel} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type ResponsiveDatePickersProps = {
  name: string
  value: Date
  label : string
  handleChange: (value:Date) => void
}


const ResponsiveDatePickers = ({name,value,label,handleChange}:ResponsiveDatePickersProps) => {
  // const [value, setValue] = React.useState<unknown>(new Date());
  
  // const handleChange = (value: string | null, keyboardInputValue?: string | undefined) => {
    //   console.log(value);
    //   console.log(keyboardInputValue);
    //   setValue(value);
    // }
    
  const handleDateChange = (value: Date | null, keyboardInputValue?: string | undefined) => {
    if(value instanceof Date){
      handleChange(value)
    }
  }

  return (
    <LocalizationProvider sx={{marginTop:30}} dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <InputLabel  shrink htmlFor="name">{label}</InputLabel>
        <DatePicker
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField 
              {...params}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default ResponsiveDatePickers;
