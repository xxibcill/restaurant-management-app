import React , {useState ,useEffect} from "react";
import { getIngredientTypeList } from "../utils"
import { IngredientType } from './../../global/types';

type IngredientTypeProviderProps = { children: React.ReactNode };

const ingredientTypeListContext = React.createContext<IngredientType[]>([]);

export function IngredientTypeProvider({ children }: IngredientTypeProviderProps) {
    const [ingredientTypeList,setIngredientTypeList] = useState<IngredientType[]>([{
        id : 1,
        name: "Milk",
        category: "Daily",  
        yieldRatio: 1,
        stdUnit: "ml",
        amountInSTDUnit: 1000,
        expireTimeDuration : 21 
    }]);

    useEffect( () => {
        getIngredientTypeList().then((data)=>{
            setIngredientTypeList(data)
        })
    },[])

  return (
    <ingredientTypeListContext.Provider value={ingredientTypeList}>
        {children}
    </ingredientTypeListContext.Provider>
  )
}

export function useIngredientTypeList() {
    const context = React.useContext(ingredientTypeListContext);
    if (!context) {
      throw new Error(`useCluster must be used within a ClusterProvider`);
    }
    return context;
}