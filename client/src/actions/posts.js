import { FETCH_ALL,CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api'; // allows us to access api files as object methods such as api.fetchPosts();

//Action Creators 

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(); //destructure response into data

        dispatch({ type: FETCH_ALL, payload: data });//here we are using redux to pass/dispatch an action from data from backend
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload:data});
    } catch(error) {
        console.log(error);
    }

}

export const updatePost = (id,post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id,post); //api request is returning the updated memory/post.. so we can destructure
        //the response into data

        dispatch({type: UPDATE, payload:data });//call dispatch to call action update and the payload
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try{
        await api.deletePost(id); //we don't have to assign this to a variable because we are just deleting

        dispatch({type: DELETE, payload:id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload:data }); 

    } catch(error) {
        console.log(error);
    }
}