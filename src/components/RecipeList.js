import React, { Component } from "react";

class RecipeList extends Component {
  state = {
    recipes: [],
    recipeById: "",
  };

  componentDidMount() {
    this.setState({ recipes: this.props.recipes });
    this.setState({ recipeById: this.props.recipeById });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recipes !== this.props.recipes) {
      this.setState({ recipes: this.props.recipes });
    }
    if (prevProps.recipeById !== this.props.recipeById) {
      this.setState({ recipeById: this.props.recipeById });
    }
    console.log(this.state.recipeById)
  }

  handleSelect = (e) => {
    const typeOfMeal = e.target.value;
    this.props.getAllRecipes(typeOfMeal);
  };

  handleOnClick = (e) => {
    const recipeName = e.target.value;
    let recipesCopy = [...this.state.recipes];
    const recipeObj = recipesCopy.filter((recipe) => {
      return recipe.name === recipeName;
    });
    const recipeId = recipeObj[0]._id;
    this.props.getRecipeById(recipeId);
  };

  render() {
    return (
      <div>
        <div className="search-meal">
          <label forhtml="meal">Advanced Search</label>
          <select id="meal" onChange={this.handleSelect}>
            <option value="all">Get All</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className="recipe-container">
          {this.state.recipes.map((oneRecipe) => {
            return (
              <div key={oneRecipe._id}>
                {" "}
                {oneRecipe.name}
                <button value={oneRecipe.name} onClick={this.handleOnClick}>
                  OK
                </button>
              </div>
            );
          })}
        </div>
        <div style={{ backgroundColor: "green", height: "200px" }}>
          <h1>MENU</h1>
        </div>
      </div>
    );
  }
}

export default RecipeList;
