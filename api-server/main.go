package main

import (
	"database/sql"
	"encoding/json"
	"fmt"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

func getDBInstance() *sql.DB {
	sqliteDatabase, _ := sql.Open("sqlite3", "../restuarant.db") // Open the created SQLite File
	return sqliteDatabase
}

func closeDBInstance(sqliteDatabase *sql.DB) {
	sqliteDatabase.Close() // Closing the database
}

func main() {

	// // init db instance
	sqliteDatabase := getDBInstance()
	defer closeDBInstance(sqliteDatabase)

	// insertExample(sqliteDatabase)
	// s := getMenuInOrderFromID(sqliteDatabase, 1)
	// fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)

	Data := []byte(`{
	    "name": "Capuchino",
	    "ingredient": [
			{
				"name" : "Milk",
				"amount" : 100
			},
			{
				"name" : "Condense Milk",
				"amount" : 40
			},
			{
				"name" : "Syrup",
				"amount" : 20
			}
		],
	    "salePrice": 65.0,
	    "timestamp": "2022-06-01T16:45:59.927Z"
	}`)
	createMenu(sqliteDatabase, Data)
}

func createMenu(sqliteDatabase *sql.DB, jsonData []byte) {
	// defining a struct instance
	var menu CreateMenuRequestBody

	// decoding country1 struct
	// from json format
	err := json.Unmarshal(jsonData, &menu)

	if err != nil {

		// if error is not nil
		// print error
		fmt.Println(err)
	}

	fmt.Printf("%v", len(menu.Ingredient))

	insertMenu(sqliteDatabase, menu.Name, menu.SalePrice)

	menuid := getMenuIDFromName(sqliteDatabase, menu.Name)

	for i := 0; i < len(menu.Ingredient); i++ {
		ingredientTypeID := getIngredientTypeIDFromName(sqliteDatabase, menu.Ingredient[i].Name)
		insertIngredientUsedInMenu(sqliteDatabase, ingredientTypeID, float32(menu.Ingredient[i].Amount), menuid)
	}

}

func insertExample(sqliteDatabase *sql.DB) {
	// insert example
	// var name string = "Blue Sky Syrup"
	// var category string = "Syrup"
	// var yieldRatio float32 = 1.0
	// var unitOfMeasure string = "bottle"
	// var STDUnit string = "ml"
	// var amountInSTDUnit float32 = 1000.0
	// var expireTimeDuration int16 = 90

	// insertIngredientType(name, category, yieldRatio, unitOfMeasure, STDUnit, amountInSTDUnit, expireTimeDuration)

	// insertIngredient(ingredientType int32, pricePerUnit int32, amount int, accuiredDate string, expiredDate string)
	// insertIngredient(sqliteDatabase, 1, 350, 1, "2022-06-01T09:19:43.454Z", "2022-08-01T09:19:43.454Z")

	// insertMenu(sqliteDatabase *sql.DB, name string, salePrice int32)
	// insertMenu(sqliteDatabase, "Thai Tea", 80.0)

	// insertIngredientUsedInMenu(sqliteDatabase *sql.DB, ingredient int32, amount float32, menu int32)
	// insertIngredientUsedInMenu(sqliteDatabase, 3, 30.0, 2)

	// insertMenuInOrder(sqliteDatabase *sql.DB, menu int32, date string, discount float32, orderHash string)
	insertMenuInOrder(sqliteDatabase, 2, "2022-06-01T09:19:43.454Z", 0.0, "494nsng")
}
