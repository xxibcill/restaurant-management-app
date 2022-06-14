package main

import (
	"database/sql"
	"fmt"
	"log"
)

func getAllIngredientType() ([]IngredientType, error) {
	queryString := "SELECT * FROM IngredientType"
	row, err := sqliteDatabase.Query(queryString)
	if err != nil {
		return nil, err
	}
	defer row.Close()

	result := []IngredientType{}

	for row.Next() { // Iterate and fetch the records from result cursor
		var id int32
		var name string
		var category string
		var yieldRatio float32
		var STDUnit string
		var amountInSTDUnit float32
		var expireTimeDuration int16
		row.Scan(&id, &name, &category, &yieldRatio, &STDUnit, &amountInSTDUnit, &expireTimeDuration)
		ingredient := IngredientType{id, name, category, yieldRatio, STDUnit, amountInSTDUnit, expireTimeDuration}
		result = append(result, ingredient)
	}

	return result, nil
}

func getIngredientTypeFromID(db *sql.DB, id int32) []IngredientType {
	queryString := fmt.Sprintf("SELECT * FROM IngredientType Where id = %d", id)
	row, err := db.Query(queryString)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	result := []IngredientType{}

	for row.Next() { // Iterate and fetch the records from result cursor
		var id int32
		var name string
		var category string
		var yieldRatio float32
		var STDUnit string
		var amountInSTDUnit float32
		var expireTimeDuration int16
		row.Scan(&id, &name, &category, &yieldRatio, &STDUnit, &amountInSTDUnit, &expireTimeDuration)
		ingredient := IngredientType{id, name, category, yieldRatio, STDUnit, amountInSTDUnit, expireTimeDuration}
		result = append(result, ingredient)
	}

	return result
}

func getIngredientFromID(db *sql.DB, id int32) []Ingredient {
	queryString := fmt.Sprintf("SELECT * FROM Ingredient Where id = %d", id)
	row, err := db.Query(queryString)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	result := []Ingredient{}

	for row.Next() { // Iterate and fetch the records from result cursor
		var id int32
		var ingredientType int32
		var pricePerUnit int32
		var amount int32
		var accuiredDate string
		var expiredDate string
		var poHash string
		row.Scan(&id, &ingredientType, &pricePerUnit, &amount, &accuiredDate, &expiredDate, &poHash)
		ingredient := Ingredient{id, ingredientType, pricePerUnit, amount, accuiredDate, expiredDate, poHash}
		result = append(result, ingredient)
	}

	return result
}

func getMenuFromID(db *sql.DB, id int32) []Menu {
	queryString := fmt.Sprintf("SELECT * FROM Menu Where id = %d", id)
	row, err := db.Query(queryString)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	result := []Menu{}

	for row.Next() { // Iterate and fetch the records from result cursor
		var id int32
		var name string
		var salePrice float32
		row.Scan(&id, &name, &salePrice)
		menu := Menu{id, name, salePrice}
		result = append(result, menu)
	}

	return result
}

func getIngredientUsedInMenuFromID(db *sql.DB, id int32) []IngredientUsedInMenu {
	queryString := fmt.Sprintf("SELECT * FROM IngredientUsedInMenu Where id = %d", id)
	row, err := db.Query(queryString)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	result := []IngredientUsedInMenu{}

	for row.Next() { // Iterate and fetch the records from result cursor
		var id int32
		var ingredient int32
		var amount float32
		var menu int32
		row.Scan(&id, &ingredient, &amount, &menu)
		ingredientUsedInMenu := IngredientUsedInMenu{id, ingredient, amount, menu}
		result = append(result, ingredientUsedInMenu)
	}

	return result
}

func getMenuInOrderFromID(db *sql.DB, id int32) []MenuInOrder {
	queryString := fmt.Sprintf("SELECT * FROM MenuInOrder Where id = %d", id)
	row, err := db.Query(queryString)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	result := []MenuInOrder{}

	for row.Next() { // Iterate and fetch the records from result cursor
		var id int32
		var menu int32
		var date string
		var discount float32
		var orderHash string
		row.Scan(&id, &menu, &date, &discount, &orderHash)
		menuInOrder := MenuInOrder{id, menu, date, discount, orderHash}
		result = append(result, menuInOrder)
	}

	return result
}

func getMenuIDFromName(db *sql.DB, name string) (id int32) {
	queryString := fmt.Sprintf("SELECT id FROM Menu Where name = '%s'", name)
	row, err := db.Query(queryString)
	if err != nil {
		log.Fatal(err)
		return 0
	}
	defer row.Close()
	row.Next()
	row.Scan(&id)
	return id
}

func getIngredientTypeIDFromName(db *sql.DB, name string) (id int32) {
	queryString := fmt.Sprintf("SELECT id FROM IngredientType Where name = '%s'", name)
	row, err := db.Query(queryString)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()
	row.Next()
	row.Scan(&id)
	return id
}

func getPurchaseOrderFromHash(hash string) (po PurchaseOrder) {
	queryString := fmt.Sprintf("SELECT * FROM PurchaseOrder Where hash = '%s'", hash)
	row, err := sqliteDatabase.Query(queryString)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()
	row.Next()

	var hashOut string
	var date string
	var discount float32
	var totalPrice float32

	row.Scan(&hashOut, &date, &discount, &totalPrice)
	po = PurchaseOrder{hashOut, date, discount, totalPrice}
	row.Scan(&po)
	return po
}
