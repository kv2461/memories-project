import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const [reversed, setReversed] = useState(comments?.map((val,index,array) => array[array.length - 1 - index]));
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const handleComment = async () => {
        const finalComment = `${user.result.name}:${comment}`;
        const newComments = await dispatch(commentPost(finalComment,post._id));

        setComment('');
        setComments(newComments);
        setReversed(newComments?.map((val,index,array) => array[array.length - 1 - index]));

    }

    
    

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {reversed?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            {c}
                        </Typography>
                    ))}
                </div>
            </div>
            {user?.result?.name && (
                <div style={{ width: '100%' }}>
                    <Typography gutterBottom variant="h6">Write a comment</Typography>
                    <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                    <br />
                    <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                      Comment
                    </Button>
                </div>
            )}
        </div>
    )
};

export default CommentSection;