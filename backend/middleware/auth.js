import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next) => {
    const token = req.headers['authorization'];
    

    if(!token){
        return res.status(401).send({
            success:false,
            message:'Authorization denied'
        });
    }

    try{
        const decode = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(err){
        res.status(401).send({
            success:false,
            message: 'Invalid token'
        });
    }
};

export default authMiddleware;