import React from 'react'
import {Button, TextField, MenuItem, Box} from '@mui/material';
import CreateIngredientTypeFormBox from './CreateIngredientTypeFormBox';
import Demo from './Demo'

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
    return(
      <Box sx={rootBoxStyle}>
        <CreateIngredientTypeFormBox></CreateIngredientTypeFormBox>
      </Box>
    );
  };

export default ForTestComponent;