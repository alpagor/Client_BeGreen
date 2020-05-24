import React, { Component } from "react";
import axios from "axios";

class Menu extends Component {
  //   state = {
  //     menu: [],
  //   };

  //   componentDidMount() {}

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.menu !== this.props.menu) {
  //       this.setState({ menu: this.props.menu });
  //     }
  //     console.log("NEW CONSOLE", this.state.menu);
  //   }

  handleOnClick = (e) => {
    const recipeId = e.target.value;
    this.props.removeFromMenu(recipeId);
  };

  render() {
    return (
      <div style={{ backgroundColor: "green", height: "200px" }}>
        <h1>MENU</h1>
        {this.props.menu.map((oneRecipe) => {
          return (
            <div key={oneRecipe._id}>
              {" "}
              {oneRecipe.name}
              <button value={oneRecipe._id} onClick={this.handleOnClick}>
                DELETE
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Menu;
