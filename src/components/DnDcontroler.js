import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const Container = styled.div`
  display: flex;
`;

class DnDcontroler extends Component {
  state = {
    recipes: {},

    columns: {
      "column-1": {
        id: "column-1",
        title: "Recipes List",
        recipeIds: [],
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
    const { recipes } = this.props;
    const recipesObject = {};
    const columns = { ...this.state.columns };
    recipes.forEach((oneRecipe) => {
      recipesObject[oneRecipe._id] = oneRecipe;
      columns["column-1"].recipeIds.push(oneRecipe._id);
    });
    this.setState({ columns, recipes: recipesObject });
  }

  //actulize the state of the draggable components
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newRecipeIds = Array.from(start.recipeIds);
      newRecipeIds.splice(source.index, 1);
      newRecipeIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        recipeIds: newRecipeIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    //Moving from one list to another
    const startRecipeIds = Array.from(start.recipeIds);
    startRecipeIds.splice(source.index, 1);
    const newStart = {
      ...start,
      recipeIds: startRecipeIds,
    };

    const finishRecipeIds = Array.from(finish.recipeIds);
    finishRecipeIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      recipeIds: finishRecipeIds,
    };

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

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const recipes = column.recipeIds.map(
              (recipeById) => this.state.recipes[recipeById]
            );

            return <Column key={column.id} column={column} recipes={recipes} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}

export default DnDcontroler;
