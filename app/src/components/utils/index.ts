import axios from 'axios'

export  const getIngredientTypeList = async () => {
    const response = await axios({
        method: 'get',
        url: 'http://localhost:8080/getIngredientType',
    })
    console.log(response.data.ingredientType);
    return response.data.ingredientType;
}