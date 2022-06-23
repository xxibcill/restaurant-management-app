import SimpleCard from './SimpleCard'
import {Box} from '@mui/material';

const style = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height: '100vh'
}

const Dashboard = (): JSX.Element => {
    return(
        <Box sx={style} >
            <SimpleCard/>
        </Box>
    );
};

export default Dashboard;