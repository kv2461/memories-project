import express from 'express';

import { getPosts,createPost,updatePost,deletePost,likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'; /// our middleware before controller is called

const router = express.Router();

router.get('/',getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost) //patch is used for updating existing posts, /:id makes it a dynamic id query 
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost) //needs likepost so it doesn't get confused with updatePost patch route?
export default router;