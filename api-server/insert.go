package main

import (
	"database/sql"
	"log"
)

func insertIngredientType(sqliteDatabase *sql.DB, name string, category string, yieldRatio float32, unitOfMeasure string, STDUnit string, amountInSTDUnit float32, expireTimeDuration int16) {
	insertQueryL := `INSERT INTO IngredientType VALUES(Null,?,?,?,?,?,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(name, category, yieldRatio, unitOfMeasure, STDUnit, amountInSTDUnit, expireTimeDuration)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func insertIngredient(sqliteDatabase *sql.DB, ingredientType int32, pricePerUnit int32, amount int, accuiredDate string, expiredDate string) {
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

func insertMenu(sqliteDatabase *sql.DB, name string, salePrice int32) {
	insertQueryL := `INSERT INTO Menu VALUES(Null,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(name, salePrice)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func insertIngredientUsedInMenu(sqliteDatabase *sql.DB, ingredient int32, amount float32, menu int32) {
	insertQueryL := `INSERT INTO IngredientUsedInMenu VALUES(Null,?,?,?);`
	statement, err := sqliteDatabase.Prepare(insertQueryL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(ingredient, amount, menu)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func insertMenuInOrder(sqliteDatabase *sql.DB, menu int32, date string, discount float32, orderHash string) {
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
