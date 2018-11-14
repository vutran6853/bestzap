import axios from 'axios';

////  Inital Value
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_LISTS = 'GET_LISTS'
const GET_PLACEINFO = 'GET_PLACEINFO'


////  Initial State
let initialState = {
  categoriesList: [],
  lists: [],
  placeInfo: [],
}

export function getCategoriesList(userInput) {
  // console.log(`userInput: ${ userInput }`);
  return {
    type: GET_CATEGORIES,
    payload: axios.get(`/api/getCategories/${ userInput }`)
  }
}

export function getLists(userInput) {
  // console.log(`userInputTerm: ${ userInput.term }`);
  // console.log(`userInputLocation: ${ userInput.location }`);
  return {
    type: GET_LISTS,
    payload: axios.post(`/api/getList`, { userInput })
  }
}

export function getPlaceInfo(id) {
  // console.log(`id ${ id }`);
  return {
    type: GET_PLACEINFO,
    payload: axios.get(`/api/getPlaceInfo/${ id }`)
  }
}




////  Handle State Changes
export default function categoriesListReducer(state = initialState, action) {
  switch(action.type) {
    case `${ GET_CATEGORIES }_FULFILLED`:
    // console.log(`${ GET_CATEGORIES }_FULFILLED`, action.payload)
    return {
      ...state,
      categoriesList: action.payload
    }

    case `${ GET_LISTS }_FULFILLED`:
    return {
      ...state,
      lists: action.payload
    }

    case `${ GET_PLACEINFO }_FULFILLED`:
    return {
      ...state,
      placeInfo: action.payload
    }

    default:
    return state;
  }
}
