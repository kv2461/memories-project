import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req)=> {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    } 
    return req;
});

export const fetchPosts = () => API.get('/posts'); 
//all actions towards backend will use redux... 
export const createPost = (newPost) =>  API.post('/posts',newPost);
//takes in entire newPost, and axios will help in sending data.
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin',formData)
export const signUp = (formData) => API.post('/user/signup',formData);