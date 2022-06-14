import {useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Ingredient ,IngredientType } from './../global/types';
import {EditIcon ,DeleteIcon}  from './icon'

type IngredientListProps = {
    ingredientTypeList: IngredientType[]
    ingredients: Ingredient[]
}; 
  
const IngredientList = ({ ingredientTypeList ,ingredients }: IngredientListProps) => {

    return(
        <List sx={{ width: '100%'}}>
            {
                ingredients.map((ingredient,index) => (
                    <ListItem
                        key={index}
                        disableGutters
                    >
                        <ListItemText primary={`${index+1}.`} />
                        <ListItemText primary={`${ingredientTypeList[ingredient.ingredientType].name}`} />
                        <ListItemText primary={`${ingredient.amountInSTDUnit} ${ingredientTypeList[ingredient.ingredientType].stdUnit}`} />
                        {/* <IconButton aria-label="comment">
                            <EditIcon />
                        </IconButton> */}
                        <IconButton aria-label="comment">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))
            }
        </List>
    )
}

export default IngredientList;
