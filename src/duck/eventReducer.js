import axios from 'axios';

////  Inital Value
const GET_EVENT = 'GET_EVENT'

////  Initial State
let initialState = {
  event: [],
}

////  Action Creator
export function getEvent() {
  return {
    type: GET_EVENT,
    payload: axios.get('/api/getEvent')
  }
}

////  Handle State changes
export default function eventDataReducer(state = initialState, action) {
  switch(action.type) {
    case `${ GET_EVENT }_FULFILLED`:
    return {
      ...state,
      event: action.payload
    }

    default:
    return state;
  }
}
