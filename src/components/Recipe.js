import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

//video 11 para poner las recetas  orizontalmente
//video 12 mover orizontalmente los components

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

//snapshotwill be used to style component when dragged
class Recipe extends Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.recipe.id}
        index={this.props.index}
        //isDragDisabled={true} //Disable recipes to move is set to  true
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.recipe.content}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Recipe;
