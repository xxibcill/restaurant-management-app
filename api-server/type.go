package main

type IngredientTypeRequestBody struct {
	Name               string  `json:"name"`
	Category           string  `json:"category"`
	YieldRatio         float32 `json:"yieldRatio"`
	STDUnit            string  `json:"stdUnit"`
	AmountInSTDUnit    float32 `json:"amountInSTDUnit"`
	ExpireTimeDuration int16   `json:"expireTimeDuration"`
}

type IngredientType struct {
	ID                 int32   `json:"id"`
	Name               string  `json:"name"`
	Category           string  `json:"category"`
	YieldRatio         float32 `json:"yieldRatio"`
	STDUnit            string  `json:"stdUnit"`
	AmountInSTDUnit    float32 `json:"amountInSTDUnit"`
	ExpireTimeDuration int16   `json:"expireTimeDuration"`
}

type createMenuRequestBody struct {
	Name            string    `json:"name"`
	SalePrice       float32   `json:"salePrice"`
	IngredientID    []int32   `json:"ingredientID"`
	AmountInSTDUnit []float32 `json:"amountInSTDUnit"`
}

type Ingredient struct {
	id             int32
	ingredientType int32
	pricePerUnit   int32
	amount         int32
	accuiredDate   string
	expiredDate    string
}

type Menu struct {
	id        int32
	name      string
	salePrice float32
}

type IngredientUsedInMenu struct {
	id         int32
	ingredient int32
	amount     float32
	menu       int32
}

type MenuInOrder struct {
	id        int32
	menu      int32
	date      string
	discount  float32
	orderHash string
}

type IngredientRequestBody struct {
	Name   string `json:"name"`
	Amount int32  `json:"amount"`
}

type CreateMenuRequestBody struct {
	Name       string                  `json:"name"`
	Ingredient []IngredientRequestBody `json:"ingredient"`
	SalePrice  float32                 `json:"salePrice"`
	Timestamp  string                  `json:"timestamp"`
}
