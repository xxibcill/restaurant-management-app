import React from 'react'
import Button from '@mui/material/Button';
import FormBox from './FormBox';

type FormBoxProps = {
    children?: JSX.Element|JSX.Element[]
};
  
const ForTestComponent = ({children}: FormBoxProps): JSX.Element => {

    return(
        <div className='testComponent'>
            <FormBox>
                <Button variant="contained">Hello World</Button>
            </FormBox>
        </div>
    );
  };

export default ForTestComponent;