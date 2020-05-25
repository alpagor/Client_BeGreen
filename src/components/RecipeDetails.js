import React, { Component } from 'react';



class RecipeDetails extends Component {
    state = {

      name: "", 
      img: "", 
      preptime: "", 
      cooktime: "", 
      servings:"", 
      protein: "", 
      instruction:  "",
      ingredients: "",
      tags: [],
      type: []

    };

    
  
    componentDidMount() {
      this.getRecipebyId();
    }
  
    getRecipebyId = () => {
      axios
        .get(process.env.REACT_APP_API_URL + "/api/recipe/:recipeId", {
            
            name: this.state.name, 
            img: this.state.img, 
            preptime: this.state.preptime, 
            cooktime: this.state.cooktime, 
            servings:this.state.servings, 
            protein: this.state.protein, 
            instruction:  this.state.instruction,
            ingredients: this.state.ingredients,
            tags: this.state.tags,
            type: this.state.type
        
        })
        .then((response) => {
          const recipeById = response.data;
          this.setState({ recipes: recipeById });
        })
        .catch((err) => console.log(err));
    };

    


render(){
    return()
}



}