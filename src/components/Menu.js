import React, { Component } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class Menu extends Component {
    state = {
      show: false,
      setShow: false,
      name: ''
    };

  

  handleOnClick = (e) => {
    const recipeId = e.target.value;
    this.props.getRecipeById(recipeId);
  };

  handleClick = (e) => {
    const recipeId = e;
    this.getRecipeDetails(recipeId);
  };

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]:value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios
    .post('http://localhost:5000/api/menu', 
    {name: this.state.name, recipes:this.props.menu}
    )
    .then((response) =>{
      console.log('MENU HAS BEEN CREATED', response)
    })
    .catch((err) => console.log(err));
  }

  // drop = e => {
  //   const recipeId = e.target.value;
  //   this.props.getRecipeById(recipeId);
  // }

  // dragOverOne = e => {
  //   e.preventDefault()
  // }

  // dragStart = e =>{
  //   const target = e.target
  //   e.dataTransfer.setData('card_id', target.id)
  //   setTimeout(() => {
  //       target.style.display = 'none'
  //   }, 0)
  // }

  // dragOverTwo = e => {
  //   e.stopPropagation()
  // }

  render() {

    // MODAL BOOTSTRAP

    const handleClose = () => this.setState({ show: false });
    const handleShow = () => {
      this.setState({ show: true });
    };

    return (
      <div 
        style={{ backgroundColor: "green", height: "200px" }}
        // id='menu-list'
        // onDrop={this.drop}
        // onDragOver={this.dragOverOne}
        className='menu-list'
      >
        <h1>MENU</h1>
        {this.props.menu.map((oneRecipe) => {
          return (
            <div 
              key={oneRecipe._id}
              // id = {oneRecipe._id}
              // className='recipe-card'
              // onDragStart={this.dragStart}
              // onDragOver={this.dragOverTwo}
              // draggable='true'
              >
              {" "}
              {oneRecipe.name}
              <button value={oneRecipe._id} onClick={this.handleOnClick}>
                OK
              </button>
            </div>
          );
        })}
        <button  
          onClick={function () {
          handleShow()}}
          >CREATE
          </button>


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
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
              <Button onClick={handleClose} type='submit' variant="info">Submit</Button>
            </form>
            
          </Modal.Body>
        </Modal>



      </div>
    );
  }
}

export default Menu;