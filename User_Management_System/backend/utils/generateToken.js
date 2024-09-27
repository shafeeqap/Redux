import jwt from 'jsonwebtoken';

const generateToken = (res, userId, role) =>{
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: '5m',
    });

    // Use different cookie names for user and admin
    const cookieName = role === 'admin' ? 'jwt_admin' : 'jwt_user';

    res.cookie(cookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 5 * 60 * 1000, // 5 minutes  
        // 30 * 24 * 60 * 60 * 1000, // 30 days _ 1 * 60 * 60 * 1000, // 1 hour  
    });
};

export default generateToken;