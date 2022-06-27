import React from 'react'
import {Button, TextField, MenuItem, Box} from '@mui/material';
import CreateIngredientTypeFormBox from './CreateIngredientTypeFormBox';
import AddIngredientInPO from './AddIngredientInPO'
import CreatePOFormBox from './CreatePOFormBox';
import CreateMenuFormBox from './CreateMenuFormBox';

type FormBoxProps = {
    children?: JSX.Element|JSX.Element[]
};

const rootBoxStyle = {
    width: "100%",
    height: "100%",
    bgolor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

  
const ForTestComponent = ({children}: FormBoxProps): JSX.Element => {
    return(
      <Box sx={rootBoxStyle}>
        {/* <CreateIngredientTypeFormBox></CreateIngredientTypeFormBox> */}
        {/* <CreatePOFormBox></CreatePOFormBox> */}
        <CreateMenuFormBox/>
        {/* <AddIngredientInPO/> */}
      </Box>
    );
};

export default ForTestComponent;