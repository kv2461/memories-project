import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (state = [],action) => { //state always needs to equal something, so make an initial value an empty array.
    switch(action.type) {
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            }
        case DELETE:
            return state.filter( (post) => post._id !== action.payload);
        case UPDATE:
        case LIKE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        
        case CREATE:
            return [...state, action.payload];
        default:
            return state;
    }
}