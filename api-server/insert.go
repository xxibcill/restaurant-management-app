package main

import (
	"log"
)

func insertIngredientType(ingredient IngredientTypeRequestBody) (bool, error) {
	insertQueryL := `INSERT INTO IngredientType VALUES(Null,?,?,?,?,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		return false, err
	}
	_, err = statement.Exec(
		ingredient.Name,
		ingredient.Category,
		ingredient.YieldRatio,
		ingredient.STDUnit,
		ingredient.AmountInSTDUnit,
		ingredient.ExpireTimeDuration)
	if err != nil {
		return false, err
	}
	return true, nil
}

func insertIngredient(ingredient Ingredient, accuiredDate string) (bool, error) {
	insertQueryL := `INSERT INTO Ingredient VALUES(Null,?,?,?,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
		return false, err
	}
	_, err = statement.Exec(ingredient.ingredientType, ingredient.pricePerUnit, ingredient.amount, accuiredDate, ingredient.expiredDate)
	if err != nil {
		log.Fatalln(err.Error())
		return false, err
	}
	return true, nil
}

func insertIngredientViaRequest(ingredient IngredientRequestBody, accuiredDate string) (bool, error) {
	insertQueryL := `INSERT INTO Ingredient VALUES(Null,?,?,?,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
		return false, err
	}
	_, err = statement.Exec(ingredient.IngredientType, ingredient.PricePerUnit, ingredient.AmountInSTDUnit, accuiredDate, ingredient.ExpiredDate)
	if err != nil {
		log.Fatalln(err.Error())
		return false, err
	}
	return true, nil
}

func insertMenu(name string, salePrice float32) (bool, error) {
	insertQueryL := `INSERT INTO Menu VALUES(Null,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
		return false, err
	}
	_, err = statement.Exec(name, salePrice)
	if err != nil {
		log.Fatalln(err.Error())
		return false, err
	}
	return true, nil
}

func insertIngredientUsedInMenu(ingredient int32, amount float32, menu int32) (bool, error) {
	insertQueryL := `INSERT INTO IngredientUsedInMenu VALUES(Null,?,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
		return false, err
	}
	_, err = statement.Exec(ingredient, amount, menu)
	if err != nil {
		log.Fatalln(err.Error())
		return false, err
	}
	return true, nil
}

func insertMenuInOrder(menu int32, date string, discount float32, orderHash string) {
	insertQueryL := `INSERT INTO MenuInOrder VALUES(Null,?,?,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(menu, date, discount, orderHash)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func insertPurchaseOrder(hash string, date string, discount float32, totalPrice float32) (bool, error) {
	insertQueryL := `INSERT INTO PurchaseOrder VALUES(?,?,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
		return false, err
	}
	_, err = statement.Exec(hash, date, discount, totalPrice)
	if err != nil {
		log.Fatalln(err.Error())
		return false, err
	}
	return true, nil
}
