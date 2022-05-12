export default (posts = [],action) => { //state always needs to equal something, so make an initial value an empty array.
    switch(action.type) {
        case 'UPDATE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts,action.payload];
        default:
            return posts;
    }
}