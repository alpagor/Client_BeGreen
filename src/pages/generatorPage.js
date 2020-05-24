import React, { Component } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";

import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

class GeneratorPage extends Component {
  state = {
    recipes: [], // 1
    recipeById: {},
    menu: [],
  };

  componentDidMount() {
    // 3
    this.getAllRecipes();
    this.getRecipeById();
  }

  getAllRecipes = (typeString) => {
    const query = typeString ? `?type=${typeString}` : "";

    const requestURL = `http://localhost:5000/api/recipe${query}`;

    axios
      .get(requestURL)
      .then((response) => {
        const recipe = response.data;
        this.setState({ recipes: recipe });
      })
      .catch((err) => console.log(err));
  };

  getRecipeById = (recipeId) => {
    if (this.state.menu.length < 3) {
      axios
        .get(`http://localhost:5000/api/recipe/${recipeId}`)
        .then((response) => {
          const recipe = response.data;
          let menuArray = [...this.state.menu, recipe];

          let recipeIndex;
          this.state.recipes.forEach((recipe, index) => {
            if (recipe._id === recipeId) {
              recipeIndex = index;
            }
          });
          let recipesArray = [...this.state.recipes];
          recipesArray.splice(recipeIndex, 1);
          this.setState({
            recipeById: recipe,
            menu: menuArray,
            recipes: recipesArray,
          });
        })
        .catch((err) => console.log(err));
    } else {
      alert("You can only put 3 recipes!");
    }
  };

  

  render() {
    // 2
    return (
      <div>
        <Navbar />

        <RecipeList
          recipes={this.state.recipes}
          getAllRecipes={this.getAllRecipes}
          getRecipeById={this.getRecipeById}
          recipeById={this.state.recipeById}
        />
        <Menu menu={this.state.menu} getRecipeById={this.removeFromMenu} />
      </div>
    );
  }
}

export default GeneratorPage;
