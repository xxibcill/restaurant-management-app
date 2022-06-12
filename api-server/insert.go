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

func insertIngredient(ingredientType int32, pricePerUnit int32, amount int, accuiredDate string, expiredDate string) {
	insertQueryL := `INSERT INTO Ingredient VALUES(Null,?,?,?,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(ingredientType, pricePerUnit, amount, accuiredDate, expiredDate)
	if err != nil {
		log.Fatalln(err.Error())
	}
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
