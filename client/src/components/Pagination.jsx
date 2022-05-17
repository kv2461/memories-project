import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Paginate = () => {
    const classes = useStyles();

    return(
        <Pagination 
            classes={{ ul:classes.ul }}
            count={5} //number of pages, static amount currently but we need to dynamically fetch the number of pages depending on existing number of posts
            page={1} //current page, needs to be dynamic
            variant = 'outlined'
            color='primary'
            renderItem={(item)=> (
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
            )}
        />
    )
}

export default Paginate;