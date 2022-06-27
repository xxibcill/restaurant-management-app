export interface IngredientType {
    id: number
    name: string  
    category: string  
    yieldRatio: number 
    stdUnit: string  
    amountInSTDUnit: number 
    expireTimeDuration : number   
}

export interface IngredientInMenuForm {
    ingredientType: IngredientType | {}
    amount: string
}

export interface Ingredient {
	ingredientType:   number 
	pricePerUnit:   number 
	amountInSTDUnit: number
	accuiredDate?:   Date 
	expiredDate:    Date
}