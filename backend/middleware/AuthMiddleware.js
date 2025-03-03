import jwt from 'jsonwebtoken';
import User from '../model/User.js';

const authMiddleware = async (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {

        const decord = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decord.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authMiddleware;