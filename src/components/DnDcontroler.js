import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { Modal, Button } from "react-bootstrap";
import Column from "./Column";
import axios from "axios";
import Recipe from "./Recipe";

// column are aligned next to each other
const Container = styled.div`
  display: flex;
`;

class DnDcontroler extends Component {
  state = {
    recipes: {},
    name: "",

    columns: {
      "column-1": {
        id: "column-1",
        title: "Recipes List",
        recipeIds: [],
        //isDragDisabled: false,
      },
      "column-2": {
        id: "column-2",
        title: "Menu",
        recipeIds: [],
      },
    },

    columnOrder: ["column-1", "column-2"],
  };

  componentDidMount() {
    this.saveAllRecipesInitial();
  }

  saveAllRecipesInitial = () => {
    const requestURL = process.env.REACT_APP_API_URL + `/api/recipe`;

    axios
      .get(requestURL)
      .then((response) => {
        const recipesObject = {};
        const recipesArr = response.data;
        recipesArr.forEach((oneRecipe) => {
          recipesObject[oneRecipe._id] = oneRecipe;
        });
        this.setState({ recipes: recipesObject });
      })
      .catch((err) => console.log(err));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.recipes !== this.props.recipes) {
      const { recipes: recipesArr } = this.props;

      const columns = { ...this.state.columns };
      columns["column-1"].recipeIds = []; //cleaning the array before pushing
      recipesArr.forEach((oneRecipe) => {
        if (!columns["column-2"].recipeIds.includes(oneRecipe._id)) {
          columns["column-1"].recipeIds.push(oneRecipe._id);
        }
      });

      this.setState({ columns });
    }
  }

  //actulize the state of the draggable components  (move the recipes inside the same column)
  // result obj = {draggableId: recipe-1, type: type(eg: active), reason (of the drop): DROp or XX
  // source(start the drggin):{drppableId: column-1, index:0}}
  //destination(where the dragging finish): { droppable: column-1, index1}
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result; //info we need from the result obj

    if (!destination) {
      return; //if there is no destination, we do nothing as the result of this drag
    }

    // check if the location of the draggable change: if the dest.of th draggable is the same
    // of the start of the dragging the user drag the item back from where he started dragging
    // so we don't have to do anything
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //re-order logic between columns
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    //MOVING INSIDE THE SAME COLUMN
    //is the start column is the same that the finish column (moving recipes in the same column)
    if (start === finish) {
      // we create a new obj with the same content of the last array of recipes
      //(so we do not mutate the existing state)
      const newRecipeIds = Array.from(start.recipeIds);
      //remove the recipeId from the old index to the new one. from start index
      // remove 1 item
      newRecipeIds.splice(source.index, 1);
      // remove nothing and add the recipeId
      newRecipeIds.splice(destination.index, 0, draggableId);

      //create a new column with the same properties of the old column + new recipeArray
      const newColumn = {
        ...start,
        recipeIds: newRecipeIds,
      };

      // Putting the column into a "copy" of our state
      const newState = {
        ...this.state, // spreadng old properties of the state and adding the new column
        columns: {
          ...this.state.columns, //overwriting the existent column
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState); //updating the state for the component
      return;
    }
    //MOVING FROM ONE LIST TO ANOTHER
    // In case the start is different than the end point
    // we create a new Array with the same ids that the old array
    const startRecipeIds = Array.from(start.recipeIds);

    startRecipeIds.splice(source.index, 1); //remove the drag recipe from the array
    // We create a new start column that contain the same property than
    // the old one but with a new recipes Array
    const newStart = {
      ...start,
      recipeIds: startRecipeIds,
    };

    // we do the same that abovebut with the finish column
    const finishRecipeIds = Array.from(finish.recipeIds);

    //if(finishRecipeIds.length < 3) { //allow the drag only until there are 3 recipes
    finishRecipeIds.splice(destination.index, 0, draggableId); //add a new draggable
    //}

    const newFinish = {
      ...finish,
      recipeIds: finishRecipeIds,
    };

    // we set a new state obj that contain the same poperties of the old
    // one plus the 2 new columns ids
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  handleSubmit = () => {
    const menu = this.state.columns["column-2"].recipeIds; // Right column containing selected recipes ids
    console.log("menu", menu);

    axios
      .post(
        process.env.REACT_APP_API_URL + "/api/menu",
        { name: this.state.name, recipes: menu },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("MENU HAS BEEN CREATED", response);
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]:value})
  }

  render() {
    // MODAL BOOTSTRAP

    const handleClose = () => this.setState({ show: false });
    const handleShow = () => {
      this.setState({ show: true });
    };

    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            {this.state.columnOrder.map((columnId) => {
              const column = this.state.columns[columnId];
              const recipes = column.recipeIds.map(
                (recipeById) => this.state.recipes[recipeById]
              );

              return (
                <Column
                  key={column.id}
                  column={column}
                  recipes={recipes} /*isDropDisabled={isDropDisabled}*/
                />
              );
            })}
          </Container>
        </DragDropContext>
        <Button
          variant="success"
          onClick={function() {
            handleShow();
          }}
        >
          {" "}
          CREATE
        </Button>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Menu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <label>Write the name of your menu</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <Button onClick={handleClose} type="submit" variant="info">
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default DnDcontroler;
