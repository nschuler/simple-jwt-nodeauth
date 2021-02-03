import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export const generateAuthToken = (id) => {
    return jwt.sign({ id }, new Buffer.from(secret, 'base64'), { expiresIn: '1h' });
};
  
export const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No Authentication token provided' });

        const decoded = jwt.verify(token, new Buffer.from(secret, 'base64'));
        if (!decoded) return res.status(401).json({ message: 'Authentication failed, access denied' });
    
        req.user = verified
        return next()
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Failed to authenticate token' });
    }
}