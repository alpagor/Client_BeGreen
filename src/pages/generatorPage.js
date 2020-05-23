import React, { Component } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";

import Navbar from "../components/Navbar";

class GeneratorPage extends Component {
  state = {
    recipes: [], // 1
    recipeById: {},
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
    axios
      .get(`http://localhost:5000/api/recipe/${recipeId}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        const recipe = response.data;
        this.setState({ recipeById: recipe });
      })
      .catch((err) => console.log(err));
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
      </div>
    );
  }
}

export default GeneratorPage;
