import axios from 'axios';

////  Inital Value
const POST_USER_REVIEW = 'POST_USER_REVIEW'
const GET_PLACE_REVIEW = 'GET_PLACE_REVIEW'

////  Initial State

let initialState = {
  userReview: [],
  placeReview: [],
}


////  Action Creator
export function postUserReview(text, rate, placeID) {
  console.log(`text ${ text }`, `rate ${ rate }`);
  console.log(`placeID ${ placeID }`);
  return {
    type: POST_USER_REVIEW,
    payload: axios.post('/api/postUserReview', { text, rate, placeID })
  }
}

export function getPlaceReview(id) {
  return {
    type: GET_PLACE_REVIEW,
    payload: axios.get(`/api/placeReview/${ id }`)
  }
}

////  Handle State changes
export default function userDataReducer(state = initialState, action) {
  switch(action.type) {
    case `${ POST_USER_REVIEW }_FULFILLED`:
    return {
      ...state,
      userReview: action.payload
    }

    case `${ GET_PLACE_REVIEW }_FULFILLED` :
    return {
      ...state,
      placeReview: action.payload
    }
    default:
    return state;
  }
}