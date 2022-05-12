import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; 
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();



app.use(bodyParser.json({limit:'30mb',extended:true}));//for images
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(cors());

app.use('/posts',postRoutes); //needs to be below cors

const CONNECTION_URL = `mongodb+srv://kv2461:LTYGr2zzy86W21Hw@cluster0.htfej.mongodb.net/tutorial_data?retryWrites=true&w=majority`

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser:true, useUnifiedTopology:true})//for simplistic purposes, avoids errors
    .then(()=>app.listen(PORT,()=>console.log(`Server is running on port: ${PORT}`)))
    .catch((error)=>console.log(error));
