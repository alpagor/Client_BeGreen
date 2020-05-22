import React, { Component } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";

import Navbar from "../components/Navbar";

class GeneratorPage extends Component {
  state = {
    recipes: [], // 1
  };

  componentDidMount() {
    // 3
    this.getAllRecipes();
  }

  getAllRecipes = (typeString) => {
    const query = typeString ? `?type=${typeString}` : "" ;

    const requestURL = `http://localhost:5000/api/recipe${query}`;

    axios
      .get(requestURL)
      .then((response) => {
        const recipe = response.data;
        this.setState({ recipes: recipe });
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
        />
      </div>
    );
  }
}

export default GeneratorPage;
