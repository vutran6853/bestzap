import axios from 'axios';

////  Inital Value
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_LISTS = 'GET_LISTS'
const GET_PLACEINFO = 'GET_PLACEINFO'
const GET_PLACEREVIEWS = 'GET_PLACEREVIEWS'
const GET_RECOMMENDPLACE = 'GET_RECOMMENDPLACE'

////  Initial State
let initialState = {
  categoriesList: ['Restaurants', 'Shopping', 'Nightlife', 'Food', 'Coffee & Tea', 'Hotels & Travel', 'Real Estate'],
  lists: [],
  placeInfo: [],
  placeReviews: [],
  recommendPlace: [],
}

////  Action Creator
export function getCategoriesList() {
  // console.log(`userInput: ${ userInput }`);
  return {
    type: GET_CATEGORIES,
    payload: initialState.categoriesList
  }
}

export function getLists(userInput) {
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

export function getPlaceReviews(id) {
    // console.log(`id ${ id }`);
  return {
    type: GET_PLACEREVIEWS,
    payload: axios.get(`/api/getPlaceReviews/${ id }/reviews`)
  }
}

export function getRecommendPLace(location) {
  return {
    type: GET_RECOMMENDPLACE,
    payload: axios.get(`/api/getRecommendPlace/${ location }`)
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

    case `${ GET_RECOMMENDPLACE }_FULFILLED`:
    return {
      ...state,
      recommendPlace: action.payload
    } 

    default:
    return state;
  }
}
