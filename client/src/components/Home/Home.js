import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { getPosts } from '../../actions/posts';
import { useDispatch } from 'react-redux'; //allows us to dispatch an action
import Pagination from '../Pagination';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import useStyles from './styles';

const Home = () => {
    const [currentId,setCurrentId] = useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();//a hook

    useEffect(()=> {
        dispatch(getPosts()); //from actions
    },[currentId,dispatch]);
    return (
        <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            <Paper elevation={6}> 
                                <Pagination />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    );
}

export default Home;