import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class RecipeList extends Component {
  state = {
    show: false,
    recipeById: {},
  };

  getRecipeDetails = (recipeId) => {
    axios
      .get(`http://localhost:5000/api/recipe/${recipeId}`)
      .then((response) => {
        const recipeById = response.data;
        this.setState({ recipeById: recipeById });
      })
      .catch((err) => console.log(err));
  };

  handleSelect = (e) => {
    const typeOfMeal = e.target.value;
    this.props.getAllRecipes(typeOfMeal);
  };

 

  handleClick = (e) => {
    const recipeId = e;
    this.getRecipeDetails(recipeId);
  };


  render() {
    const recipe = this.state.recipeById;

    // MODAL BOOTSTRAP

    const handleClose = () => this.setState({ show: false });
    const handleShow = (value) => {
      this.setState({ show: true });
      this.handleClick(value);
    };

    return (
      <div>
        <div>
          {this.props.recipes.map((oneRecipe) => {
            return (
              <div 
              key={oneRecipe._id}
              >
                {" "}
                <Link
                  onClick={function () {
                    handleShow(oneRecipe._id);
                  }}
                >
                  {oneRecipe.name}
                </Link>
                <button value={oneRecipe._id} onClick={this.handleOnClick}>
                  OK
                </button>
              </div>
            );
          })}
        </div>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title className='recipe-title'>{recipe.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={recipe.img} alt="Recipe" />
            <div className="cook-info">
              <p>Cooking time: {recipe.cooktime}</p>
              <p>Preparation time: {recipe.preptime}</p>
              <p>Servings: {recipe.servings}</p>
              <p>Protein: {recipe.protein}g</p>
            </div>
            <div className='cooking-array'>
              <h4>Ingredients:</h4>
              <ul> 
                { recipe.ingredients &&
                  recipe.ingredients.map((ingredient) => {
                  
                  return <li>- {ingredient}</li>;
                })}
              </ul>
              <h4>Instructions:</h4>
              <ol className='instructions-recipe'>
                { recipe.instructions && recipe.instructions.map((instruction) => {
                  return <li>{instruction}</li>
                })}
              </ol>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default RecipeList;
