package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

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
