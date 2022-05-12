import express from 'express';

import { getPosts,createPost,updatePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/',getPosts);
router.post('/',createPost);
router.patch('/:id',updatePost) //patch is used for updating existing posts, /:id makes it a dynamic id query 
export default router;