export default (posts = [],action) => { //state always needs to equal something, so make an initial value an empty array.
    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts,action.payload];
        default:
            return posts;
    }
}