import axios from 'axios';
axios.defaults.headers.common['user-key'] = `${ process.env.REACT_APP_USER_KEY }`;

////  Inital Value
const GET_CATEGORIES = 'GET_CATEGORIES';
const SELECT_CATEGORIES = 'SELECT_CATEGORIES';


////  Initial State
let initialState = {
  categoriesList: [],
  selectCategoriesID: '',
  selectCategories: [],
  restaurantInfo: [],
}

export function getCategoriesList() {
  return {
    type: GET_CATEGORIES,
    payload: axios.get(`https://developers.zomato.com/api/v2.1/categories`)
  }
}

export function getSelectCategoriesList(id) {
  console.log(`ID::: ${ id }`);
  return {
    type: SELECT_CATEGORIES,
    payload: axios.get(`https://developers.zomato.com/api/v2.1/search?category=${ id }`)
  }
}

////  Handle State Changes
export default function categoriesListReducer(state = initialState, action) {
  switch(action.type) {
    case `${ GET_CATEGORIES }_FULFILLED`:
    // console.log(`${ GET_CATEGORIES }_FULFILLED`, action.payload.data.categories)
   
    return {
      ...state,
      categoriesList: action.payload.data.categories
    }

    case `${ SELECT_CATEGORIES }_FULFILLED`:
    return {
      ...state,
      selectCategories: action.payload.data
    }


    default:
    return state;
  }
}

console.log(`state: ${ initialState.categoriesList }`);