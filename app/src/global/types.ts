export interface IngredientType {
    id: number
    name: string  
    category: string  
    yieldRatio: number 
    stdUnit: string  
    amountInSTDUnit: number 
    expireTimeDuration : number   
}
export interface ingredientInMenuForm {
    ingredientType: IngredientType | {}
    amount: string
}