package main

type IngredientType struct {
	id                 int32
	name               string
	category           string
	yieldRatio         float32
	STDUnit            string
	amountInSTDUnit    float32
	expireTimeDuration int16
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
