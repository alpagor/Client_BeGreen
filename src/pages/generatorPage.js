import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import './generatorPage.css'
//import ChatPage from "./chatPage"


import DnDcontroler from "./../components/DnDcontroler";

class GeneratorPage extends Component {
  state = {
    recipes: [], // 1
    recipeById: {},
    menu: [],
    // menusList: [],
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

  handleSelect = (e) => {
    const typeOfMeal = e.target.value;
    this.getAllRecipes(typeOfMeal);
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
          <label forhtml="meal">Advanced Search</label>
            <select id="meal" onChange={this.handleSelect}>
            <option value="all">Get All</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        <DnDcontroler 
          recipes={this.state.recipes}
          getAllRecipes={this.getAllRecipes}
        />
        {/* <div>
          <ChatPage />
        </div>
         */}

      </div>
    );
  }
}

export default GeneratorPage;
