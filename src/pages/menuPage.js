import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import {Row, ListGroup, Col} from 'react-bootstrap'
import Navbar from '../components/Navbar'
import ListGroupItem from "react-bootstrap/ListGroupItem";
import MenuRecipeList from '../components/MenuRecipeList'
import './menuPage.css'


export class MenuPage extends Component {
    
    state = {
        menuList: [],
        show: false,
        name: '',
        recipes: []
    }
    
   componentDidMount(){
       this.getAllMenus()
   }

    getAllMenus = () => {
        axios
        .get('http://localhost:5000/api/menu', {withCredentials:true}) 
        .then((response) => {
            const menu = response.data.menus
            this.setState({menuList:menu})
        })
        .catch((err) => console.log(err));
    }
    
    getMenuDetails = (menuId) => {
        axios
        .get(`http://localhost:5000/api/menu/${menuId}`)
        .then((response) => {
            const menuName = response.data.name
            const recipesArr = response.data.recipes
            this.setState({name:menuName, recipes:recipesArr})
        })
        .catch((err) => console.log(err));
    }

    handleClick = (e) => {
        const menuId = e;
        this.getMenuDetails(menuId);
    };

    render() {

        const handleShow = (value) => {
        this.setState({ show: true });
        this.handleClick(value);
        };

        return (
            <div>
            <Navbar/>
                <Row  className = 'menuPage'>
                <Col >
                   <ListGroup className='menuList'>
                        {this.state.menuList && this.state.menuList.map((oneMenu) => {
                                console.log('MENU', oneMenu)
                                return (
                                    <ListGroupItem>
                                        <Link 
                                            onClick={function () {
                                                handleShow(oneMenu._id);
                                            }}
                                            key={oneMenu._id}
                                            
                                            >
                                            <p>{oneMenu.name}</p>
                                        </Link>
                                    </ListGroupItem>
                                )
                            })
                        }
                    </ListGroup> 
                </Col>
                <Col className='hide-div'>
                    {this.state.show && <MenuRecipeList 
                    name={this.state.name}
                    recipes={this.state.recipes}
                     />} 
                </Col>
                    
                </Row>
            </div>
        )
    }
}

export default MenuPage
