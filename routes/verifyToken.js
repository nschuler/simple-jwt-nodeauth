const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
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