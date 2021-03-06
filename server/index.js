import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();



app.use(bodyParser.json({limit:'30mb',extended:true}));//for images
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(cors());

app.use('/user', userRoutes);
app.use('/posts',postRoutes); //needs to be below cors

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser:true, useUnifiedTopology:true})//for simplistic purposes, avoids errors
    .then(()=>app.listen(PORT,()=>console.log(`Server is running on port: ${PORT}`)))
    .catch((error)=>console.log(error));
