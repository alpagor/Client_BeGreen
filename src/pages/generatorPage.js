import React, { Component } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import menuPage from "./menuPage";
import DnDcontroler from "./../components/DnDcontroler";

class GeneratorPage extends Component {
  state = {
    recipes: [], // 1
    recipeById: {},
    menu: [],
    menusList: [],
  };

  componentDidMount() {
    // 3
    this.getAllRecipes();
    //this.getRecipeById(); TODO
  }

  getAllRecipes = (typeString) => {
    const query = typeString ? `?type=${typeString}` : "";

    const requestURL = process.env.REACT_APP_API_URL + `/api/recipe${query}`;

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
        .get(process.env.REACT_APP_API_URL + `/api/recipe/${recipeId}`)
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
        <DnDcontroler 
          recipes={this.state.recipes}
          getAllRecipes={this.getAllRecipes}

        />
        {/* <RecipeList
          recipes={this.state.recipes}
          getAllRecipes={this.getAllRecipes}
          getRecipeById={this.getRecipeById}
          recipeById={this.state.recipeById}
        />
        <Menu menu={this.state.menu} getRecipeById={this.removeFromMenu} /> */}
      </div>
    );
  }
}

export default GeneratorPage;
