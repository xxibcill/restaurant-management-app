import React from 'react'
import {Button, TextField, MenuItem, Box} from '@mui/material';
import FormBox from './FormBox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Demo from './Demo'
import { orange } from '@mui/material/colors';
import TestFormik from "./testFormik"
import { FormikErr } from './FormikErr';

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
          <FormBox></FormBox>
          {/* <TestFormik/> */}
          {/* <FormikErr/> */}
        </Box>
    );
  };

export default ForTestComponent;