import axios from 'axios';
import { FETCH_RECIPES, MODIFY_RECIPE, DELETE_RECIPE, REQUEST_RECIPES, RECEIVE_RECIPES, REQUEST_SELECTED_RECIPE, RECEIVE_SELECTED_RECIPE, ERROR_SELECTED_RECIPE } from './types';



/*
* Fetch All Recipes
*/
function requestRecipes() {
  return {
    type: REQUEST_RECIPES
  }
}

function receiveRecipes(response) {
  return {
    type: RECEIVE_RECIPES,
    recipes: response,
    receivedAt: Date.now()
  }
}

function fetchRecipes() {
  return dispatch => {
    dispatch(requestRecipes())
    return axios.get('http://127.0.0.1:8000/recipes/')
      .then(response => dispatch(receiveRecipes(response.data)))
  }
}

function shouldFetchRecipes(state) {
  //Debounce time of every 5 Seconds
  if( (Date.now() - state.recipes.lastUpdated) > 5000){
    return true
  } else {
    return false
  }
}

export function fetchRecipesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchRecipes(getState())) {
      return dispatch(fetchRecipes())
    }
  }
}

/*
* Delete Recipe
*/
export function deleteRecipe(url) {
  return dispatch => {
    return axios.delete(url)
    .then(response => dispatch(deleteRecipeReceived(response)))
  }
}

function deleteRecipeReceived(response) {

  return {
    type: DELETE_RECIPE,
    payload: response
  };
}


/*
* Modify Recipe
*/
export function modifyRecipe(url, object) {
  return dispatch => {
    return axios.patch(url, object)
    .then(response => dispatch(modifyRecipeReceived(response)))
  }
}


function modifyRecipeReceived(response) {
  return {
    type: MODIFY_RECIPE,
    payload: response
  };
}

/*
* Set Selected Recipe
*/

function shouldFetchSelectedRecipe(state, id) {
  console.log(state)
  if (state.recipes.selectedRecipe.id == id) {
    console.log("Returning False");
    return false
  }
  else {
    console.log("Returning True");
    return true
  }
}

export function setSelectedRecipe(url) {
  return dispatch => {
    dispatch(requestSelectedRecipe())
    return axios.get(url)
      .then(response => dispatch(receiveSelectedRecipe(response)))
      //.then(response => dispatch(receiveSelectedRecipe(response.data)))
  }
}

export function setSelectedRecipeByID(id) {
  return dispatch => {
    dispatch(requestSelectedRecipe())
    return axios.get("http://127.0.0.1:8000/recipes/" + id)
    .then(response => dispatch(receiveSelectedRecipe(response)))
    .catch(error => dispatch(errorSelectedRecipe()))
  }
}


function errorSelectedRecipe()
{
  return {
    type: ERROR_SELECTED_RECIPE
  }
}

function requestSelectedRecipe() {
    return {
      type: REQUEST_SELECTED_RECIPE
    }
}

function receiveSelectedRecipe(response) {
  return {
    type: RECEIVE_SELECTED_RECIPE,
    payload: response
  }
}
