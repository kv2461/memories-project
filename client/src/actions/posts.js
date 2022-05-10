import * as api from '../api';

//Action Creators

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(); //destructure response into data

        dispatch({ type: 'FETCH_ALL', payload: data });//here we are using redux to pass/dispatch an action from data from backend
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type:'CREATE',payload:data});
    } catch(error) {
        console.log(error.message);
    }

}