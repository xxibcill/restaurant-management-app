package main

import (
	"database/sql"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

func getDBInstance() *sql.DB {
	sqliteDatabase, _ := sql.Open("sqlite3", "../restuarant.db") // Open the created SQLite File
	return sqliteDatabase
}

func closeDBInstance(sqliteDatabase *sql.DB) {
	sqliteDatabase.Close() // Closing the database
}

// global variable
var sqliteDatabase *sql.DB

func main() {
	// // init db instance
	sqliteDatabase = getDBInstance()
	defer closeDBInstance(sqliteDatabase)

	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/getIngredientType", getIngredientType)
	r.POST("/createIngredient", postCreateIngredientType)
	r.POST("/createMenu", postCreateMenu)

	r.POST("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")

	// ingredientTYpe, err := getAllIngredientType()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Printf("len=%d cap=%d %v\n", len(ingredientTYpe), cap(ingredientTYpe), ingredientTYpe)
	// insertExample(sqliteDatabase)
	// s := getIngredientTypeFromID(sqliteDatabase, 2)
	// fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}

func insertExample(sqliteDatabase *sql.DB) {
	// insert example

	_, err := insertIngredientType(IngredientTypeRequestBody{
		Name:               "test",
		Category:           "test",
		YieldRatio:         1,
		AmountInSTDUnit:    1,
		STDUnit:            "ml",
		ExpireTimeDuration: 1,
	})
	if err != nil {
		fmt.Printf("%v", err)
	}

	// insertIngredient(ingredientType int32, pricePerUnit int32, amount int, accuiredDate string, expiredDate string)
	// insertIngredient(sqliteDatabase, 1, 350, 1, "2022-06-01T09:19:43.454Z", "2022-08-01T09:19:43.454Z")

	// insertMenu(sqliteDatabase *sql.DB, name string, salePrice int32)
	// insertMenu(sqliteDatabase, "Thai Tea", 80.0)

	// insertIngredientUsedInMenu(sqliteDatabase *sql.DB, ingredient int32, amount float32, menu int32)
	// insertIngredientUsedInMenu(sqliteDatabase, 3, 30.0, 2)

	// insertMenuInOrder(sqliteDatabase *sql.DB, menu int32, date string, discount float32, orderHash string)
	// insertMenuInOrder(sqliteDatabase, 2, "2022-06-01T09:19:43.454Z", 0.0, "494nsng")
}
