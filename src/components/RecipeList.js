import React, { Component } from "react";

class RecipeList extends Component {
  state = {
    recipes: [],
  };

  componentDidMount() {
    this.setState({ recipes: this.props.recipes });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recipes !== this.props.recipes) {
      this.setState({ recipes: this.props.recipes });
    }
  }

  handleSelect = (e) => {
    const typeOfMeal = e.target.value;
    this.props.getAllRecipes(typeOfMeal);
    // axios.post(
    //   'http://localhost:5000/api/projects',
    //   { title: this.state.title, description: this.state.description }
    // )
    //   .then(() => {
    //     this.setState({ title: '', description: '' })
    //     this.props.getAllProjects();
    //     // Triggers the method to get all projects
    //     // which refreshes the ProjectsPage
    //   })
    //   .catch((err) => console.log(err));
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
            return <div key={oneRecipe._id}> {oneRecipe.name} </div>;
          })}
        </div>
      </div>
    );
  }
}

export default RecipeList;
