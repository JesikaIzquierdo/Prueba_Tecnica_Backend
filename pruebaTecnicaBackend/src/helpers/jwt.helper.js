import jwt from 'jsonwebtoken';


const generateToken = (payload) => {
    console.log("JWT",process.env.JWT_SECRET);
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
    
    return token;
}

const verifyToken = ( token ) => {
    const payload = jwt.verify(
        token, 
        process.env.JWT_SECRET 
    );
    return payload;
}
    

export {
    generateToken,
    verifyToken
}