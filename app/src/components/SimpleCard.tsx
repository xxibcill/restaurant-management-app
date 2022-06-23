import { Card, CardContent, Typography } from '@mui/material';

type CardProps = {
    width?: string
}

const SimpleCard = ({width='250px'}:CardProps) => (
    <Card variant="outlined" sx={{width:width, height: 'auto',p:2 }} >
        <CardContent>
            <Typography
                color="textPrimary"
                gutterBottom
                variant="h3"
                sx={{fontSize:'25px'}}
            >
                Ingredient Amount
            </Typography>
            <Typography
                color="textSecondary"
                variant="h4"
                align='right'
                sx={{mt:5,fontSize:'50px'}}
            >
                24
            </Typography>
        </CardContent>
    </Card>
);

export default SimpleCard;
