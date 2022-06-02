import React from 'react'
import Box from '@mui/material/Box';

type FormBoxProps = {
    children: JSX.Element|JSX.Element[]
}; /* use `interface` if exporting so that consumers can extend */
  
  // Easiest way to declare a Function Component; return type is inferred.
const FormBox = ({children}: FormBoxProps): JSX.Element => {

    return(
        <Box
            sx={{
                width: 300,
                height: 300,
                backgroundColor: 'primary.dark',
                '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            {children}
        </Box>
    )
  };

export default FormBox;