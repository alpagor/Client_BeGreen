import React, { Component } from 'react'
import {Accordion, Card, Image} from 'react-bootstrap'

class MenuRecipeList extends Component {
    render() {


        return (
            <div>
                <h4>{this.props.name}</h4>
                <Accordion>
                  {
                    this.props.recipes.map((oneRecipe) =>{
                        return(
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey='0'>
                                    {oneRecipe.name}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Image thumbnail src={oneRecipe.img} alt="Recipe"/>
                                    <div className='cook-info-two'>
                                       <p>Cooking time: {oneRecipe.cooktime}</p> 
                                       <p>Preparation time: {oneRecipe.preptime}</p>
                                       <p>Servings: {oneRecipe.servings}</p>
                                       <p>Protein: {oneRecipe.protein}</p>
                                    </div>
                                    <div className='cooking-array'>
                                        <h4>Ingredients:</h4>
                                        <ul> 
                                            { oneRecipe.ingredients &&
                                                oneRecipe.ingredients.map((ingredient) => {
                                            
                                            return <li>- {ingredient}</li>;
                                            })}
                                        </ul>
                                        <h4>Instructions:</h4>
                                        <ol className='instructions-recipe'>
                                            { oneRecipe.instructions && oneRecipe.instructions.map((instruction) => {
                                            return <li>{instruction}</li>
                                            })}
                                        </ol>
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })
                }  
                </Accordion>
                
            </div>
        )
    }
}

export default MenuRecipeList
