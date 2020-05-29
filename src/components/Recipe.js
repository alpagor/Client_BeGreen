import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link } from "react-router-dom";


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

//snapshotwill be used to style component when dragged
class Recipe extends Component {
  state = {
    show: false,
    recipeById: {},
  };

  getRecipeDetails = (recipeId) => {
    axios
      .get(process.env.REACT_APP_API_URL + `/api/recipe/${recipeId}`)
      .then((response) => {
        const recipeById = response.data;
        this.setState({ recipeById: recipeById });
      })
      .catch((err) => console.log(err));
  };

  handleClick = (e) => {
    const recipeId = e;
    this.getRecipeDetails(recipeId);
  };

  render() {
    const recipe = this.state.recipeById;

    // MODAL BOOTSTRAP

    const handleClose = () => this.setState({ show: false });
    const handleShow = () => {
      this.setState({ show: true }); // the modal is shown on click
      
    };

    return (
      <div>
        <Draggable
          draggableId={this.props.recipe._id}
          index={this.props.index}
        >
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps} //properties of the obj provided apllied to the dragable component
              {...provided.dragHandleProps} //control the draggin of the entire dragable  = recipe
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <Link
                onClick={() => {
                  handleShow()
                  this.handleClick(this.props.recipe._id)
                  }}
              >
                {this.props.recipe.name}
              </Link>
            </Container>
          )}
        </Draggable>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title className="recipe-title">{recipe.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={recipe.img} alt="Recipe" />
            <div className="cook-info">
              <p>Cooking time: {recipe.cooktime}</p>
              <p>Preparation time: {recipe.preptime}</p>
              <p>Servings: {recipe.servings}</p>
              <p>Protein: {recipe.protein}g</p>
            </div>
            <div className="cooking-array">
              <h4>Ingredients:</h4>
              <ul>
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient) => {
                    return <li>- {ingredient}</li>;
                  })}
              </ul>
              <h4>Instructions:</h4>
              <ol className="instructions-recipe">
                {recipe.instructions &&
                  recipe.instructions.map((instruction) => {
                    return <li>{instruction}</li>;
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

export default Recipe;
