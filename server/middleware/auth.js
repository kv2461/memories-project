import jwt from 'jsonwebtoken';

//wants to like a post
//click the like button => auth middleware(next) => like controller....
//middleware is for any kind of action that happens before something

const auth = async (req, res, next) => {
    try {
        const token = req.headers.Authorization.split(' ')[1];
        const isCustomAuth = token.length < 500; //lower than 500 means its our own, if greater its google

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test'); //secret must be the same

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token) //for google, in this case we don't need 

            req.userId = decodedData?.sub;
        }

        next();

    } catch (error) {
        console.log(error);

    }
}

export default auth;