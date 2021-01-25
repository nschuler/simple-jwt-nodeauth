const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET || 'secret';

export const generateToken = (id) => {
    return jwt.sign({ id }, new Buffer.from(secret, 'base64'), { expiresIn: '1h' });
};
  
export const authenticateToken = function (req, res, next) {
    try {
        const token = req.header("auth-token")
        if (!token) return response.status(401).json({ message: 'No Authentication token provided' });

        const decoded = jwt.verify(token, new Buffer.from(secret, 'base64'));
        if (!decoded) return response.status(401).json({ message: 'Authentication failed, access denied' });
    
        req.user = verified
        next()
    } catch (err) {
        console.log(err);
        response.status(500).send({ message: 'Failed to authenticate token' });
    }
}