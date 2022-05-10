import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url); 
//all actions towards backend will use redux... 
export const createPost = (newPost) =>  axios.post(url,newPost);
//takes in entire newPost, and axios will help in sending data.