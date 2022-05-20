//all the handlers of our routes - we don't want logic in router.get('/') for organization
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req,res) => {
    const { page } = req.query; //destructure page
    try{
        const LIMIT = 6; //number of posts per page
        const startIndex = (Number(page) - 1) * LIMIT; //get starting index of every page
        const total = await PostMessage.countDocuments({}); //we want to know the total number of posts so that we can have the total number of pages

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);//sorted by newest to oldest, by limit, and skips to startindex

        res.status(200).json({ data:posts, currentPage:Number(page), numberOfPages:Math.ceil(total/LIMIT) });
        //passing back to front end are the posts, current page, and total numberof pages that divides total documents/posts per page
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getPostsBySearch = async (req,res) => {
    const { searchQuery, tags } = req.query 
    try {
        const title = new RegExp(searchQuery, 'i') //i ignorecase

        const posts = await PostMessage.find({ $or: [{ title },{ tags: { $in:tags.split(',') } }] });//$or find me title or tags
        //$in is one of the tags in the array of tags equal to any of my tags

        res.json( { data:posts }); 
    } catch(error) {
        res.status(404).json({message:error.message})
    }
}

export const getPost = async (req,res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch(error) {
        res.status(404).json({ message:error.message });

    }
}

export const createPost = async (req,res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);

    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async(req,res) => {
    const { id:_id } = req.params;
    const post = req.body;
    // /posts/123, that 123 is immediatley going to fill the value of id
    // rename id to _id by id:_id

    if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No post with that id'); //check if its a valid mongoose objectId

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true});
    //async function, post from req.body is sent from front end, have to specify new to true so we can recieve updated ver of that post
    //have to spread all other post attributes
    res.json(updatedPost);
}

export const deletePost = async(req,res) => {
    const { id:_id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(_id);

    res.json({ message:'Post deleted successfully' });
}

export const likePost = async (req,res) => {
    const { id:_id } = req.params;

    if(!req.userId) return res.json({message:'Unauthenticated'}); //auth middleware populates this

    if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No post with that id'); //check if its a valid mongoose objectId

    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id)=>id===String(req.userId)); //dislike if id has already liked

    if (index === -1) { //only if id hasn't already liked
        //like the post
        post.likes.push(req.userId);
    } else {
        //dislike the post
        post.likes = post.likes.filter((id)=> id !== String(req.userId))//return all the likes NOT like the userId for dislike
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new:true});
    
    res.json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});

    res.json(updatedPost);
}