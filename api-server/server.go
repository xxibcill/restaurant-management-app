package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func postCreatePO(c *gin.Context) {
	var po PurchaseOrderRequestBody
	e := c.BindJSON(&po)
	if e != nil {
		fmt.Println(e)
	}

	c.JSON(http.StatusOK, gin.H{"PO": po})

	// menuid := getMenuIDFromName(sqliteDatabase, menu.Name)
	// if menuid != 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Menu already existed"})
	// } else {
	// 	success, err := insertMenu(menu.Name, menu.SalePrice)

	// 	menuid = getMenuIDFromName(sqliteDatabase, menu.Name)

	// 	fmt.Printf("%v", len(menu.IngredientID))

	// 	for i := 0; i < len(menu.IngredientID); i++ {
	// 		success, err = insertIngredientUsedInMenu(menu.IngredientID[i], menu.AmountInSTDUnit[i], menuid)
	// 	}

	// 	if success {
	// 		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	// 	} else {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	// 	}
	// }
}

func postCreateMenu(c *gin.Context) {
	var menu createMenuRequestBody
	e := c.BindJSON(&menu)
	if e != nil {
		fmt.Println(e)
	}

	menuid := getMenuIDFromName(sqliteDatabase, menu.Name)
	if menuid != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Menu already existed"})
	} else {
		success, err := insertMenu(menu.Name, menu.SalePrice)

		menuid = getMenuIDFromName(sqliteDatabase, menu.Name)

		fmt.Printf("%v", len(menu.IngredientID))

		for i := 0; i < len(menu.IngredientID); i++ {
			success, err = insertIngredientUsedInMenu(menu.IngredientID[i], menu.AmountInSTDUnit[i], menuid)
		}

		if success {
			c.JSON(http.StatusOK, gin.H{"message": "Success"})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
		}
	}
}

func getIngredientType(c *gin.Context) {

	result, err := getAllIngredientType()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"ingredientType": result,
		})
	}
}

func postCreateIngredientType(c *gin.Context) {
	var ingredient IngredientTypeRequestBody
	e := c.BindJSON(&ingredient)
	if e != nil {
		fmt.Println(e)
	}

	success, err := insertIngredientType(ingredient)

	if success {
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}
