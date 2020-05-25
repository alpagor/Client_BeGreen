import React, { Component } from "react";
import { withAuth } from './../lib/Auth';

import axios from "axios";
import RecipeList from "../components/RecipeList";

import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

import './generatorPage.css'

class GeneratorPage extends Component {
  state = {
    recipes: [], // 1
    recipeById: {},
    menu: [],
  };

  componentDidMount() {
    // 3
    this.getAllRecipes();
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
    console.log(recipeId, this.state.menu);
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

  handleOnClick = (e) => {
    const recipeId = e.target.value;
    this.getRecipeById(recipeId);
    console.log('CLICK')
  };

  render() {
    // 2
    return (
      <div>
        <Navbar />
        <div className='instructions'>
          <p>Here you can create your own menus.</p>
          <br/>
          <p>Just drag and drop a recipe!</p>
        </div>
          
        <div className="search-meal">
          <label forhtml="meal">Show:</label>
          <select id="meal" onChange={this.handleSelect}>
            <option value="all">All</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        <div className='dragNDrop'>
          <RecipeList
            recipes={this.state.recipes}
            getAllRecipes={this.getAllRecipes}
            getRecipeById={this.getRecipeById}
            recipeById={this.state.recipeById}
            addRecipeInMenu={this.addRecipeInMenu}
          />
          <Menu
            id="menu"
            menu={this.state.menu}
            getRecipeById={this.getRecipeById}
          />
        </div>
          
      </div>
    );
  }
}

export default withAuth(GeneratorPage);
