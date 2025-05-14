import jwt from 'jsonwebtoken';

export const authMiddleware = (req,res,next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: 'Unauthorized'});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SCRET);
        req.user = decoded;
        console.log("User is Authorized");
        next();
    }catch(error){
        res.status(401).json({message:'Invalid token'});
    }
}

