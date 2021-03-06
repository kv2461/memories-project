import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';
import * as api from '../api'; // allows us to access api files as object methods such as api.fetchPosts();

//Action Creators 

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const { data } = await api.fetchPost(id); 

        dispatch({ type: FETCH_POST, payload: { post: data } });
        dispatch({type:END_LOADING});

    } catch (error) {
        console.log(error)
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const { data } = await api.fetchPosts(page); //destructure response into data

        dispatch({ type: FETCH_ALL, payload: data });//here we are using redux to pass/dispatch an action from data from backend
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data : { data }} = await api.fetchPostsBySearch(searchQuery); //destructure data twice, first time because of axios request
        //2nd time is cuz we put it in an a new object called data after searching 
        
        dispatch({ type:FETCH_BY_SEARCH, payload:data });
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const { data } = await api.createPost(post);

        navigate(`/posts/${data._id}`);

        dispatch({ type: CREATE, payload:data});
        dispatch({type:END_LOADING});
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

export const commentPost = (value,id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value,id);

        dispatch({ type: COMMENT, payload: data });

       return data.comments;
    } catch (error) {
        console.log(error)
    }
}